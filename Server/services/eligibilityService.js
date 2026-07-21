import Scheme from "../models/Scheme.js";

export const sampleSchemes = [
  {
    _id: "scheme-1",
    title: "PM-KISAN Samman Nidhi Yojana",
    department: "Ministry of Agriculture & Farmers Welfare",
    category: "Agriculture & Farming",
    description: "Financial benefit of ₹6,000 per year transferred directly into the bank accounts of small and marginal farmer families.",
    publishedDate: "Feb 2019",
    pdfLink: "https://pmkisan.gov.in",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 75,
      states: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Gujarat", "Rajasthan", "All India"],
      occupations: ["Farmer/Agricultural Worker"],
      incomeRanges: ["Below ₹1 Lakh", "₹1-2.5 Lakh"],
    },
    benefits: [
      "Direct benefit transfer of ₹6,000 annually in 3 equal installments",
      "No middleman intervention with direct bank deposit",
      "Coverage for all landholding farmer families across India"
    ],
    documentsRequired: ["Aadhaar Card", "Landholding Ownership Document", "Active Savings Bank Account"],
    applicationUrl: "https://pmkisan.gov.in",
    tags: ["Financial Assistance", "Farmers", "Central Scheme"],
  },
  {
    _id: "scheme-2",
    title: "Ayushman Bharat - PM Jan Arogya Yojana",
    department: "Ministry of Health & Family Welfare",
    category: "HealthCare & Medical",
    description: "World's largest government-funded health insurance scheme offering health cover of ₹5 Lakh per family per year for secondary & tertiary hospitalization.",
    publishedDate: "Sep 2018",
    pdfLink: "https://pmjay.gov.in",
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 100,
      states: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Gujarat", "Rajasthan", "All India"],
      occupations: ["Any", "Farmer/Agricultural Worker", "Unemployed", "Daily Wage Worker"],
      incomeRanges: ["Below ₹1 Lakh", "₹1-2.5 Lakh"],
    },
    benefits: [
      "Cashless and paperless access to healthcare services at empanelled hospitals",
      "Cover of up to ₹5,000,000 per family per annum",
      "Pre and post hospitalization expense coverage included"
    ],
    documentsRequired: ["Aadhaar Card / Ration Card", "Income Certificate"],
    applicationUrl: "https://pmjay.gov.in",
    tags: ["Healthcare", "Insurance", "BPL"],
  },
  {
    _id: "scheme-3",
    title: "Post-Matric Scholarship for Higher Education",
    department: "Ministry of Education",
    category: "Education & Schloarship",
    description: "Financial support to meritorious students from low-income families to pursue higher education courses in recognized colleges & universities.",
    publishedDate: "Jun 2021",
    pdfLink: "https://scholarships.gov.in",
    eligibilityCriteria: {
      minAge: 15,
      maxAge: 30,
      states: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Gujarat", "Rajasthan", "All India"],
      occupations: ["Student"],
      incomeRanges: ["Below ₹1 Lakh", "₹1-2.5 Lakh", "₹2.5-5 Lakh"],
    },
    benefits: [
      "100% tuition fee reimbursement for qualified academic institutions",
      "Monthly maintenance allowance provided directly to student bank accounts",
      "Special incentives for top rankers in national eligibility entrance tests"
    ],
    documentsRequired: ["Student ID Card", "Mark Sheets", "Caste Certificate", "Income Certificate"],
    applicationUrl: "https://scholarships.gov.in",
    tags: ["Scholarship", "Students", "Education"],
  },
  {
    _id: "scheme-4",
    title: "Pradhan Mantri Awas Yojana (Urban & Gramin)",
    department: "Ministry of Housing and Urban Affairs",
    category: "Housing & Shelter",
    description: "Interest subsidy and financial assistance to construct or upgrade pucca houses for eligible homeless and EWS/LIG families.",
    publishedDate: "Jun 2015",
    pdfLink: "https://pmaymis.gov.in",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      states: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Gujarat", "Rajasthan", "All India"],
      occupations: ["Any"],
      incomeRanges: ["Below ₹1 Lakh", "₹1-2.5 Lakh", "₹2.5-5 Lakh", "₹5-8 Lakh"],
    },
    benefits: [
      "Up to ₹2.67 Lakhs home loan interest subsidy under Credit Linked Subsidy Scheme",
      "Direct financial grant of ₹1.2 Lakh to ₹1.5 Lakh for construction in rural areas",
      "Eco-friendly and sustainable construction standards"
    ],
    documentsRequired: ["Aadhaar Card", "Income Certificate", "No-Pucca-House Affidavit"],
    applicationUrl: "https://pmaymis.gov.in",
    tags: ["Housing", "Subsidy", "Housing for All"],
  },
  {
    _id: "scheme-5",
    title: "Pradhan Mantri MUDRA Yojana (PMMY)",
    department: "Ministry of Finance",
    category: "Financial Aid & Loans",
    description: "Collateral-free loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises for business setup & expansion.",
    publishedDate: "Apr 2015",
    pdfLink: "https://www.mudra.org.in",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      states: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Gujarat", "Rajasthan", "All India"],
      occupations: ["Self-Employed / Business", "Unemployed", "Farmer/Agricultural Worker"],
      incomeRanges: ["Below ₹1 Lakh", "₹1-2.5 Lakh", "₹2.5-5 Lakh", "₹5-8 Lakh", "₹8-12 Lakh", "Above ₹12 Lakh"],
    },
    benefits: [
      "No collateral required for loans under Shishu (₹50k), Kishor (₹5L), and Tarun (₹10L)",
      "Low interest rates with extended repayment period up to 5 years",
      "MUDRA card issued for easy working capital drawdowns"
    ],
    documentsRequired: ["Identity Proof", "Business Plan", "Bank Statement"],
    applicationUrl: "https://www.mudra.org.in",
    tags: ["Business Loan", "Startup", "Self Employment"],
  },
  {
    _id: "scheme-6",
    title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    department: "Ministry of Women and Child Development",
    category: "Women & Child Welfare",
    description: "Maternity benefit program offering cash incentive of ₹5,000 to pregnant women and lactating mothers for first living child.",
    publishedDate: "Jan 2017",
    pdfLink: "https://pmmvy.nic.in",
    eligibilityCriteria: {
      minAge: 19,
      maxAge: 45,
      states: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Gujarat", "Rajasthan", "All India"],
      occupations: ["Any"],
      incomeRanges: ["Below ₹1 Lakh", "₹1-2.5 Lakh", "₹2.5-5 Lakh"],
    },
    benefits: [
      "Direct cash transfer of ₹5,000 in installments upon health milestone compliance",
      "Promotes institutional delivery and health-seeking behavior",
      "Includes nutritional support allowance"
    ],
    documentsRequired: ["MCP Card", "Aadhaar Card", "Bank Account Details"],
    applicationUrl: "https://pmmvy.nic.in",
    tags: ["Women Welfare", "Maternity", "Cash Transfer"],
  }
];

export const processEligibilityCheck = async (userAnswers) => {
  let dbSchemes = [];
  try {
    dbSchemes = await Scheme.find().lean();
  } catch (err) {
    console.warn("DB query failed, fallback to static dataset:", err.message);
  }

  const allSchemes = dbSchemes && dbSchemes.length > 0 ? dbSchemes : sampleSchemes;

  const { category, occupation, state, income } = userAnswers;

  const evaluated = allSchemes.map((scheme) => {
    let score = 0;
    let maxScore = 4;
    const matchReasons = [];

    // Category match
    if (!category || scheme.category === category) {
      score += 1;
      matchReasons.push(`Category match: ${category || "General"}`);
    }

    // State match
    const sCriteria = scheme.eligibilityCriteria?.states || ["All India"];
    if (!state || sCriteria.includes("All India") || sCriteria.includes(state)) {
      score += 1;
      matchReasons.push(`State match: ${state || "All India"}`);
    }

    // Occupation match
    const oCriteria = scheme.eligibilityCriteria?.occupations || ["Any"];
    if (!occupation || oCriteria.includes("Any") || oCriteria.includes(occupation)) {
      score += 1;
      matchReasons.push(`Occupation match: ${occupation || "Any"}`);
    }

    // Income match
    const iCriteria = scheme.eligibilityCriteria?.incomeRanges || ["All"];
    if (!income || iCriteria.includes("All") || iCriteria.includes(income)) {
      score += 1;
      matchReasons.push(`Income match: ${income || "Eligible"}`);
    }

    const matchPercentage = Math.round((score / maxScore) * 100);

    return {
      ...scheme,
      matchPercentage,
      isFullyEligible: matchPercentage >= 85,
      matchReasons,
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    totalEvaluated: allSchemes.length,
    eligibleCount: evaluated.length,
    criteria: userAnswers,
    schemes: evaluated,
  };
};
