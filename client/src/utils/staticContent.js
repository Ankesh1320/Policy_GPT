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
    items: [{ label: "Dashboard", icon: "Home", to: "/citizen/dashboard" }],
  },
  {
    section: "Schemes",
    items: [
      { label: "Explore Schemes", icon: "Search", to: "/schemes" },
      { label: "Saved Schemes", icon: "Bookmark", to: "/citizen/dashboard?tab=saved-schemes" },
      { label: "Applied Schemes", icon: "FileText", to: "/citizen/dashboard?tab=applied-schemes" },
      { label: "Eligibility Checker", icon: "CheckCircle2", to: "/eligibility-checker" },
      { label: "Compare Schemes", icon: "Scale", to: "/compare" },
    ],
  },
  {
    section: "Profile",
    items: [
      { label: "My Profile", icon: "User", to: "/citizen/dashboard?tab=profile" },
      { label: "Documents", icon: "Folder", to: "/citizen/dashboard?tab=documents" },
      { label: "Notifications", icon: "Bell", to: "/citizen/dashboard?tab=notifications" },
      { label: "Settings", icon: "Settings", to: "/citizen/dashboard?tab=settings" },
    ],
  },
  {
    section: "Support",
    items: [
      { label: "Help & FAQs", icon: "HelpCircle", to: "#" },
      { label: "Contact Support", icon: "Headphones", to: "#" },
      { label: "Feedback", icon: "MessageSquare", to: "#" },
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