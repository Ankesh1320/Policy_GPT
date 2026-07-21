const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

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
    _id: "s1",
    title: "PM Kisan Samman Nidhi",
    department: "Ministry of Agriculture & Farmers Welfare",
    category: "Agriculture & Farming",
    badgeTag: "Popular",
    description: "Direct income support of ₹6,000 per year in three equal instalment...",
    benefitStat: "₹6,000...",
    applicantsStat: "11.8 Cr...",
    deadlineStat: "Ongoing",
    eligibilityCriteria: { minAge: 18, maxAge: 75, occupations: ["Farmer/Agricultural Worker"] },
  },
  {
    _id: "s2",
    title: "PM Awas Yojana – Urban",
    department: "Ministry of Housing & Urban Affairs",
    category: "Housing & Shelter",
    badgeTag: "New",
    description: "Housing for All mission providing affordable housing to eligible urb...",
    benefitStat: "₹2.67 ...",
    applicantsStat: "1.2 Cr...",
    deadlineStat: "31 Dec...",
    eligibilityCriteria: { minAge: 18, maxAge: 70 },
  },
  {
    _id: "s3",
    title: "Sukanya Samriddhi Yojana",
    department: "Ministry of Finance",
    category: "Financial Aid & Loans",
    badgeTag: "Popular",
    description: "Small savings scheme for the girl child offering high interest rate to...",
    benefitStat: "8.2% i...",
    applicantsStat: "3.6 Cr...",
    deadlineStat: "Ongoing",
    eligibilityCriteria: { minAge: 0, maxAge: 100 },
  },
  {
    _id: "s4",
    title: "Ayushman Bharat - PMJAY",
    department: "Ministry of Health & Family Welfare",
    category: "HealthCare & Medical",
    badgeTag: "Popular",
    description: "Health insurance cover of ₹5 Lakh per family per year for hospitalization...",
    benefitStat: "₹5 Lakh",
    applicantsStat: "24 Cr+",
    deadlineStat: "Ongoing",
    eligibilityCriteria: { minAge: 0, maxAge: 100 },
  },
  {
    _id: "s5",
    title: "Post-Matric Scholarship",
    department: "Ministry of Education",
    category: "Education & Schloarship",
    badgeTag: "New",
    description: "Financial assistance for post-matriculation studies to eligible students...",
    benefitStat: "100% Fee",
    applicantsStat: "85 Lakh+",
    deadlineStat: "31 Oct",
    eligibilityCriteria: { minAge: 15, maxAge: 30, occupations: ["Student"] },
  },
  {
    _id: "s6",
    title: "PM Mudra Loan Yojana",
    department: "Ministry of Finance",
    category: "Financial Aid & Loans",
    badgeTag: "Popular",
    description: "Collateral-free business loans up to ₹10 Lakhs for micro-enterprises...",
    benefitStat: "₹10 Lakh",
    applicantsStat: "42 Cr+",
    deadlineStat: "Ongoing",
    eligibilityCriteria: { minAge: 18, maxAge: 65, occupations: ["Self-Employed / Business"] },
  }
];

const evaluateLocally = (criteria) => {
  const category = criteria.category || "";
  const occupation = criteria.occupation || "";

  const schemes = fallbackSchemes.map((scheme) => {
    let matchPercentage = 95;
    if (category && scheme.category !== category) {
      matchPercentage -= 10;
    }
    if (scheme.eligibilityCriteria.occupations && !scheme.eligibilityCriteria.occupations.includes(occupation)) {
      matchPercentage -= 15;
    }

    return {
      ...scheme,
      matchPercentage: Math.max(matchPercentage, 70),
      isFullyEligible: true,
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    totalEvaluated: 18,
    eligibleCount: 18,
    criteria,
    schemes,
  };
};
