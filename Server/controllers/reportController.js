import Policy from "../models/Policy.js";
import Scheme from "../models/Scheme.js";
import User from "../models/User.js";
import { Application } from "../models/Application.js";
import { SearchHistory } from "../models/SearchHistory.js";
import Feedback from "../models/Feedback.js";

import { PassThrough } from "stream";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const { ZipArchive } = require("archiver");

// Helper: Format date
const formatDate = (date) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return isNaN(d.getTime()) ? String(date) : d.toLocaleDateString();
};

// Helper: Mask email for privacy
const maskEmail = (email) => {
  if (!email) return "N/A";
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const name = parts[0];
  const domain = parts[1];
  if (name.length <= 2) return `${name[0]}*@${domain}`;
  return `${name[0]}${"*".repeat(name.length - 2)}${name[name.length - 1]}@${domain}`;
};

// Helper: Build Fuzzy Dept/Ministry Regex
const buildFuzzyDeptRegex = (dept) => {
  if (!dept || dept.startsWith("All ")) return null;
  // Replace & and and with flexible pattern
  const escaped = dept
    .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") // escape special regex characters
    .replace(/&/gi, "(and|&)")
    .replace(/and/gi, "(and|&)");
  return new RegExp(escaped, "i");
};

// Helper: Generate dynamic report insights
const getReportInsights = (reportType, rawData, stats) => {
  const insights = [];
  const typeLower = String(reportType).toLowerCase();

  if (!rawData || rawData.length === 0) {
    insights.push("No data matches the selected filters for this reporting range.");
    return insights;
  }

  if (typeLower.includes("scheme")) {
    const total = rawData.length;
    const active = rawData.filter(s => s.status === "Published" || s.status === "Approved").length;
    const activeRate = ((active / total) * 100).toFixed(0);
    insights.push(`Active Schemes Rate: ${activeRate}% of filtered schemes are currently active (Published/Approved) on the portal.`);

    // Top Category
    const cats = {};
    rawData.forEach(s => { cats[s.category] = (cats[s.category] || 0) + 1; });
    const topCat = Object.entries(cats).sort((a, b) => b[1] - a[1])[0];
    if (topCat) {
      insights.push(`Top Category Focus: '${topCat[0]}' is the dominant category with ${topCat[1]} registered schemes.`);
    }

    // Top Department
    const depts = {};
    rawData.forEach(s => { depts[s.department] = (depts[s.department] || 0) + 1; });
    const topDept = Object.entries(depts).sort((a, b) => b[1] - a[1])[0];
    if (topDept) {
      insights.push(`Primary Authority: '${topDept[0]}' manages the largest volume of schemes (${topDept[1]} entries).`);
    }

  } else if (typeLower.includes("policy")) {
    const total = rawData.length;
    const published = rawData.filter(p => p.status === "Published" || p.status === "Approved").length;
    const pubRate = ((published / total) * 100).toFixed(0);
    insights.push(`Regulatory Release Ratio: ${pubRate}% of policies have been officially finalized and published.`);

    const depts = {};
    rawData.forEach(p => { depts[p.department] = (depts[p.department] || 0) + 1; });
    const topDept = Object.entries(depts).sort((a, b) => b[1] - a[1])[0];
    if (topDept) {
      insights.push(`Leading Regulator: '${topDept[0]}' represents the lead regulatory body with ${topDept[1]} policies active.`);
    }

  } else if (typeLower.includes("department")) {
    // rawData is array of objects: { deptName, totalSchemes, publishedSchemes, totalPolicies, publishedPolicies }
    let topCoverage = "";
    let maxCount = 0;
    rawData.forEach(d => {
      const tot = d.totalSchemes + d.totalPolicies;
      if (tot > maxCount) {
        maxCount = tot;
        topCoverage = d.deptName;
      }
    });
    if (topCoverage) {
      insights.push(`Top Performing Department: '${topCoverage}' holds the highest operational presence with ${maxCount} total resources.`);
    }
    const totalDepts = rawData.length;
    insights.push(`Operational Footprint: Processing portal reports across ${totalDepts} separate government departments.`);

  } else if (typeLower.includes("user")) {
    insights.push(`Onboarding Velocity: Registered ${stats["Registered Users Count"]} user account(s) inside this date range.`);
    insights.push(`Platform Interaction: Users logged ${stats["Search Queries Logged"]} search queries and submitted ${stats["Submissions Range Applications"]} scheme applications.`);
    
    // States distribution
    const states = {};
    rawData.forEach(u => { if (u.state) states[u.state] = (states[u.state] || 0) + 1; });
    const topState = Object.entries(states).sort((a, b) => b[1] - a[1])[0];
    if (topState) {
      insights.push(`Primary User Base: State '${topState[0]}' represents the largest cohort with ${topState[1]} signups.`);
    }

  } else {
    // Analytics
    insights.push(`Asset Utilization Ratio: The portal exhibits high user-to-asset activity ratio with ${stats["Overall Platform Growth"]} user engagements recorded.`);
    insights.push(`Communication channels: Handled ${stats["Total Active Inbound Feedback Forms"]} citizen feedback submissions in this timeframe.`);
  }

  return insights;
};

// Helper: Draw KPI card in PDF
const drawKPIBox = (doc, label, val, x, y, width, height) => {
  // Card background (light gray/slate)
  doc.fillColor("#F8FAFC").rect(x, y, width, height).fill();
  // Card border (subtle gray)
  doc.strokeColor("#E2E8F0").lineWidth(1).rect(x, y, width, height).stroke();
  
  // KPI Header
  doc.fillColor("#64748B").font("Helvetica-Bold").fontSize(7).text(label.toUpperCase(), x + 8, y + 10, { width: width - 16, align: "center" });
  // KPI Value
  doc.fillColor("#EA580C").font("Helvetica-Bold").fontSize(13).text(String(val), x + 8, y + 21, { width: width - 16, align: "center" });
};

// Helper: PDF Generator (Two-Pass for headers/footers/page numbers)
const generatePDFBuffer = (title, headers, rows, stats, metadata, colWidths) => {
  return new Promise((resolve, reject) => {
    try {
      // Enable bufferPages to do page number calculations on final pass
      const doc = new PDFDocument({ margin: 50, size: "A4", bufferPages: true });
      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      // 1. Report Header Section
      doc.fillColor("#EA580C").font("Helvetica-Bold").fontSize(18).text("GPPSIP Portal Reports", { align: "center" });
      doc.moveDown(0.2);
      doc.fillColor("#1E293B").font("Helvetica-Bold").fontSize(13).text(title, { align: "center" });
      doc.moveDown(0.3);
      doc.fillColor("#64748B").font("Helvetica-Oblique").fontSize(8.5).text(`Period: ${metadata.startDate} to ${metadata.endDate} | Filters: Dept: ${metadata.department}, Status: ${metadata.status}, State: ${metadata.state}, Category: ${metadata.category}`, { align: "center" });
      doc.moveDown(1.2);

      // 2. Summary KPI statistics cards grid
      if (stats && Object.keys(stats).length > 0) {
        doc.fillColor("#0F172A").font("Helvetica-Bold").fontSize(10.5).text("Summary Insights Dashboard", { underline: false });
        doc.moveDown(0.5);

        const statEntries = Object.entries(stats).slice(0, 5); // display up to 5 stats in one row
        const boxWidth = 90;
        const boxHeight = 42;
        const gap = 12.5;
        const startY = doc.y;

        statEntries.forEach(([label, val], idx) => {
          const x = 50 + idx * (boxWidth + gap);
          drawKPIBox(doc, label, val, x, startY, boxWidth, boxHeight);
        });

        doc.y = startY + boxHeight + 15; // advance cursor after boxes
      }

      // 3. Dynamic Insights Block
      const insights = getReportInsights(title, metadata.rawData, stats);
      if (insights.length > 0) {
        doc.fillColor("#F1F5F9").rect(50, doc.y, 500, 15 + insights.length * 14).fill();
        doc.strokeColor("#E2E8F0").lineWidth(1).rect(50, doc.y, 500, 15 + insights.length * 14).stroke();
        
        let insightY = doc.y + 8;
        doc.fillColor("#0F172A").font("Helvetica-Bold").fontSize(9.5);
        doc.text("Dynamic Analysis Summary:", 60, insightY);
        insightY += 13;

        doc.font("Helvetica").fontSize(8.5).fillColor("#334155");
        insights.forEach((insight) => {
          doc.text(`  • ${insight}`, 60, insightY, { width: 480 });
          insightY += 13;
        });

        doc.y = insightY + 12;
      }

      // 4. Records Data Table
      doc.fillColor("#0F172A").font("Helvetica-Bold").fontSize(10.5).text("Consolidated Report Data Log", { underline: false });
      doc.moveDown(0.6);

      let currentY = doc.y;

      // Draw table headers
      doc.fontSize(8).font("Helvetica-Bold").fillColor("#0F172A");
      let headerX = 50;
      headers.forEach((header, i) => {
        const w = colWidths[i];
        doc.text(header, headerX, currentY, { width: w - 8, align: "left" });
        headerX += w;
      });
      doc.moveDown(0.3);
      
      // Header horizontal rule
      doc.strokeColor("#94A3B8").lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.4);

      // Rows
      doc.font("Helvetica").fontSize(7.5).fillColor("#475569");
      rows.forEach((row) => {
        // Safe layout page height check
        if (doc.y > 700) {
          doc.addPage();
          currentY = doc.y;
          // Re-draw headers on new page
          doc.fontSize(8).font("Helvetica-Bold").fillColor("#0F172A");
          let pHeaderX = 50;
          headers.forEach((header, i) => {
            const w = colWidths[i];
            doc.text(header, pHeaderX, currentY, { width: w - 8, align: "left" });
            pHeaderX += w;
          });
          doc.moveDown(0.3);
          doc.strokeColor("#94A3B8").lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
          doc.moveDown(0.4);
          doc.font("Helvetica").fontSize(7.5).fillColor("#475569");
        }

        currentY = doc.y;
        let rowMaxHeight = 0;

        // Calculate max cell height in this row
        row.forEach((cell, i) => {
          const w = colWidths[i];
          const txt = String(cell || "N/A");
          const cellHeight = doc.heightOfString(txt, { width: w - 8 });
          if (cellHeight > rowMaxHeight) rowMaxHeight = cellHeight;
        });

        // Draw cell text
        let cellX = 50;
        row.forEach((cell, i) => {
          const w = colWidths[i];
          const txt = String(cell || "N/A");
          doc.text(txt, cellX, currentY, { width: w - 8, align: "left" });
          cellX += w;
        });

        doc.y = currentY + rowMaxHeight + 7;
        // Subtle row line separator
        doc.strokeColor("#E2E8F0").lineWidth(0.5).moveTo(50, doc.y - 3).lineTo(550, doc.y - 3).stroke();
      });

      // 5. Final Pass: Page Numbers and Footer Layout
      const range = doc.bufferedPageRange();
      for (let i = 0; i < range.count; i++) {
        doc.switchToPage(i);
        doc.strokeColor("#E2E8F0").lineWidth(0.5).moveTo(50, 770).lineTo(550, 770).stroke();
        
        doc.fontSize(7.5).fillColor("#94A3B8").font("Helvetica");
        doc.text(
          `Generated via GPPSIP Portal Administrative Center | Page ${i + 1} of ${range.count}`,
          50,
          776,
          { align: "center", width: 500 }
        );
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

// Helper: Excel Generator
const generateExcelBuffer = async (title, headers, rows, stats, metadata) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("GPPSIP Report");

  // Title Row
  worksheet.mergeCells("A1", "F1");
  const titleCell = worksheet.getCell("A1");
  titleCell.value = title;
  titleCell.font = { name: "Arial", size: 14, bold: true, color: { argb: "FFEA580C" } };
  titleCell.alignment = { vertical: "middle", horizontal: "center" };
  worksheet.getRow(1).height = 30;

  // Subtitle Row
  worksheet.mergeCells("A2", "F2");
  const subtitleCell = worksheet.getCell("A2");
  subtitleCell.value = `Generated: ${new Date().toLocaleString()} | Period: ${metadata.startDate} to ${metadata.endDate}`;
  subtitleCell.font = { name: "Arial", size: 9, italic: true, color: { argb: "FF64748B" } };
  subtitleCell.alignment = { vertical: "middle", horizontal: "center" };
  worksheet.getRow(2).height = 18;

  worksheet.addRow([]); // empty row

  // Filter Info
  worksheet.addRow(["Filters Applied:"]).font = { bold: true, size: 10 };
  worksheet.addRow(["Department", metadata.department, "Status", metadata.status, "State", metadata.state]);
  worksheet.addRow(["Ministry", metadata.ministry, "Category", metadata.category]);
  worksheet.addRow([]); // empty row

  // Stats
  if (stats && Object.keys(stats).length > 0) {
    worksheet.addRow(["Summary Insights"]).font = { bold: true, size: 11, underline: true };
    for (const [key, val] of Object.entries(stats)) {
      worksheet.addRow([key, val]);
    }
    worksheet.addRow([]); // empty row
  }

  // Table Headers
  const headerRow = worksheet.addRow(headers);
  headerRow.font = { bold: true, size: 10, color: { argb: "FFFFFFFF" } };
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFEA580C" }
    };
    cell.alignment = { vertical: "middle", horizontal: "left" };
  });
  worksheet.getRow(headerRow.number).height = 24;

  // Table Rows
  rows.forEach((row) => {
    worksheet.addRow(row);
  });

  // Auto-width adjustment
  worksheet.columns.forEach((column) => {
    let maxLen = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const cellVal = cell.value ? String(cell.value) : "";
      if (cellVal.length > maxLen) maxLen = cellVal.length;
    });
    column.width = Math.min(Math.max(maxLen + 3, 12), 35);
  });

  return await workbook.xlsx.writeBuffer();
};

// Helper: ZIP Generator
const generateZipBuffer = (pdfBuffer, excelBuffer, reportType) => {
  return new Promise((resolve, reject) => {
    const archive = new ZipArchive({ zlib: { level: 9 } });
    const stream = new PassThrough();
    const chunks = [];

    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", (err) => reject(err));

    archive.pipe(stream);

    const baseName = reportType.toLowerCase().replace(/[^a-z0-9]+/g, "_");
    archive.append(pdfBuffer, { name: `${baseName}_report.pdf` });
    archive.append(excelBuffer, { name: `${baseName}_report.xlsx` });

    archive.finalize();
  });
};

// Main Controller
export const generateReport = async (req, res) => {
  const {
    reportType,
    department,
    startDate,
    endDate,
    status,
    state,
    ministry,
    category,
    exportFormat
  } = req.body;

  // Basic Validation
  if (!reportType || !exportFormat || !startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: "Report Type, Export Format, Start Date, and End Date are required."
    });
  }

  if (new Date(startDate) > new Date(endDate)) {
    return res.status(400).json({
      success: false,
      message: "Start Date cannot be after End Date."
    });
  }

  const queryRange = {
    $gte: new Date(startDate),
    $lte: new Date(endDate + "T23:59:59.999Z")
  };

  const metadata = {
    department: department || "All Departments",
    startDate,
    endDate,
    status: status || "All Status",
    state: state || "All States",
    ministry: ministry || "All Ministries",
    category: category || "All Categories",
    rawData: [] // compiled later
  };

  let reportTitle = "";
  let headers = [];
  let rows = [];
  let stats = {};
  let colWidths = [];

  try {
    const typeLower = String(reportType).toLowerCase();

    // 1. Policy Report
    if (typeLower.includes("policy")) {
      reportTitle = "Policy Insights & Administration Report";
      const filter = { createdAt: queryRange };

      // Apply fuzzy regex for Department/Ministry
      const deptRegex = buildFuzzyDeptRegex(department) || buildFuzzyDeptRegex(ministry);
      if (deptRegex) {
        filter.department = { $regex: deptRegex };
      }
      if (status && status !== "All Status") {
        filter.status = status;
      }

      const policies = await Policy.find(filter).sort({ createdAt: -1 }).lean();
      metadata.rawData = policies;

      headers = ["Policy Name", "Department", "Effective Date", "Status", "Created At"];
      colWidths = [150, 150, 80, 60, 60]; // Sum = 500

      rows = policies.map((p) => [
        p.name || "N/A",
        p.department || "N/A",
        p.effectiveDate || p.date || "N/A",
        p.status || "Draft",
        formatDate(p.createdAt)
      ]);

      stats = {
        "Total Policies": policies.length,
        "Published": policies.filter((p) => p.status === "Published").length,
        "Under Review": policies.filter((p) => p.status === "Under Review").length,
        "Draft": policies.filter((p) => p.status === "Draft").length,
        "Approved": policies.filter((p) => p.status === "Approved").length,
      };

    // 2. Scheme Report
    } else if (typeLower.includes("scheme")) {
      reportTitle = "Scheme Administration & Beneficiary Report";
      const filter = { createdAt: queryRange };

      // Apply fuzzy regex for Department/Ministry
      const deptRegex = buildFuzzyDeptRegex(department) || buildFuzzyDeptRegex(ministry);
      if (deptRegex) {
        filter.department = { $regex: deptRegex };
      }
      if (status && status !== "All Status") {
        filter.status = status;
      }
      // Fuzzy match category
      if (category && category !== "All Categories") {
        const firstWord = category.split(" ")[0]; // matches e.g. "Agriculture" for "Agriculture & Farming"
        filter.category = { $regex: new RegExp(firstWord, "i") };
      }
      // State Filter (matches inside nested states array OR All India fallback)
      if (state && state !== "All States") {
        filter.$or = [
          { "eligibility.states": { $regex: new RegExp(state, "i") } },
          { "eligibility.states": "All India" },
          { "eligibilityCriteria.states": { $regex: new RegExp(state, "i") } },
          { "eligibilityCriteria.states": "All India" }
        ];
      }

      const schemes = await Scheme.find(filter).sort({ createdAt: -1 }).lean();
      metadata.rawData = schemes;

      headers = ["Scheme Title", "Department", "Category", "Status", "Deadline", "Created At"];
      colWidths = [130, 130, 80, 50, 50, 60]; // Sum = 500

      rows = schemes.map((s) => [
        s.title || s.name || "N/A",
        s.department || "N/A",
        s.category || "N/A",
        s.status || "Draft",
        s.deadline || "Ongoing",
        formatDate(s.createdAt)
      ]);

      stats = {
        "Total Schemes": schemes.length,
        "Published": schemes.filter((s) => s.status === "Published").length,
        "Under Review": schemes.filter((s) => s.status === "Under Review").length,
        "Draft": schemes.filter((s) => s.status === "Draft").length,
        "Approved": schemes.filter((s) => s.status === "Approved").length,
      };

    // 3. Department Report
    } else if (typeLower.includes("department")) {
      reportTitle = "Department Coverage & Performance Report";

      const schemeFilter = { createdAt: queryRange };
      const policyFilter = { createdAt: queryRange };

      const deptRegex = buildFuzzyDeptRegex(department) || buildFuzzyDeptRegex(ministry);
      if (deptRegex) {
        schemeFilter.department = { $regex: deptRegex };
        policyFilter.department = { $regex: deptRegex };
      }
      if (status && status !== "All Status") {
        schemeFilter.status = status;
        policyFilter.status = status;
      }
      if (category && category !== "All Categories") {
        const firstWord = category.split(" ")[0];
        schemeFilter.category = { $regex: new RegExp(firstWord, "i") };
      }

      const [schemes, policies] = await Promise.all([
        Scheme.find(schemeFilter).lean(),
        Policy.find(policyFilter).lean()
      ]);

      // Aggregate counts by Department
      const deptData = {};
      const addCount = (dept, type, key) => {
        if (!dept) return;
        if (!deptData[dept]) {
          deptData[dept] = { deptName: dept, schemesCount: 0, publishedSchemes: 0, policiesCount: 0, publishedPolicies: 0 };
        }
        deptData[dept][key]++;
      };

      schemes.forEach((s) => {
        addCount(s.department, "scheme", "schemesCount");
        if (s.status === "Published" || s.status === "Approved") {
          addCount(s.department, "scheme", "publishedSchemes");
        }
      });

      policies.forEach((p) => {
        addCount(p.department, "policy", "policiesCount");
        if (p.status === "Published" || p.status === "Approved") {
          addCount(p.department, "policy", "publishedPolicies");
        }
      });

      const aggregatedRows = Object.values(deptData);
      metadata.rawData = aggregatedRows;

      headers = ["Department Name", "Schemes", "Published Schemes", "Policies", "Published Policies"];
      colWidths = [220, 70, 70, 70, 70]; // Sum = 500

      rows = aggregatedRows.map((d) => [
        d.deptName,
        d.schemesCount,
        d.publishedSchemes,
        d.policiesCount,
        d.publishedPolicies
      ]);

      stats = {
        "Active Sectors": aggregatedRows.length,
        "Total Schemes": schemes.length,
        "Total Policies": policies.length,
      };

    // 4. User Activity Report
    } else if (typeLower.includes("user")) {
      reportTitle = "User Engagement & Platform Activity Report";
      const userFilter = { createdAt: queryRange };

      if (state && state !== "All States") {
        userFilter.state = state;
      }

      const [users, totalApplications, searchHistories] = await Promise.all([
        User.find(userFilter).sort({ createdAt: -1 }).lean(),
        Application.countDocuments({ createdAt: queryRange }),
        SearchHistory.find({ createdAt: queryRange }).lean()
      ]);
      metadata.rawData = users;

      headers = ["Full Name", "Masked Email", "State", "Occupation", "Income Range", "Registered At"];
      colWidths = [100, 120, 70, 70, 80, 60]; // Sum = 500

      rows = users.map((u) => [
        u.fullName || "Anonymous",
        maskEmail(u.email || u.mobile),
        u.state || "N/A",
        u.occupation || "N/A",
        u.incomeRange || "N/A",
        formatDate(u.createdAt)
      ]);

      stats = {
        "Registered Users Count": users.length,
        "Citizen Users": users.filter((u) => u.role !== "admin").length,
        "Admin Users": users.filter((u) => u.role === "admin").length,
        "Submissions Range Applications": totalApplications,
        "Search Queries Logged": searchHistories.length,
      };

    // 5. Analytics Report
    } else {
      reportTitle = "Global Platform Performance & KPI Analytics Report";

      const [usersCount, schemesCount, policiesCount, appsCount, feedbackCount] = await Promise.all([
        User.countDocuments({ createdAt: queryRange }),
        Scheme.countDocuments({ createdAt: queryRange }),
        Policy.countDocuments({ createdAt: queryRange }),
        Application.countDocuments({ createdAt: queryRange }),
        Feedback.countDocuments({ createdAt: queryRange })
      ]);

      const statesAggregation = await User.aggregate([
        { $match: { createdAt: queryRange } },
        { $group: { _id: "$state", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      metadata.rawData = statesAggregation;

      headers = ["Metric Title", "Recorded Count", "Description / Breakdowns"];
      colWidths = [150, 80, 270]; // Sum = 500

      rows = [
        ["New Registrations", usersCount, "New accounts onboarded during selected period"],
        ["New Schemes Added", schemesCount, "Welfare schemes database additions"],
        ["New Policies Added", policiesCount, "Active regulatory directives registered"],
        ["Applications Submitted", appsCount, "Citizen benefit claims received"],
        ["Citizen Feedbacks", feedbackCount, "General query and feedback forms submitted"],
        ...statesAggregation.map((s) => [
          `Registrations in: ${s._id || "Unspecified"}`,
          s.count,
          "User state-wide geographic distribution"
        ])
      ];

      stats = {
        "Overall Platform Growth": usersCount + schemesCount + policiesCount + appsCount,
        "Total Active Inbound Feedback Forms": feedbackCount
      };
    }

    // Export Generation
    const baseName = reportType.toLowerCase().replace(/[^a-z0-9]+/g, "_");
    const today = new Date().toISOString().slice(0, 10);

    if (exportFormat === "pdf") {
      const pdfBuffer = await generatePDFBuffer(reportTitle, headers, rows, stats, metadata, colWidths);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${baseName}_report_${today}.pdf"`);
      return res.send(pdfBuffer);
    } else if (exportFormat === "excel") {
      const excelBuffer = await generateExcelBuffer(reportTitle, headers, rows, stats, metadata);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="${baseName}_report_${today}.xlsx"`);
      return res.send(excelBuffer);
    } else if (exportFormat === "both") {
      const pdfBuffer = await generatePDFBuffer(reportTitle, headers, rows, stats, metadata, colWidths);
      const excelBuffer = await generateExcelBuffer(reportTitle, headers, rows, stats, metadata);
      const zipBuffer = await generateZipBuffer(pdfBuffer, excelBuffer, reportType);

      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="${baseName}_report_${today}.zip"`);
      return res.send(zipBuffer);
    } else {
      return res.status(400).json({
        success: false,
        message: "Unsupported export format."
      });
    }

  } catch (err) {
    console.error("[REPORT CONTROLLER ERROR]", err);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while generating your report: " + err.message
    });
  }
};
