import Scheme from "../models/Scheme.js";
import { evaluateSchemeEligibility } from "./eligibilityEngine.js";

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
    eligibility: {
      minAge: 18,
      maxAge: 75,
      genders: ["Any"],
      occupations: ["Farmer/Agricultural Worker"],
      educationLevels: ["Any"],
      annualIncomeMax: 0, // No income restriction
      states: ["All India"],
      districts: ["All"],
      socialCategories: ["All"],
      disabilityRequired: false,
      minorityRequired: false,
      farmerRequired: true,
      studentRequired: false,
      womenOnly: false,
      requiredDocuments: ["Land Record", "Aadhaar Card", "Active Savings Bank Account"],
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
    eligibility: {
      minAge: 0,
      maxAge: 100,
      genders: ["Any"],
      occupations: ["Any"],
      educationLevels: ["Any"],
      annualIncomeMax: 250000,
      states: ["All India"],
      districts: ["All"],
      socialCategories: ["All"],
      disabilityRequired: false,
      minorityRequired: false,
      farmerRequired: false,
      studentRequired: false,
      womenOnly: false,
      requiredDocuments: ["Aadhaar Card / Ration Card", "Income Certificate"],
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
    eligibility: {
      minAge: 15,
      maxAge: 30,
      genders: ["Any"],
      occupations: ["Student"],
      educationLevels: ["10th Pass", "12th Pass", "Graduate"],
      annualIncomeMax: 250000,
      states: ["All India"],
      districts: ["All"],
      socialCategories: ["All"],
      disabilityRequired: false,
      minorityRequired: false,
      farmerRequired: false,
      studentRequired: true,
      womenOnly: false,
      requiredDocuments: ["Income Certificate", "Bonafide Certificate", "Student ID Card", "Mark Sheets"],
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
    eligibility: {
      minAge: 18,
      maxAge: 70,
      genders: ["Any"],
      occupations: ["Any"],
      educationLevels: ["Any"],
      annualIncomeMax: 600000,
      states: ["All India"],
      districts: ["All"],
      socialCategories: ["All"],
      disabilityRequired: false,
      minorityRequired: false,
      farmerRequired: false,
      studentRequired: false,
      womenOnly: false,
      requiredDocuments: ["Aadhaar Card", "Income Certificate", "No-Pucca-House Affidavit"],
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
    eligibility: {
      minAge: 18,
      maxAge: 65,
      genders: ["Any"],
      occupations: ["Self-Employed / Business", "Unemployed", "Farmer/Agricultural Worker"],
      educationLevels: ["Any"],
      annualIncomeMax: 1200000,
      states: ["All India"],
      districts: ["All"],
      socialCategories: ["All"],
      disabilityRequired: false,
      minorityRequired: false,
      farmerRequired: false,
      studentRequired: false,
      womenOnly: false,
      requiredDocuments: ["Identity Proof", "Business Plan", "Bank Statement"],
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
    eligibility: {
      minAge: 19,
      maxAge: 45,
      genders: ["Female"],
      occupations: ["Any"],
      educationLevels: ["Any"],
      annualIncomeMax: 500000,
      states: ["All India"],
      districts: ["All"],
      socialCategories: ["All"],
      disabilityRequired: false,
      minorityRequired: false,
      farmerRequired: false,
      studentRequired: false,
      womenOnly: true,
      requiredDocuments: ["MCP Card", "Aadhaar Card", "Bank Account Details"],
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

function mapFrontendCategoryToDb(cat) {
  if (!cat) return "";
  const c = cat.toLowerCase();
  if (c.includes("agriculture") || c.includes("farming")) return "agriculture";
  if (c.includes("healthcare") || c.includes("medical") || c.includes("health")) return "healthcare";
  if (c.includes("housing") || c.includes("shelter")) return "housing";
  if (c.includes("education") || c.includes("schloarship") || c.includes("scholarship")) return "education";
  if (c.includes("women") || c.includes("child")) return "women welfare";
  if (c.includes("employment") || c.includes("skill")) return "employment";
  if (c.includes("financial") || c.includes("loan")) return "financial aid";
  return c;
}

export const processEligibilityCheck = async (userAnswers) => {
  let dbSchemes = [];
  try {
    dbSchemes = await Scheme.find().lean();
  } catch (err) {
    console.warn("DB query failed, fallback to static dataset:", err.message);
  }

  const allSchemes = dbSchemes && dbSchemes.length > 0 ? dbSchemes : sampleSchemes;

  // Filter schemes by category if requested
  const { category } = userAnswers;
  let targetSchemes = allSchemes;
  if (category && category !== "All") {
    const mappedQueryCat = mapFrontendCategoryToDb(category);
    targetSchemes = allSchemes.filter((scheme) => {
      const dbCat = mapFrontendCategoryToDb(scheme.category);
      return dbCat === mappedQueryCat;
    });
  }

  // Evaluate matching schemes using the robust eligibility engine
  const evaluated = targetSchemes.map((scheme) => {
    const evaluation = evaluateSchemeEligibility(scheme, userAnswers);
    return {
      scheme,
      matchScore: evaluation.matchScore,
      eligibilityStatus: evaluation.eligibilityStatus,
      matchedRules: evaluation.matchedRules,
      missingRequirements: evaluation.missingRequirements,
      failedRules: evaluation.failedRules,
    };
  });

  // Sort by matchScore descending
  evaluated.sort((a, b) => b.matchScore - a.matchScore);

  return evaluated;
};
