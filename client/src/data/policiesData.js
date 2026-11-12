const policiesData = [
  {
    id: 1,
    category: "Education",
    categoryVariant: "orange",
    title: "National Education Policy 2020",
    department: "Ministry of Education",
    published: "Jul 2020",
    eligibility: ["Open for All"],
    pdf: "#",
  },
  {
    id: 2,
    category: "Healthcare",
    categoryVariant: "green",
    title: "National Health Policy 2017",
    department: "Ministry of Health",
    published: "Mar 2017",
    eligibility: ["Open for All"],
    pdf: "#",
  },
  {
    id: 3,
    category: "Technology",
    categoryVariant: "orange",
    title: "Digital India Programme",
    department: "Ministry of Electronics & IT",
    published: "Jul 2015",
    eligibility: ["Open for All"],
    pdf: "#",
  },
  {
    id: 4,
    category: "Industry",
    categoryVariant: "orange",
    title: "Make in India Initiative",
    department: "Ministry of Commerce",
    published: "Sep 2014",
    eligibility: ["Open for All"],
    pdf: "#",
  },
  {
    id: 5,
    category: "Employment",
    categoryVariant: "greenEmployment",
    title: "Skill India Mission",
    department: "Ministry of Skill Development",
    published: "Jul 2015",
    eligibility: ["Open for All"],
    pdf: "#",
  },
  {
    id: 6,
    category: "Infrastructure",
    categoryVariant: "orange",
    title: "PM GatiShakti - NMP",
    department: "Ministry of Commerce",
    published: "Oct 2021",
    eligibility: ["Open for All"],
    pdf: "#",
  },
];

export const filterCategories = [
  "All",
  "Healthcare",
  "Housing",
  "Education",
  "Women Welfare",
  "Financial Aid",
  "Employment",
  "Agriculture",
];

export const filterEligibility = [
  "Open for All",
  "Women Only",
  "SC/ST/OBC",
  "Below Poverty Line",
  "Senior Citizens",
];

export const stateOptions = ["All India (Central)", "Andhra Pradesh", "Karnataka", "Maharashtra", "Tamil Nadu"];

export const sortOptions = ["Popular", "Newest", "Oldest", "A-Z"];

export default policiesData;
