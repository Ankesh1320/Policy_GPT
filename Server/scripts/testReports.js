import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import fs from "fs";
import app from "../app.js";
import User from "../models/User.js";

dotenv.config();

const port = 5001;
const baseUrl = `http://localhost:${port}/api/reports/generate`;

async function runTests() {
  // 1. Connect to DB
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB.");

  // 2. Start server
  const server = app.listen(port, async () => {
    console.log(`Test server listening on port ${port}.`);

    try {
      // 3. Find/Create test accounts
      let admin = await User.findOne({ role: "admin" });
      if (!admin) {
        admin = await User.create({
          fullName: "Test Admin",
          email: "testadmin@example.com",
          password: "password123",
          role: "admin",
        });
      }

      let citizen = await User.findOne({ role: "citizen" });
      if (!citizen) {
        citizen = await User.create({
          fullName: "Test Citizen",
          email: "testcitizen@example.com",
          password: "password123",
          role: "citizen",
        });
      }

      // Generate tokens
      const adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      const citizenToken = jwt.sign({ id: citizen._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      console.log("Tokens generated successfully.");

      const results = [];

      const makeRequest = async (payload, token = adminToken) => {
        const headers = { "Content-Type": "application/json" };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(baseUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });

        const status = res.status;
        let bodyBuffer = null;
        let errorData = null;

        if (status === 200) {
          bodyBuffer = Buffer.from(await res.arrayBuffer());
        } else {
          errorData = await res.json().catch(() => null);
        }

        return { status, body: bodyBuffer, error: errorData, headers: res.headers };
      };

      const testCase = async (reportType, exportFormat, filters, token = adminToken, expectError = false) => {
        const payload = {
          reportType,
          exportFormat,
          startDate: "2026-01-01",
          endDate: "2026-08-31",
          ...filters
        };

        const key = `${reportType} | ${exportFormat}`;
        console.log(`Testing: ${key}...`);

        try {
          const res = await makeRequest(payload, token);
          let pass = false;
          let details = "";

          if (expectError) {
            if (res.status >= 400) {
              pass = true;
              details = `Expected error returned: ${res.status} (${res.error?.message || "No msg"})`;
            } else {
              details = `Failed: Expected error but got ${res.status}`;
            }
          } else {
            if (res.status === 200 && res.body && res.body.length > 0) {
              const fileHeader = res.body.slice(0, 4).toString("utf-8");
              
              if (!fs.existsSync("test_outputs")) {
                fs.mkdirSync("test_outputs");
              }
              const cleanType = reportType.toLowerCase().replace(/[^a-z0-9]+/g, "_");
              const ext = exportFormat === "both" ? "zip" : exportFormat === "excel" ? "xlsx" : "pdf";
              fs.writeFileSync(`test_outputs/${cleanType}_report.${ext}`, res.body);

              if (exportFormat === "pdf") {
                if (fileHeader.startsWith("%PDF")) {
                  pass = true;
                  details = "Pass: Valid PDF format (starts with %PDF)";
                } else {
                  details = "Failed: PDF does not start with %PDF header";
                }
              } else if (exportFormat === "excel") {
                if (fileHeader.startsWith("PK")) {
                  pass = true;
                  details = "Pass: Valid Excel spreadsheet (starts with PK zip header)";
                } else {
                  details = "Failed: Excel does not start with PK header";
                }
              } else if (exportFormat === "both") {
                if (fileHeader.startsWith("PK")) {
                  pass = true;
                  details = "Pass: Valid ZIP archive (starts with PK header)";
                } else {
                  details = "Failed: ZIP does not start with PK header";
                }
              }
            } else {
              details = `Failed: Got HTTP status ${res.status}. Error: ${JSON.stringify(res.error)}`;
            }
          }

          results.push({
            reportType,
            exportFormat,
            filters: JSON.stringify(filters || {}),
            status: res.status,
            result: pass ? "SUCCESS" : "FAIL",
            details
          });

        } catch (err) {
          results.push({
            reportType,
            exportFormat,
            filters: JSON.stringify(filters || {}),
            status: "ERROR",
            result: "FAIL",
            details: `Exception: ${err.message}`
          });
        }
      };

      // 4. Test scenarios
      // Report Types & Formats
      const types = ["Policy Report", "Scheme Report", "Department Report", "User Activity Report", "Analytics Report"];
      const formats = ["pdf", "excel", "both"];

      for (const t of types) {
        for (const f of formats) {
          await testCase(t, f, { department: "All Departments", status: "All Status" });
        }
      }

      // Filter Tests
      await testCase("Policy Report", "pdf", { department: "Ministry of Health & Family Welfare", status: "Published" });
      await testCase("Scheme Report", "excel", { department: "Ministry of Finance", category: "Agriculture" });
      await testCase("User Activity Report", "pdf", { state: "Uttar Pradesh" });

      // Invalid Date Range
      console.log("Testing invalid date range...");
      const invalidDatePayload = {
        reportType: "Policy Report",
        exportFormat: "pdf",
        startDate: "2026-08-01",
        endDate: "2026-07-01"
      };
      try {
        const res = await makeRequest(invalidDatePayload);
        const pass = res.status === 400 && res.error?.message?.includes("Start Date cannot be after End Date");
        results.push({
          reportType: "Policy Report",
          exportFormat: "pdf",
          filters: "Invalid date range",
          status: res.status,
          result: pass ? "SUCCESS" : "FAIL",
          details: pass ? "Pass: Correctly rejected with 400 and validation error message" : `Failed: Got ${res.status}`
        });
      } catch (err) {
        results.push({
          reportType: "Policy Report",
          exportFormat: "pdf",
          filters: "Invalid date range",
          status: "ERROR",
          result: "FAIL",
          details: err.message
        });
      }

      // Authentication test: Citizen token
      console.log("Testing citizen authentication...");
      await testCase("Policy Report", "pdf", { department: "All Departments" }, citizenToken, true);

      // Authentication test: Missing token
      console.log("Testing missing authentication...");
      await testCase("Policy Report", "pdf", { department: "All Departments" }, null, true);

      // Validation test: Missing format
      console.log("Testing missing payload parameters...");
      try {
        const res = await makeRequest({ reportType: "Policy Report", startDate: "2026-01-01", endDate: "2026-08-31" });
        const pass = res.status === 400;
        results.push({
          reportType: "Policy Report",
          exportFormat: "None",
          filters: "Missing export format",
          status: res.status,
          result: pass ? "SUCCESS" : "FAIL",
          details: pass ? "Pass: Correctly rejected with 400" : `Failed: Got ${res.status}`
        });
      } catch (err) {
        results.push({
          reportType: "Policy Report",
          exportFormat: "None",
          filters: "Missing export format",
          status: "ERROR",
          result: "FAIL",
          details: err.message
        });
      }

      // 5. Output results
      console.log("\n=================== TEST RUN RESULTS ===================");
      console.log("Report Type | Export Format | Status | Result | Details");
      console.log("------------|---------------|--------|--------|--------");
      results.forEach((r) => {
        console.log(`${r.reportType} | ${r.exportFormat} | ${r.status} | ${r.result} | ${r.details}`);
      });
      console.log("========================================================\n");

      // Save a JSON summary for walkthrough
      fs.writeFileSync("test-results.json", JSON.stringify(results, null, 2));

    } catch (err) {
      console.error("Test execution failed:", err);
    } finally {
      // 6. Tear down
      server.close(() => {
        console.log("Test server stopped.");
        mongoose.connection.close().then(() => {
          console.log("DB connection closed. Exiting test script.");
          process.exit(0);
        });
      });
    }
  });
}

runTests().catch(console.error);
