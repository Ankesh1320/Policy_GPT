export const navLinks = [
  { label: "Explore Schemes", href: "#" },
  { label: "Policies", href: "#" },
  { label: "Eligibility Checker", href: "#" },
  { label: "Compare", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export const sidebarSections = [
  {
    section: null,
    items: [{ label: "Dashboard", icon: "Home", active: true }],
  },
  {
    section: "Schemes",
    items: [
      { label: "Explore Schemes", icon: "Search" },
      { label: "Saved Schemes", icon: "Bookmark" },
      { label: "Applied Schemes", icon: "FileText" },
      { label: "Eligibility Checker", icon: "CheckCircle2" },
      { label: "Compare Schemes", icon: "Scale" },
    ],
  },
  {
    section: "Profile",
    items: [
      { label: "My Profile", icon: "User" },
      { label: "Documents", icon: "Folder" },
      { label: "Notifications", icon: "Bell" },
      { label: "Settings", icon: "Settings" },
    ],
  },
  {
    section: "Support",
    items: [
      { label: "Help & FAQs", icon: "HelpCircle" },
      { label: "Contact Support", icon: "Headphones" },
      { label: "Feedback", icon: "MessageSquare" },
    ],
  },
];

export const profileMenuItems = [
  { label: "Dashboard", icon: "Home" },
  { label: "Profile", icon: "User" },
  { label: "Saved Schemes", icon: "Bookmark" },
  { label: "Settings", icon: "Settings" },
  { label: "Logout", icon: "LogOut", danger: true },
];