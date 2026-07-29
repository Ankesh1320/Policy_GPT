const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const checkEligibilityAPI = async (criteria) => {
  try {
    const response = await fetch(`${API_BASE_URL}/eligibility/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(criteria),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to check eligibility");
    }
    return data.data;
  } catch (error) {
    console.warn("[ELIGIBILITY SERVICE] API offline or error, evaluating locally:", error.message);
    return evaluateLocally(criteria);
  }
};

export const fetchAllSchemesAPI = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/eligibility/schemes`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch schemes");
    }
    return data.schemes || [];
  } catch (error) {
    console.warn("[ELIGIBILITY SERVICE] Using fallback client schemes:", error.message);
    return fallbackSchemes;
  }
};

export const questionsData = [
  {
    step: 1,
    badge: "01",
    field: "category",
    question: "What type of scheme are you looking for?",
    helperText: "Select the category that best matches your need.",
    options: [
      "Education & Schloarship",
      "HealthCare & Medical",
      "Agriculture & Farming",
      "Housing & Shelter",
      "Employment & Skill",
      "Women & Child Welfare",
      "Financial Aid & Loans",
    ],
  },
  {
    step: 2,
    badge: "02",
    field: "ageGroup",
    question: "What is your age group?",
    helperText: "This helps match you with age-specific schemes.",
    options: [
      "Under 18",
      "18-25 years",
      "26-35 years",
      "36-50 years",
      "51-60 years",
      "Above 60 years",
    ],
  },
  {
    step: 3,
    badge: "03",
    field: "income",
    question: "What is your annual houesehold income?",
    helperText: "Income is used to check BPL, EWS, and income based eligibility.",
    options: [
      "Below ₹1 Lakh",
      "₹1-2.5 Lakh",
      "₹2.5-5 Lakh",
      "₹5-8 Lakh",
      "₹8-12 Lakh",
      "Above ₹12 Lakh",
    ],
  },
  {
    step: 4,
    badge: "04",
    field: "state",
    question: "Which state or UT do you belong to?",
    helperText: "Many Schemes are state specific.",
    options: [
      "Maharashtra",
      "Uttar Pradesh",
      "Tamil Nadu",
      "Karnataka",
      "Gujarat",
      "Rajasthan",
    ],
  },
  {
    step: 5,
    badge: "05",
    field: "occupation",
    question: "What is your primary occupation?",
    helperText: "Occupation determines eligibility for sector-specific schemes.",
    options: [
      "Student",
      "Farmer/Agricultural Worker",
      "Self-Employed / Business",
      "Salaried Employee",
      "Daily Wage Worker",
      "Unemployed",
      "Retired / Senior Citizen",
    ],
  },
];

export const fallbackSchemes = [
  {
    _id: "scheme-1",
    title: "PM Kisan Samman Nidhi",
    department: "Ministry of Agriculture & Farmers Welfare",
    category: "Agriculture & Farming",
    badgeTag: "Popular",
    description: "Direct income support of ₹6,000 per year in three equal instalment...",
    benefitStat: "₹6,000...",
    applicantsStat: "11.8 Cr...",
    deadlineStat: "Ongoing",
    eligibility: {
      minAge: 18,
      maxAge: 75,
      genders: ["Any"],
      occupations: ["Farmer/Agricultural Worker"],
      educationLevels: ["Any"],
      annualIncomeMax: 0,
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
  },
  {
    _id: "scheme-4",
    title: "PM Awas Yojana – Urban",
    department: "Ministry of Housing & Urban Affairs",
    category: "Housing & Shelter",
    badgeTag: "New",
    description: "Housing for All mission providing affordable housing to eligible urb...",
    benefitStat: "₹2.67 ...",
    applicantsStat: "1.2 Cr...",
    deadlineStat: "31 Dec...",
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
  },
  {
    _id: "scheme-5",
    title: "Sukanya Samriddhi Yojana",
    department: "Ministry of Finance",
    category: "Financial Aid & Loans",
    badgeTag: "Popular",
    description: "Small savings scheme for the girl child offering high interest rate to...",
    benefitStat: "8.2% i...",
    applicantsStat: "3.6 Cr...",
    deadlineStat: "Ongoing",
    eligibility: {
      minAge: 0,
      maxAge: 100,
      genders: ["Female"],
      occupations: ["Any"],
      educationLevels: ["Any"],
      annualIncomeMax: 0,
      states: ["All India"],
      districts: ["All"],
      socialCategories: ["All"],
      disabilityRequired: false,
      minorityRequired: false,
      farmerRequired: false,
      studentRequired: false,
      womenOnly: true,
      requiredDocuments: ["Aadhaar Card", "Active Savings Bank Account", "Birth Certificate"],
    },
  },
  {
    _id: "scheme-2",
    title: "Ayushman Bharat - PMJAY",
    department: "Ministry of Health & Family Welfare",
    category: "HealthCare & Medical",
    badgeTag: "Popular",
    description: "Health insurance cover of ₹5 Lakh per family per year for hospitalization...",
    benefitStat: "₹5 Lakh",
    applicantsStat: "24 Cr+",
    deadlineStat: "Ongoing",
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
  },
  {
    _id: "scheme-3",
    title: "Post-Matric Scholarship",
    department: "Ministry of Education",
    category: "Education & Schloarship",
    badgeTag: "New",
    description: "Financial assistance for post-matriculation studies to eligible students...",
    benefitStat: "100% Fee",
    applicantsStat: "85 Lakh+",
    deadlineStat: "31 Oct",
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
  },
  {
    _id: "scheme-6",
    title: "PM Mudra Loan Yojana",
    department: "Ministry of Finance",
    category: "Financial Aid & Loans",
    badgeTag: "Popular",
    description: "Collateral-free business loans up to ₹10 Lakhs for micro-enterprises...",
    benefitStat: "₹10 Lakh",
    applicantsStat: "42 Cr+",
    deadlineStat: "Ongoing",
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
  }
];

const getUserAge = (profile) => {
  if (profile.age !== undefined && profile.age !== null) {
    return Number(profile.age);
  }
  if (profile.ageGroup) {
    const ageGroup = profile.ageGroup.toString().trim();
    if (ageGroup === "Under 18") return 17;
    if (ageGroup === "18-25 years") return 21;
    if (ageGroup === "26-35 years") return 30;
    if (ageGroup === "36-50 years") return 42;
    if (ageGroup === "51-60 years") return 55;
    if (ageGroup === "Above 60 years") return 65;
  }
  return 22;
};

const getUserIncome = (profile) => {
  if (profile.income !== undefined && profile.income !== null) {
    if (!isNaN(profile.income)) {
      return Number(profile.income);
    }
    const incomeStr = profile.income.toString().trim();
    if (incomeStr === "Below ₹1 Lakh") return 90000;
    if (incomeStr === "₹1-2.5 Lakh") return 180000;
    if (incomeStr === "₹2.5-5 Lakh") return 350000;
    if (incomeStr === "₹5-8 Lakh") return 650000;
    if (incomeStr === "₹8-12 Lakh") return 1000000;
    if (incomeStr === "Above ₹12 Lakh") return 1500000;
  }
  if (profile.incomeRange) {
    const incomeStr = profile.incomeRange.toString().trim();
    if (incomeStr === "Below ₹1 Lakh") return 90000;
    if (incomeStr === "₹1-2.5 Lakh") return 180000;
    if (incomeStr === "₹2.5-5 Lakh") return 350000;
    if (incomeStr === "₹5-8 Lakh") return 650000;
    if (incomeStr === "₹8-12 Lakh") return 1000000;
    if (incomeStr === "Above ₹12 Lakh") return 1500000;
    if (incomeStr === "Below ₹2 Lakh") return 180000;
  }
  return 0;
};

const evaluateLocally = (criteria) => {
  const category = criteria.category || "";
  let targetSchemes = fallbackSchemes;
  if (category && category !== "All") {
    targetSchemes = fallbackSchemes.filter(
      (scheme) => scheme.category.toLowerCase().trim() === category.toLowerCase().trim()
    );
  }

  const evaluated = targetSchemes.map((scheme) => {
    const rules = scheme.eligibility || {};
    const matchedRules = [];
    const failedRules = [];
    const missingRequirements = [];
    
    let score = 0;
    const totalRules = 13;

    // 1. Age
    const age = getUserAge(criteria);
    const minAge = rules.minAge !== undefined ? rules.minAge : 0;
    const maxAge = rules.maxAge !== undefined ? rules.maxAge : 100;
    if (age >= minAge && age <= maxAge) {
      score += 1;
      matchedRules.push("Age");
    } else {
      failedRules.push("Age");
    }

    // 2. Gender
    const gender = criteria.gender || "Any";
    const genders = rules.genders || ["Any"];
    const womenOnly = !!rules.womenOnly;
    if (womenOnly && gender.toLowerCase() !== "female") {
      failedRules.push("Gender");
    } else if (!genders.includes("Any") && genders.length > 0 && !genders.includes(gender)) {
      failedRules.push("Gender");
    } else {
      score += 1;
      matchedRules.push("Gender");
    }

    // 3. Occupation
    const occupation = criteria.occupation || "Any";
    const occupations = rules.occupations || ["Any"];
    if (!occupations.includes("Any") && occupations.length > 0 && !occupations.includes(occupation)) {
      failedRules.push("Occupation");
    } else {
      score += 1;
      matchedRules.push("Occupation");
    }

    // 4. Income
    const income = getUserIncome(criteria);
    const annualIncomeMax = rules.annualIncomeMax || 0;
    if (annualIncomeMax > 0 && income > annualIncomeMax) {
      failedRules.push("Income");
    } else {
      score += 1;
      matchedRules.push("Income");
    }

    // 5. Education
    const education = criteria.education || "Any";
    const educationLevels = rules.educationLevels || ["Any"];
    if (!educationLevels.includes("Any") && educationLevels.length > 0 && !educationLevels.includes(education)) {
      failedRules.push("Education");
    } else {
      score += 1;
      matchedRules.push("Education");
    }

    // 6. State
    const state = criteria.state || "All India";
    const states = rules.states || ["All India"];
    if (!states.includes("All India") && !states.includes("All") && states.length > 0 && !states.includes(state)) {
      failedRules.push("State");
    } else {
      score += 1;
      matchedRules.push("State");
    }

    // 7. District
    const district = criteria.district || "All";
    const districts = rules.districts || ["All"];
    if (!districts.includes("All") && districts.length > 0 && !districts.includes(district)) {
      failedRules.push("District");
    } else {
      score += 1;
      matchedRules.push("District");
    }

    // 8. Social Category
    const socialCategory = criteria.socialCategory || "All";
    const socialCategories = rules.socialCategories || ["All"];
    if (!socialCategories.includes("All") && socialCategories.length > 0 && !socialCategories.includes(socialCategory)) {
      failedRules.push("Social Category");
    } else {
      score += 1;
      matchedRules.push("Social Category");
    }

    // 9. Disability
    const disability = !!criteria.disability;
    const disabilityRequired = !!rules.disabilityRequired;
    if (disabilityRequired && !disability) {
      failedRules.push("Disability Status");
    } else {
      score += 1;
      matchedRules.push("Disability Status");
    }

    // 10. Minority
    const minority = !!criteria.minority;
    const minorityRequired = !!rules.minorityRequired;
    if (minorityRequired && !minority) {
      failedRules.push("Minority Status");
    } else {
      score += 1;
      matchedRules.push("Minority Status");
    }

    // 11. Student
    const isStudent = !!criteria.student || occupation.toLowerCase() === "student";
    const studentRequired = !!rules.studentRequired;
    if (studentRequired && !isStudent) {
      failedRules.push("Student Status");
    } else {
      score += 1;
      matchedRules.push("Student Status");
    }

    // 12. Farmer
    const isFarmer = !!criteria.farmer || occupation.toLowerCase().includes("farmer");
    const farmerRequired = !!rules.farmerRequired;
    if (farmerRequired && !isFarmer) {
      failedRules.push("Farmer Status");
    } else {
      score += 1;
      matchedRules.push("Farmer Status");
    }

    // 13. Required Documents
    const userDocs = criteria.documents || [];
    const requiredDocs = rules.requiredDocuments || [];
    const missing = [];
    for (const doc of requiredDocs) {
      if (!userDocs.includes(doc)) {
        missing.push(doc);
      }
    }
    if (missing.length > 0) {
      missingRequirements.push(...missing);
      failedRules.push("Required Documents");
    } else {
      score += 1;
      matchedRules.push("Required Documents");
    }

    const matchScore = Math.round((score / totalRules) * 100);

    const eligibilityStatus = matchScore === 100 ? "Eligible" : "Not Eligible";

    return {
      scheme,
      matchScore,
      eligibilityStatus,
      matchedRules,
      missingRequirements,
      failedRules,
    };
  });

  evaluated.sort((a, b) => b.matchScore - a.matchScore);

  return evaluated;
};
