// Dummy data for Citizen Dashboard — replace with API calls later.

export const navLinks = [
  { label: "Explore Schemes", href: "#" },
  { label: "Policies", href: "#" },
  { label: "Eligibility Checker", href: "#" },
  { label: "Compare", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export const currentUser = {
  name: "Rahul Verma",
  firstName: "Rahul",
  initial: "R",
};

export const profileMenuItems = [
  { label: "Dashboard", icon: "Home" },
  { label: "Profile", icon: "User" },
  { label: "Saved Schemes", icon: "Bookmark" },
  { label: "Settings", icon: "Settings" },
  { label: "Logout", icon: "LogOut", danger: true },
];

export const welcomeStats = {
  eligibleSchemes: 18,
  deadlines: 3,
};

export const statCards = [
  {
    id: "saved",
    icon: "Bookmark",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    value: 12,
    label: "Saved Schemes",
  },
  {
    id: "eligible",
    icon: "CheckCircle2",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    value: 18,
    label: "Eligible Schemes",
  },
  {
    id: "applications",
    icon: "FileText",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    value: 3,
    label: "Applications",
  },
  {
    id: "deadlines",
    icon: "Clock",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    value: 5,
    label: "Upcoming Deadlines",
  },
];

export const savedSchemes = [
  {
    id: 1,
    name: "PM Kisan Samman Nidhi",
    subtitle: "₹6,000 / year",
    icon: "Sprout",
    iconBg: "bg-blue-50",
    status: "Eligible",
  },
  {
    id: 2,
    name: "Ayushman Bharat PM-JAY",
    subtitle: "₹5 Lakh health cover",
    icon: "HeartPulse",
    iconBg: "bg-purple-50",
    status: null,
  },
  {
    id: 3,
    name: "PM Awas Yojana – Urban",
    subtitle: "₹2.67 Lakh subsidy",
    icon: "Home",
    iconBg: "bg-orange-50",
    status: "Eligible",
  },
  {
    id: 4,
    name: "Sukanya Samriddhi Yojana",
    subtitle: "8.2% interest p.a.",
    icon: "Briefcase",
    iconBg: "bg-slate-100",
    status: "Eligible",
  },
];

export const applicationStatus = [
  { id: 1, name: "PM Kisan", status: "Approved", variant: "success" },
  { id: 2, name: "PM Awas Yojana", status: "Under Review", variant: "warning" },
  { id: 3, name: "MUDRA Loan", status: "Submitted", variant: "warning" },
];

export const recentSearches = [
  "PM Kisan",
  "Scholarship",
  "MUDRA Loan",
  "Healthcare",
  "Housing Loan",
];

export const notifications = [
  {
    id: 1,
    title: "PM Kisan 17th installment released",
    time: "2h ago",
    dotColor: "bg-orange-500",
  },
  {
    id: 2,
    title: "Scholarship deadline in 5 days",
    time: "1d ago",
    dotColor: "bg-orange-500",
  },
  {
    id: 3,
    title: "New scheme added: MUDRA Tarun",
    time: "3d ago",
    dotColor: null,
  },
];