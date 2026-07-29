/**
 * GPPSIP Eligibility Engine
 * Compares citizen profile against structured eligibility rules of a scheme.
 */

// Helper to normalize and parse age
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
  return 22; // default fallback
};

// Helper to normalize and parse income to numeric value
const getUserIncome = (profile) => {
  if (profile.income !== undefined && profile.income !== null) {
    // If it's already a number or numeric string
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
  return 0; // default (no income specified)
};

export const evaluateSchemeEligibility = (scheme, profile) => {
  const rules = scheme.eligibility || {};
  const matchedRules = [];
  const failedRules = [];
  const missingRequirements = [];
  
  let score = 0;
  const totalRules = 13;

  // 1. Age Rule
  const age = getUserAge(profile);
  const minAge = rules.minAge !== undefined ? rules.minAge : 0;
  const maxAge = rules.maxAge !== undefined ? rules.maxAge : 100;
  if (age >= minAge && age <= maxAge) {
    score += 1;
    matchedRules.push("Age");
  } else {
    failedRules.push("Age");
  }

  // 2. Gender Rule
  const gender = profile.gender || "Any";
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

  // 3. Occupation Rule
  const occupation = profile.occupation || "Any";
  const occupations = rules.occupations || ["Any"];
  if (!occupations.includes("Any") && occupations.length > 0 && !occupations.includes(occupation)) {
    failedRules.push("Occupation");
  } else {
    score += 1;
    matchedRules.push("Occupation");
  }

  // 4. Income Rule
  const income = getUserIncome(profile);
  const annualIncomeMax = rules.annualIncomeMax || 0;
  if (annualIncomeMax > 0 && income > annualIncomeMax) {
    failedRules.push("Income");
  } else {
    score += 1;
    matchedRules.push("Income");
  }

  // 5. Education Rule
  const education = profile.education || "Any";
  const educationLevels = rules.educationLevels || ["Any"];
  if (!educationLevels.includes("Any") && educationLevels.length > 0 && !educationLevels.includes(education)) {
    failedRules.push("Education");
  } else {
    score += 1;
    matchedRules.push("Education");
  }

  // 6. State Rule
  const state = profile.state || "All India";
  const states = rules.states || ["All India"];
  if (!states.includes("All India") && !states.includes("All") && states.length > 0 && !states.includes(state)) {
    failedRules.push("State");
  } else {
    score += 1;
    matchedRules.push("State");
  }

  // 7. District Rule
  const district = profile.district || "All";
  const districts = rules.districts || ["All"];
  if (!districts.includes("All") && districts.length > 0 && !districts.includes(district)) {
    failedRules.push("District");
  } else {
    score += 1;
    matchedRules.push("District");
  }

  // 8. Social Category Rule
  const socialCategory = profile.socialCategory || "All";
  const socialCategories = rules.socialCategories || ["All"];
  if (!socialCategories.includes("All") && socialCategories.length > 0 && !socialCategories.includes(socialCategory)) {
    failedRules.push("Social Category");
  } else {
    score += 1;
    matchedRules.push("Social Category");
  }

  // 9. Disability Rule
  const disability = !!profile.disability;
  const disabilityRequired = !!rules.disabilityRequired;
  if (disabilityRequired && !disability) {
    failedRules.push("Disability Status");
  } else {
    score += 1;
    matchedRules.push("Disability Status");
  }

  // 10. Minority Rule
  const minority = !!profile.minority;
  const minorityRequired = !!rules.minorityRequired;
  if (minorityRequired && !minority) {
    failedRules.push("Minority Status");
  } else {
    score += 1;
    matchedRules.push("Minority Status");
  }

  // 11. Student Rule
  const isStudent = !!profile.student || occupation.toLowerCase() === "student";
  const studentRequired = !!rules.studentRequired;
  if (studentRequired && !isStudent) {
    failedRules.push("Student Status");
  } else {
    score += 1;
    matchedRules.push("Student Status");
  }

  // 12. Farmer Rule
  const isFarmer = !!profile.farmer || occupation.toLowerCase().includes("farmer");
  const farmerRequired = !!rules.farmerRequired;
  if (farmerRequired && !isFarmer) {
    failedRules.push("Farmer Status");
  } else {
    score += 1;
    matchedRules.push("Farmer Status");
  }

  // 13. Required Documents Rule
  const userDocs = profile.documents || [];
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

  // Status mapping
  const eligibilityStatus = matchScore === 100 ? "Eligible" : "Not Eligible";

  return {
    matchScore,
    eligibilityStatus,
    matchedRules,
    missingRequirements,
    failedRules,
  };
};
