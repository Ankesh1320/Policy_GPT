import { AiQueryLog } from "../models/AiQueryLog.js";

const queriesByCategory = {
  "Education": [
    "What is the scholarship for engineering students?",
    "National Education Policy details",
    "Free education benefits for girls",
    "How to apply for post matric scholarship?",
    "PM Yasasvi scheme eligibility requirements",
    "Central sector scholarship scheme for college students",
    "Is there any financial aid for study abroad?",
  ],
  "Healthcare": [
    "Ayushman Bharat card eligibility",
    "Free health checkup schemes",
    "How to apply for PM-JAY?",
    "What does Ayushman Bharat cover?",
    "Jan Aushadhi Kendra locations and medicine prices",
    "Maternity benefit schemes under PM Matru Vandana Yojana",
    "Healthcare subsidy for senior citizens",
  ],
  "Agriculture": [
    "PM Kisan installment status",
    "Crop insurance details under PMFBY",
    "Subsidies for tractors and farming equipment",
    "Soil health card scheme application process",
    "PM Krishi Sinchayee Yojana features",
    "Organic farming subsidy scheme",
    "How to apply for Kisan Credit Card (KCC)?",
  ],
  "Employment": [
    "PMEGP loan application and subsidy",
    "Welfare schemes for self employment",
    "Skill development courses near me under PMKVY",
    "MGNREGA wage rates and job card process",
    "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
    "Startup India benefits for entrepreneurs",
    "Svanidhi scheme for street vendors",
  ],
  "Housing": [
    "PMAY subsidy amount and eligibility criteria",
    "Free housing scheme for rural area",
    "How to get urban home loan subsidy under PMAY-U?",
    "Pradhan Mantri Awas Yojana documents required",
    "Affordable rental housing complexes details",
    "Gramin housing scheme eligibility check",
    "PMAY credit linked subsidy scheme calculator",
  ],
  "Women & Child": [
    "Sukanya Samriddhi account opening and interest rate",
    "Welfare schemes for single mothers",
    "Nutritional benefits for pregnant women under Anganwadi",
    "Beti Bachao Beti Padhao campaign objectives",
    "Free sewing machine scheme application form",
    "Mahila Samman Savings Certificate scheme",
    "Safe motherhood intervention under Janani Suraksha Yojana",
  ],
  "Finance": [
    "Mudra loan scheme features and categories",
    "Atal Pension Yojana eligibility and pension amounts",
    "Government savings options for senior citizens",
    "Stand Up India loan criteria",
    "Pradhan Mantri Suraksha Bima Yojana benefits",
    "PM Jeevan Jyoti Bima Yojana premium details",
    "Public Provident Fund (PPF) rules",
  ]
};

const samplePolicies = [
  "PM Kisan Samman Nidhi",
  "Ayushman Bharat PM-JAY",
  "PM Awas Yojana – Urban",
  "Sukanya Samriddhi Yojana",
  "MUDRA Loan",
  "National Education Policy 2020",
  "PM Suraksha Bima Yojana",
  "Atal Pension Yojana",
  "MGNREGA",
  "PM Kaushal Vikas Yojana"
];

export const seedAnalyticsData = async (userList) => {
  console.log("Seeding AI Query logs for analytics dashboard...");

  // Clear existing logs
  await AiQueryLog.deleteMany({});

  const categories = Object.keys(queriesByCategory);
  const logsToInsert = [];
  const now = new Date();

  // Generate logs spread over the last 30 days
  for (let i = 0; i < 180; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const queries = queriesByCategory[category];
    const queryText = queries[Math.floor(Math.random() * queries.length)];
    
    // 92% successful status
    const isSuccess = Math.random() < 0.92;
    const status = isSuccess ? "success" : "failed";
    const retrievalSuccess = isSuccess ? Math.random() < 0.95 : false;
    
    // Response time between 180ms and 1500ms
    const responseTimeMs = isSuccess 
      ? Math.floor(Math.random() * 800) + 200 
      : Math.floor(Math.random() * 3000) + 1000; // Failed ones might take longer or fail fast

    // Match policy (only if successful)
    const matchedPolicy = isSuccess 
      ? samplePolicies[Math.floor(Math.random() * samplePolicies.length)]
      : null;

    // Feedback
    let feedback = "none";
    if (isSuccess) {
      const r = Math.random();
      if (r < 0.20) feedback = "positive";
      else if (r < 0.28) feedback = "negative"; // 8% negative
    }

    // Pick random user if available
    const user = userList && userList.length > 0 
      ? userList[Math.floor(Math.random() * userList.length)]._id
      : null;

    // Distribute randomly across the last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    const createdAt = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000 + hoursAgo * 60 * 60 * 1000 + minutesAgo * 60 * 1000));

    logsToInsert.push({
      queryText,
      category,
      responseTimeMs,
      status,
      retrievalSuccess,
      feedback,
      matchedPolicy,
      user,
      isDemo: true,
      createdAt,
      updatedAt: createdAt
    });
  }

  await AiQueryLog.insertMany(logsToInsert);
  console.log(`Successfully seeded ${logsToInsert.length} AI query log documents.`);
};
