export const filterCategories = [
  "All",
  "Agriculture",
  "Housing",
  "Healthcare",
  "Education",
  "Women Welfare",
  "Financial Aid",
  "Employment",
];

export const filterEligibility = [
  "Open for All",
  "Women Only",
  "SC/ST/OBC",
  "Below Poverty Line",
  "Senior Citizens",
];

export const stateOptions = [
  "All India (Central)",
  "Andhra Pradesh",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
];

export const sortOptions = ["Popular", "Newest", "Oldest", "A-Z"];

const schemesData = [
  {
    id: 1,
    category: "Agriculture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    ministryStat: "Agriculture & Farmers Welfare",
    title: "PM Kisan Samman Nidhi",
    description:
      "Direct income support of ₹6,000 per year in three equal instalments to small and marginal farming families across India.",
    badges: [
      { label: "Popular", type: "popular" },
      { label: "Eligible", type: "eligible" },
    ],
    benefit: "₹6,000 / year",
    applicants: "11.8 Crore",
    deadline: "Ongoing",
    eligibility: ["Open for All"],
    popularity: 1,
  },
  {
    id: 2,
    category: "Healthcare",
    ministry: "Ministry of Health & Family Welfare",
    ministryStat: "Health & Family Welfare",
    title: "Ayushman Bharat PM-JAY",
    description:
      "World's largest health assurance scheme providing coverage up to ₹5 lakh per family per year for secondary and tertiary care.",
    badges: [{ label: "Featured", type: "popular" }],
    benefit: "₹5 Lakh health...",
    applicants: "50 Crore",
    deadline: "Ongoing",
    eligibility: ["Open for All"],
    popularity: 2,
  },
  {
    id: 3,
    category: "Housing",
    ministry: "Ministry of Housing & Urban Affairs",
    ministryStat: "Housing & Urban Affairs",
    title: "PM Awas Yojana – Urban",
    description:
      "Housing for All mission providing affordable housing to eligible urban poor through interest subsidy and direct benefit transfer.",
    badges: [
      { label: "New", type: "new" },
      { label: "Eligible", type: "eligible" },
    ],
    benefit: "₹2.67 Lakh",
    applicants: "1.2 Crore",
    deadline: "5 Aug 2026",
    eligibility: ["Open for All", "Below Poverty Line"],
    popularity: 3,
  },
  {
    id: 4,
    category: "Financial Aid",
    ministry: "Ministry of Finance",
    ministryStat: "Finance",
    title: "Sukanya Samriddhi Yojana",
    description:
      "Small savings scheme for the girl child offering high interest rate to meet education and marriage expenses.",
    badges: [
      { label: "Popular", type: "popular" },
      { label: "Eligible", type: "eligible" },
    ],
    benefit: "8.2% interest...",
    applicants: "3.6 Crore",
    deadline: "Ongoing",
    eligibility: ["Women Only"],
    popularity: 4,
  },
  {
    id: 5,
    category: "Education",
    ministry: "Ministry of Education",
    ministryStat: "Education",
    title: "National Scholarship Portal",
    description:
      "Single portal consolidating scholarships from 50+ government departments for students from Class 1 to PhD level.",
    badges: [{ label: "Scholarship", type: "popular" }],
    benefit: "Up to ₹50,000",
    applicants: "1.5 Crore",
    deadline: "31 Oct 2026",
    eligibility: ["Open for All", "SC/ST/OBC"],
    popularity: 5,
  },
  {
    id: 6,
    category: "Employment",
    ministry: "Ministry of Finance",
    ministryStat: "Finance",
    title: "PM MUDRA Yojana",
    description:
      "Provides collateral-free loans up to ₹10 lakh to non-corporate, non-farm small and micro enterprises for business growth.",
    badges: [
      { label: "Business", type: "popular" },
      { label: "Eligible", type: "eligible" },
    ],
    benefit: "Loan up to ₹10...",
    applicants: "40 Crore",
    deadline: "Ongoing",
    eligibility: ["Open for All"],
    popularity: 6,
  },
];

export default schemesData;
