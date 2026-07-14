import educationIcon from '../assets/icons/education.svg';
import healthcareIcon from '../assets/icons/healthcare.svg';
import agricultureIcon from '../assets/icons/agriculture.svg';
import houseIcon from '../assets/icons/house.svg';
import employmentIcon from '../assets/icons/employment.svg';
import womenIcon from '../assets/icons/women.svg';
import childIcon from '../assets/icons/child.svg';
import financeIcon from '../assets/icons/finance.svg';
import schemesIcon from '../assets/icons/schemes.svg';
import policiesIcon from '../assets/icons/Policies.svg';
import peopleIcon from '../assets/icons/people.svg';
import mapIcon from '../assets/icons/map.svg';

export const navLinks = [
  { label: 'Explore Schemes', href: '#categories' },
  { label: 'Policies', href: '#updates' },
  { label: 'Eligibility Checker', href: '#find-schemes' },
  { label: 'Compare', href: '#how-it-works' },
  { label: 'About', href: '#testimonials' },
  { label: 'Contact', href: '#footer' },
];

export const heroStats = [
  { icon: schemesIcon, value: '2,400+', label: 'Government Schemes', valueColor: 'text-brand-blue-dark' },
  { icon: policiesIcon, value: '850+', label: 'Policies Indexed', valueColor: 'text-brand-orange' },
  { icon: peopleIcon, value: '48 Lakh+', label: 'Citizens Helped', valueColor: 'text-brand-green' },
  { icon: mapIcon, value: '28', label: 'State & UTs Covered', valueColor: 'text-brand-blue-dark' },
];

export const popularTags = ['PM Kisan', 'Ayushman Bharat', 'Scholarships', 'MUDRA Loan', 'PM Awas'];

export const categories = [
  { name: 'Education', count: '142 Schemes', icon: educationIcon, variant: 'blue' },
  { name: 'Healthcare', count: '89 Schemes', icon: healthcareIcon, variant: 'green' },
  { name: 'Agriculture', count: '203 Schemes', icon: agricultureIcon, variant: 'orange' },
  { name: 'Housing', count: '67 Schemes', icon: houseIcon, variant: 'blue' },
  { name: 'Employment', count: '115 Schemes', icon: employmentIcon, variant: 'green' },
  { name: 'Women Welfare', count: '94 Schemes', icon: womenIcon, variant: 'orange' },
  { name: 'Child Development', count: '78 Schemes', icon: childIcon, variant: 'blue' },
  { name: 'Financial Aid', count: '156 Schemes', icon: financeIcon, variant: 'green' },
];

export const featuredSchemes = [
  {
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    title: 'PM Kisan Samman Nidhi',
    description:
      'Direct income support of ₹6,000 per year in three equal instalments to small and marginal farming...',
    badges: [{ label: 'Popular', type: 'popular' }],
    benefit: '₹6,000 / year',
    applicants: '11.8 Crore',
    deadline: 'Ongoing',
  },
  {
    ministry: 'Ministry of Health & Family Welfare',
    title: 'Ayushman Bharat PM-JAY',
    description:
      "World's largest health assurance scheme providing coverage up to ₹5 lakh per family per...",
    badges: [{ label: 'Featured', type: 'popular' }],
    benefit: '₹5 Lakh heal...',
    applicants: '50 Crore',
    deadline: 'Ongoing',
  },
  {
    ministry: 'Ministry of Housing & Urban Affairs',
    title: 'PM Awas Yojana – Urban',
    description:
      'Housing for All mission providing affordable housing to eligible urban poor through interest...',
    badges: [
      { label: 'New', type: 'new' },
      { label: 'Eligible', type: 'eligible' },
    ],
    benefit: '₹2.67 Lakh',
    applicants: '1.2 Crore',
    deadline: '5 Aug 2026',
  },
  {
    ministry: 'Ministry of Finance',
    title: 'Sukanya Samriddhi Yojana',
    description:
      'Small savings scheme for the girl child offering high interest rate to meet education and marria...',
    badges: [
      { label: 'Popular', type: 'popular' },
      { label: 'Eligible', type: 'eligible' },
    ],
    benefit: '8.2% interest...',
    applicants: '3.6 Crore',
    deadline: 'Ongoing',
  },
  {
    ministry: 'Ministry of Education',
    title: 'National Scholarship Portal',
    description:
      'Single portal consolidating scholarships from 50+ government departments for students from Cla...',
    badges: [{ label: 'Scholarship', type: 'popular' }],
    benefit: 'Up to ₹50,000',
    applicants: '1.5 Crore',
    deadline: '31 Oct 2026',
  },
  {
    ministry: 'Ministry of Finance',
    title: 'PM MUDRA Yojana',
    description:
      'Provides collateral-free loans up to ₹10 lakh to non-corporate, non-farm small and micro...',
    badges: [
      { label: 'Business', type: 'popular' },
      { label: 'Eligible', type: 'eligible' },
    ],
    benefit: 'Loan up to ₹10...',
    applicants: '40 Crore',
    deadline: 'Ongoing',
  },
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Search or Browse',
    description:
      'Search by keyword or browse across 20+ categories — education, health, agriculture, housing, and more.',
    circleBg: 'bg-card-blue',
    circleColor: 'bg-brand-blue-dark',
    lineColor: 'bg-brand-orange',
  },
  {
    step: '02',
    title: 'Check Eligibility',
    description:
      'Answer a few simple questions. Our AI instantly matches you with schemes you actually qualify for.',
    circleBg: 'bg-card-orange',
    circleColor: 'bg-brand-orange',
    lineColor: 'bg-brand-blue-dark',
  },
  {
    step: '03',
    title: 'Compare & Decide',
    description:
      'View benefits side-by-side and read plain-language summaries of complex policy documents.',
    circleBg: 'bg-card-green',
    circleColor: 'bg-brand-green',
    lineColor: 'bg-brand-green',
  },
  {
    step: '04',
    title: 'Apply with Guidance',
    description:
      'Follow our step-by-step application guide, upload documents, and track your application status.',
    circleBg: 'bg-card-blue',
    circleColor: 'bg-brand-blue-dark',
    lineColor: null,
  },
];

export const eligibilityMatches = [
  { name: 'PM Kisan Samman Nidhi', percent: 97, color: 'bg-brand-blue' },
  { name: 'Ayushman Bharat PM-JAY', percent: 84, color: 'bg-brand-orange' },
  { name: 'PM Awas Yojana Urban', percent: 73, color: 'bg-brand-green' },
  { name: 'MUDRA Yojana Tarun', percent: 61, color: 'bg-brand-blue' },
];

export const latestUpdates = [
  {
    category: 'Education',
    categoryType: 'orange',
    date: '20 July 2026',
    title: 'National Scholarship Applications Open for 2026-27',
    description:
      'Fresh and renewal applications for 50+ national scholarships are now open. Last date to apply is October 31, 2026.',
    dotColor: 'bg-brand-orange',
  },
  {
    category: 'Healthcare',
    categoryType: 'blue',
    date: '25 July 2026',
    title: 'Ayushman Bharat Scheme Extended to 70+ Age Group',
    description:
      'Senior citizens above 70 years will now receive an additional ₹5 lakh health coverage under AB PM-JAY scheme.',
    dotColor: 'bg-brand-blue-dark',
  },
  {
    category: 'Agriculture',
    categoryType: 'green',
    date: '28 July 2026',
    title: 'PM Kisan 17th Installment Released to 9.2 Crore Farmers',
    description:
      "The 17th installment of PM Kisan Samman Nidhi has been credited directly into farmers' bank accounts via DBT.",
    dotColor: 'bg-brand-green',
  },
];

export const testimonials = [
  {
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'Student, Delhi University',
    quote:
      '"PolicyGPT helped me find 3 scholarships I never knew existed. The eligibility checker saved me hours of research and the application guide was crystal clear."',
    variant: 'orange',
  },
  {
    initials: 'RK',
    name: 'Rajesh Kumar',
    role: 'Farmer, Nashik, Maharashtra',
    quote:
      '"I discovered PM Kisan and 2 other agriculture schemes through this platform. The Hindi support and step-by-step guidance made everything so easy."',
    variant: 'blue',
  },
  {
    initials: 'AM',
    name: 'Anita Mehta',
    role: 'NGO Director, Bengaluru',
    quote:
      '"We use PolicyGPT daily to help our 200+ beneficiaries navigate welfare schemes. The comparison feature and bulk eligibility check are game changers."',
    variant: 'green',
  },
];

export const faqItems = [
  {
    question: 'Is PolicyGPT free to use ?',
    answer:
      'Yes, PolicyGPT is free for citizens to search, compare, and check eligibility for government schemes.',
  },
  {
    question: 'How accurate is the eligibility checker?',
    answer:
      'The eligibility checker combines official scheme criteria with our AI matching to provide a high-quality recommendation. It is intended as guidance, always review the official scheme rules before applying.',
  },
  {
    question: 'Can I apply for schemes directly through PolicyGPT?',
    answer:
      'Where available, PolicyGPT provides direct application links or guided, step-by-step application help. Many schemes require final submission on the government portal; PolicyGPT links you to the correct application page and helps prepare required documents.',
  },
  {
    question: 'Is my data safe on PolicyGPT?',
    answer:
      "We take data privacy seriously: personal data is stored securely and encrypted in transit. We do not share your personal information with third parties without consent except where required by law or to complete an application you requested.",
  },
  {
    question: 'How often is the scheme database updated?',
    answer: 'Our scheme database is updated daily from official sources and partner feeds to ensure accuracy and freshness.',
  },
];

export const footerPlatformLinks = [
  'Explore Schemes',
  'Explore Policies',
  'Eligibility Checker',
  'Compare Schemes',
  'Search',
];

export const footerCompanyLinks = ['About Us', 'Contact', 'Feedback', 'Careers', 'Press'];

export const footerLegalLinks = [
  'Privacy Policy',
  'Terms of Use',
  'Cookie Policy',
  'Disclaimer',
];

export const categoryVariantStyles = {
  blue: {
    card: 'bg-card-blue border-[#C7D2FE]',
    icon: 'text-brand-blue-dark',
  },
  green: {
    card: 'bg-card-green border-[#BBF7D0]',
    icon: 'text-brand-green',
  },
  orange: {
    card: 'bg-card-orange border-[#FDE8C8]',
    icon: 'text-brand-orange',
  },
};

export const badgeStyles = {
  popular: 'bg-card-orange text-brand-orange',
  new: 'bg-[#E3F3FF] text-brand-blue-dark',
  eligible: 'bg-card-green text-brand-green',
  scholarship: 'bg-card-orange text-brand-orange',
};

export const categoryBadgeStyles = {
  orange: 'bg-card-orange text-brand-orange',
  blue: 'bg-card-blue text-brand-blue-dark',
  green: 'bg-card-green text-brand-green',
};

export const testimonialVariantStyles = {
  orange: 'bg-card-orange',
  blue: 'bg-card-blue',
  green: 'bg-card-green',
};
