const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const fetchCompareSchemesAPI = async (schemeIds = []) => {
  try {
    const query = schemeIds.length > 0 ? `?ids=${schemeIds.join(",")}` : "";
    const response = await fetch(`${API_BASE_URL}/compare${query}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch compare schemes");
    }
    return data.schemes || [];
  } catch (error) {
    console.warn("[COMPARE SERVICE] API offline or error, using fallback data:", error.message);
    if (schemeIds.length === 0) return allCompareSchemes;
    return allCompareSchemes.filter((s) => schemeIds.includes(s.id));
  }
};

export const fetchAllCompareSchemesAPI = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/compare/all`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch all schemes");
    }
    return data.schemes || [];
  } catch (error) {
    console.warn("[COMPARE SERVICE] API offline or error, using fallback list:", error.message);
    return allCompareSchemes;
  }
};

export const allCompareSchemes = [
  {
    id: "scheme-1",
    _id: "scheme-1",
    title: "PM Kisan Samman Nidhi",
    department: "Ministry of Agriculture & Farmers Welfare",
    shortDepartment: "Min. of Agriculture",
    category: "Agriculture",
    badgeTag: "POPULAR",
    colorTheme: "green",
    description: "Direct income support of ₹6,000 per year in three equal installments to small and marginal farmer families.",
    annualBenefit: "₹6,000 / year",
    beneficiaries: "11.8 Crore",
    eligibilitySummary: "Small farmers",
    applicationModeSummary: "Online / CSC",
    documentsSummary: "Aadhaar, Land records",
    deadline: "Ongoing",
    eligibleForYou: true,
    overview: {
      category: "Agriculture & Farmers",
      launchYear: "2019",
      targetBeneficiary: "Small & Marginal Farmers",
      implementingMinistry: "Ministry of Agriculture",
    },
    financial: {
      maxBenefit: "₹6,000 / year",
      benefitType: "Direct Cash Support",
      transferMode: "DBT (Direct Bank Transfer)",
    },
    eligibility: {
      minAge: "18 Years",
      maxAge: "75 Years",
      maxIncome: "₹2.5 Lakhs / year",
      location: "All India",
      occupation: "Farmer / Agricultural Worker",
      bplRequired: "No (Landholding based)",
    },
    application: {
      documents: ["Aadhaar Card", "Landownership Document", "Bank Passbook"],
      applicationMode: "Online & CSC Counters",
      fee: "Free",
      portalLink: "https://pmkisan.gov.in",
    },
  },
  {
    id: "scheme-2",
    _id: "scheme-2",
    title: "Ayushman Bharat PM-JAY",
    department: "Ministry of Health & Family Welfare",
    shortDepartment: "Min. of Health",
    category: "Healthcare",
    badgeTag: "FEATURED",
    colorTheme: "blue",
    description: "Health insurance cover of ₹5 Lakh per family per year for secondary and tertiary hospitalization.",
    annualBenefit: "₹5 Lakh cover",
    beneficiaries: "50 Crore",
    eligibilitySummary: "BPL families",
    applicationModeSummary: "Hospital / Online",
    documentsSummary: "Aadhaar, Ration card",
    deadline: "Ongoing",
    eligibleForYou: false,
    overview: {
      category: "Healthcare & Insurance",
      launchYear: "2018",
      targetBeneficiary: "Low Income & BPL Families",
      implementingMinistry: "Ministry of Health",
    },
    financial: {
      maxBenefit: "₹5,000,000 / family / year",
      benefitType: "Cashless Hospital Cover",
      transferMode: "Empanelled Hospital Network",
    },
    eligibility: {
      minAge: "0 Years (No Limit)",
      maxAge: "100 Years",
      maxIncome: "₹2.5 Lakhs / year",
      location: "All India",
      occupation: "Any Low-Income / Daily Wager",
      bplRequired: "Yes / SECC Database Listed",
    },
    application: {
      documents: ["Aadhaar Card", "Ration Card / Ayushman Card", "Income Certificate"],
      applicationMode: "Empanelled Hospital / Ayushman Mitra",
      fee: "Free",
      portalLink: "https://pmjay.gov.in",
    },
  },
  {
    id: "scheme-3",
    _id: "scheme-3",
    title: "Sukanya Samriddhi Yojana",
    department: "Ministry of Finance",
    shortDepartment: "Min. of Finance",
    category: "Financial Aid",
    badgeTag: "POPULAR",
    colorTheme: "purple",
    description: "Government-backed small savings scheme for the girl child offering guaranteed high interest rates.",
    annualBenefit: "8.2% Interest p.a.",
    beneficiaries: "3.6 Crore",
    eligibilitySummary: "Girl child under 10 yrs",
    applicationModeSummary: "Post Office / Bank",
    documentsSummary: "Birth certificate, Aadhaar",
    deadline: "Ongoing",
    eligibleForYou: true,
    overview: {
      category: "Financial Aid & Women Welfare",
      launchYear: "2015",
      targetBeneficiary: "Girl Child (under 10 yrs)",
      implementingMinistry: "Ministry of Finance",
    },
    financial: {
      maxBenefit: "8.2% Interest Rate (Compounded)",
      benefitType: "Savings Deposit & Tax Benefit",
      transferMode: "Post Office / Bank Account",
    },
    eligibility: {
      minAge: "Under 10 Years",
      maxAge: "21 Years (Maturity)",
      maxIncome: "No Limit",
      location: "All India",
      occupation: "Student / Minor Girl Child",
      bplRequired: "No",
    },
    application: {
      documents: ["Girl Child Birth Certificate", "Parent Aadhaar Card", "Address Proof"],
      applicationMode: "Post Office & Designated Banks",
      fee: "Free (Min ₹250 Deposit)",
      portalLink: "https://www.indiapost.gov.in",
    },
  },
  {
    id: "scheme-4",
    _id: "scheme-4",
    title: "PM Awas Yojana (Urban)",
    department: "Ministry of Housing & Urban Affairs",
    shortDepartment: "Min. of Housing",
    category: "Housing",
    badgeTag: "FEATURED",
    colorTheme: "orange",
    description: "Housing for All mission providing financial subsidy to construct or buy affordable pucca houses.",
    annualBenefit: "₹2.67 Lakh subsidy",
    beneficiaries: "1.2 Crore",
    eligibilitySummary: "Homeless / EWS families",
    applicationModeSummary: "Online Portal",
    documentsSummary: "Aadhaar, Income certificate",
    deadline: "31 Dec 2026",
    eligibleForYou: true,
    overview: {
      category: "Housing & Shelter",
      launchYear: "2015",
      targetBeneficiary: "Homeless / EWS / LIG Families",
      implementingMinistry: "Ministry of Housing & Urban Affairs",
    },
    financial: {
      maxBenefit: "Up to ₹2.67 Lakhs Credit Subsidy",
      benefitType: "Interest Subsidy / Financial Grant",
      transferMode: "Bank Account Loan Credit",
    },
    eligibility: {
      minAge: "18 Years",
      maxAge: "70 Years",
      maxIncome: "₹6.0 Lakhs / year",
      location: "Urban Areas (All India)",
      occupation: "Any (No Pucca House Owner)",
      bplRequired: "No (Income Category Based)",
    },
    application: {
      documents: ["Aadhaar Card", "Income Certificate", "Affidavit of No Pucca House"],
      applicationMode: "Online Portal (PMAY-MIS)",
      fee: "Free",
      portalLink: "https://pmaymis.gov.in",
    },
  },
];
