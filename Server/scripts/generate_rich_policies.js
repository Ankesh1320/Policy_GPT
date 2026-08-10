import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const destPath = path.join(__dirname, "../data/policies.json");

const policies = [
  {
    name: "National Education Policy 2020",
    title: "National Education Policy 2020",
    department: "Ministry of Education",
    category: "Education",
    description: "The National Education Policy 2020 provides a comprehensive framework for school and higher education. It seeks to replace rigid educational structures with more flexible learning pathways and emphasizes the development of knowledge, skills, values, and responsible citizenship.\n\nNEP 2020 replaces the earlier National Policy on Education 1986 (as amended in 1992). It sets out a comprehensive vision covering school education, higher education, vocational education, and teacher education — with a target of full implementation by 2040.",
    effectiveDate: "29 July 2020",
    status: "Published",
    eligibility: [
      "Children requiring early childhood care and education",
      "School students in foundational, preparatory, middle and secondary stages",
      "Students pursuing undergraduate, postgraduate and other higher education",
      "Teachers, educators and academic professionals"
    ],
    pdf: "https://www.education.gov.in/nep-2020-english.pdf",
    icon: "BookOpen",
    vision: "To build an equitable, inclusive, and future-ready education system that prepares every learner with the knowledge, skills, values, and character needed for the 21st century — rooted in India's traditions and aligned with global aspirations.",
    objectives: [
      "Improve quality and learning outcomes at all education levels",
      "Promote multidisciplinary and holistic learning",
      "Increase Gross Enrolment Ratio to 50% in higher education by 2035",
      "Encourage digital and technology-enabled education",
      "Reduce school dropout rates through flexible and inclusive systems"
    ],
    keyBenefits: [
      { icon: "LuLayers", title: "Flexible Subject Choices", desc: "Students can choose subjects across streams — no rigid Science / Commerce / Arts division.", color: "text-purple-600", bg: "bg-purple-50" },
      { icon: "LuWrench", title: "Vocational from Grade 6", desc: "Practical skills and vocational training integrated from middle school onwards.", color: "text-gray-500", bg: "bg-gray-100" },
      { icon: "LuGraduationCap", title: "Multiple Entry & Exit", desc: "Undergraduate students can exit with a Certificate (1 yr), Diploma (2 yr), or Degree (3-4 yr).", color: "text-blue-800", bg: "bg-indigo-50" }
    ],
    whoIsAffected: [
      { title: "Students", desc: "From pre-primary to doctoral level across India", isPrimary: true, icon: "LuBackpack" },
      { title: "Teachers & Educators", desc: "All school and college faculty", isPrimary: true, icon: "LuBookOpen" },
      { title: "Parents & Guardians", desc: "Families with school and college-going children", isPrimary: false, icon: "LuUsers" }
    ],
    importantChanges: [
      { title: "New 5+3+3+4 School Structure", desc: "Replaces the old 10+2 format. Covers Foundational (age 3-8), Preparatory (8-11), Middle (11-14), and Secondary (14-18) stages." },
      { title: "Removal of Rigid Streams", desc: "Students are no longer locked into Science, Commerce, or Arts. Any subject combination is permitted from Grade 11." }
    ],
    timeline: [
      { year: "2020", title: "Policy Approved", desc: "Union Cabinet approves NEP 2020 on 29 July, replacing the 34-year-old policy." },
      { year: "2021", title: "Curriculum Planning", desc: "NCERT begins revising National Curriculum Framework. Higher education institutions start 4-year UG pilot programmes." },
      { year: "2040", title: "Nationwide Full Implementation", desc: "Target year for complete implementation of all NEP 2020 reforms across all institutions and levels." }
    ],
    faqs: [
      { q: "What is NEP 2020?", a: "The National Education Policy 2020 is a comprehensive framework designed to modernise the education system in India, aiming to transform learning from pre-primary through higher education." },
      { q: "Who does this policy apply to?", a: "It applies to all educational institutions, including schools, colleges, and universities across India, affecting students, teachers, and administrators." }
    ]
  },
  {
    name: "National Health Policy 2017",
    title: "National Health Policy 2017",
    department: "Ministry of Health and Family Welfare",
    category: "Health",
    description: "The National Health Policy 2017 provides a comprehensive framework for improving the health and wellbeing of people in India. It seeks to achieve the highest possible level of health for all through preventive, promotive, curative, and rehabilitative care, with universal access to quality healthcare services.\n\nNHP 2017 replaces the earlier National Health Policy 2002. It sets out to strengthen primary healthcare networks, reduce out-of-pocket medical expenditure, and improve health infrastructure across rural and urban settings.",
    effectiveDate: "15 March 2017",
    status: "Published",
    eligibility: [
      "All citizens of India seeking healthcare access",
      "Pregnant women and infants requiring vaccination",
      "Older persons requiring medical and geriatric support"
    ],
    pdf: "https://www.mohfw.gov.in/sites/default/files/9147562941489753121.pdf",
    icon: "HeartPulse",
    vision: "To attain the highest possible level of health and well-being for all at all ages, through a preventive and promotive health care orientation, and universal access to good quality health care services without facing financial hardship.",
    objectives: [
      "Improve life expectancy at birth from 67.5 to 70 years by 2025",
      "Reduce under-five mortality and maternal mortality rates",
      "Reduce out-of-pocket healthcare expenditure for poor families",
      "Increase public health expenditure to 2.5% of GDP"
    ],
    keyBenefits: [
      { icon: "LuShieldCheck", title: "Free Primary Drugs", desc: "Ensures access to free essential medicines and diagnostic tests at all public wellness centers.", color: "text-green-600", bg: "bg-green-50" },
      { icon: "LuStethoscope", title: "Wellness Centers", desc: "Upgradation of local centers to provide comprehensive wellness and diagnostic care.", color: "text-blue-600", bg: "bg-blue-50" }
    ],
    whoIsAffected: [
      { title: "Citizens", desc: "Every citizen seeking healthcare services and medical safety", isPrimary: true, icon: "LuUsers" },
      { title: "Medical Staff", desc: "Doctors, nurses, and local ASHA workers", isPrimary: true, icon: "LuActivity" }
    ],
    importantChanges: [
      { title: "Shift to Preventive Care", desc: "Prioritizing prevention of lifestyle diseases and sanitation over purely curative treatments." },
      { title: "Digital Health Logs", desc: "Establishment of electronic health registries to monitor treatments across public clinics." }
    ],
    timeline: [
      { year: "2017", title: "Policy Release", desc: "Cabinet adopts the updated NHP 2017 framework." },
      { year: "2020", title: "Center Upgradations", desc: "Initial conversion of sub-centers to primary Wellness Centers begins." },
      { year: "2025", title: "Target Evaluation", desc: "Major health indicators evaluated against policy target expectations." }
    ],
    faqs: [
      { q: "What is the primary target of NHP 2017?", a: "Its main goal is to transition from curative healthcare to preventive and promotive healthcare, providing universal health coverage without financial distress." },
      { q: "How does it reduce medical expenses?", a: "By offering free diagnostic testing and essential drugs at public primary clinics, reducing private pharmacy expenditures." }
    ]
  },
  {
    name: "National Environment Policy 2006",
    title: "National Environment Policy 2006",
    department: "Ministry of Environment, Forest and Climate Change",
    category: "Environment",
    description: "The National Environment Policy 2006 provides a key framework for environmental management and sustainable development in India. It seeks to conserve critical resources, protect delicate ecological systems, and improve environmental governance through public participation and science-based reviews.\n\nNEP 2006 integrates environmental concerns directly into developmental planning. It establishes guidelines for pollution control, wildlife protection, and community-led resource conservation to ensure a clean and green environment.",
    effectiveDate: "18 May 2006",
    status: "Published",
    eligibility: [
      "Citizens and local communities in ecological zones",
      "Industries and businesses whose activities affect environment",
      "Environmental organizations and research bodies"
    ],
    pdf: "https://www.moef.gov.in/uploads/2017/07/introduction-nep2006e.pdf",
    icon: "Leaf",
    vision: "To guide environmental management and ensure sustainable development, balancing economic growth with resource conservation, biodiversity protection, and clean ecological systems.",
    objectives: [
      "Conserve critical environmental resources like forests, water bodies, and wildlife",
      "Promote sustainable use of resources in agricultural and urban planning",
      "Ensure environmental clearances are transparent and science-based",
      "Minimize pollution in air, soil, and water systems"
    ],
    keyBenefits: [
      { icon: "LuTrees", title: "Habitat Preservation", desc: "Protects critical wetlands, forest zones, and endangered species habitats.", color: "text-emerald-600", bg: "bg-emerald-50" },
      { icon: "LuWind", title: "Clean Air Initiatives", desc: "Enforces stricter emissions norms for factories and urban transport grids.", color: "text-cyan-600", bg: "bg-cyan-50" }
    ],
    whoIsAffected: [
      { title: "Forest Dwellers", desc: "Tribal and local communities dependent on forest resources", isPrimary: true, icon: "LuHome" },
      { title: "Industrialists", desc: "Commercial enterprises operating in heavy and resource-dependent sectors", isPrimary: true, icon: "LuFactory" }
    ],
    importantChanges: [
      { title: "Stricter Clearances", desc: "Mandatory environmental impact reviews for large infrastructure projects." },
      { title: "Community Partnerships", desc: "Empowering local Gram Sabhas and Joint Forest Management committees in conservation efforts." }
    ],
    timeline: [
      { year: "2006", title: "Framework Release", desc: "Union Cabinet approves the environment policy." },
      { year: "2010", title: "National Green Tribunal", desc: "Establishment of NGT to handle environment dispute litigations." }
    ],
    faqs: [
      { q: "What is the focus of NEP 2006?", a: "It focuses on reconciling environmental protection with economic development, ensuring sustainable livelihood for resource-dependent populations." },
      { q: "How are local communities empowered?", a: "They are given legal rights and responsibilities in joint management of local forests and water bodies." }
    ]
  },
  {
    name: "National Water Policy 2012",
    title: "National Water Policy 2012",
    department: "Ministry of Jal Shakti",
    category: "Water Resources",
    description: "The National Water Policy 2012 provides a comprehensive national framework for planning, development, and management of India's water resources. It emphasizes water conservation, recycling, waste water reuse, and equitable allocation of water across household, agricultural, and industrial sectors.\n\nNWP 2012 replaces the previous water policies of 1987 and 2002. It aims to regulate groundwater extraction, promote rainwater harvesting, and set up inter-state river basin management authorities to resolve resource conflicts.",
    effectiveDate: "28 December 2012",
    status: "Published",
    eligibility: [
      "Farmers and agricultural communities using irrigation",
      "Urban and rural local bodies managing water supplies",
      "Water conservation agencies and project developers"
    ],
    pdf: "https://www.jalshakti-dowr.gov.in/documents/act-and-policies/policies-ANzITNtQWa",
    icon: "Droplets",
    vision: "To manage water resources in an integrated, sustainable, and equitable manner, ensuring safe drinking water for all, water security for agriculture, and preservation of river basins.",
    objectives: [
      "Prioritize safe drinking water and sanitation for all citizens",
      "Encourage water recycling and reuse in industrial sectors",
      "Increase water-use efficiency in agriculture by 20%",
      "Formulate river basin management authorities for inter-state basins"
    ],
    keyBenefits: [
      { icon: "LuDroplet", title: "Irrigation Security", desc: "Promotes drip irrigation and sprinkler systems to optimize farm water efficiency.", color: "text-sky-600", bg: "bg-sky-50" },
      { icon: "LuTrash2", title: "Pollution Audits", desc: "Stricter monitoring of industrial effluents dumped into major rivers.", color: "text-rose-600", bg: "bg-rose-50" }
    ],
    whoIsAffected: [
      { title: "Agriculturalists", desc: "Farmers relying on irrigation canals and groundwater", isPrimary: true, icon: "LuSprout" },
      { title: "Municipalities", desc: "City water boards and village panchayats managing domestic supplies", isPrimary: true, icon: "LuLandmark" }
    ],
    importantChanges: [
      { title: "Water Pricing Reforms", desc: "Introduction of progressive tariff structures to discourage wastage of drinking water." },
      { title: "Recycling Targets", desc: "Mandatory recycling of waste water for industries consuming high water volumes." }
    ],
    timeline: [
      { year: "2012", title: "Policy Enacted", desc: "National Water Board adopts the revised policy framework." },
      { year: "2015", title: "Jal Kranti Launched", desc: "Gram-level water conservation campaigns rolled out across dry regions." }
    ],
    faqs: [
      { q: "How does the policy tackle groundwater depletion?", a: "It regulates extraction, mandates rainwater harvesting in buildings, and supports artificial recharge of aquifers." },
      { q: "What is river basin management?", a: "It is an approach that treats an entire river basin as a single planning unit, rather than managing water separately by state boundaries." }
    ]
  },
  {
    name: "National Youth Policy 2014",
    title: "National Youth Policy 2014",
    department: "Ministry of Youth Affairs and Sports",
    category: "Youth",
    description: "The National Youth Policy 2014 provides a comprehensive framework for empowering India's young population aged 15-29 years. It focuses on skill enhancement, entrepreneurship support, employment generation, and physical health to harness the country's demographic dividend.\n\nNYP 2014 replaces the earlier policy of 2003. It establishes guidelines for adolescent healthcare, leadership training, and active participation of youth in civic governance and social work campaigns.",
    effectiveDate: "9 January 2014",
    status: "Published",
    eligibility: [
      "Young citizens between 15 and 29 years of age",
      "Youth from marginalized and rural communities",
      "Aspiring young entrepreneurs and skill learners"
    ],
    pdf: "https://yas.nic.in/sites/default/files/National-Youth-Policy-Document.pdf",
    icon: "Users",
    vision: "To empower youth to achieve their full potential, enabling India to take its rightful place in the community of nations through skill enhancement, entrepreneurship support, and civic engagement.",
    objectives: [
      "Improve access to skill training for rural and disadvantaged youth",
      "Promote youth entrepreneurship and micro-finance access",
      "Strengthen sports infrastructure and physical fitness programs",
      "Integrate health, nutrition, and counseling services for adolescents"
    ],
    keyBenefits: [
      { icon: "LuLightbulb", title: "Startup Support", desc: "Financial assistance and mentoring schemes for youth-led business startups.", color: "text-amber-500", bg: "bg-amber-50" },
      { icon: "LuHeart", title: "Wellness Clinics", desc: "Dedicated adolescent health clinics providing counseling and nutritional guidance.", color: "text-pink-600", bg: "bg-pink-50" }
    ],
    whoIsAffected: [
      { title: "Young Adults", desc: "Individuals aged 15-29 pursuing education or career starts", isPrimary: true, icon: "LuUserCheck" },
      { title: "Skill Centers", desc: "Training institutes and mentorship hubs catering to young job seekers", isPrimary: true, icon: "LuSchool" }
    ],
    importantChanges: [
      { title: "Redefined Age Bracket", desc: "Redefining youth category as 15-29 years to align targets with developmental transitions." },
      { title: "Civic Service Initiatives", desc: "Expanding National Service Scheme (NSS) opportunities to encourage community work." }
    ],
    timeline: [
      { year: "2014", title: "Policy Release", desc: "Cabinet releases the NYP 2014 framework." },
      { year: "2018", title: "Sporting Initiatives", desc: "Launch of Khelo India youth fitness and sporting scouting campaigns." }
    ],
    faqs: [
      { q: "Who falls under the Youth category in this policy?", a: "Any citizen between the ages of 15 and 29 years is considered a youth under this policy framework." },
      { q: "How does the policy support young entrepreneurs?", a: "By establishing entrepreneurship development modules, funding channels, and incubators for young startups." }
    ]
  },
  {
    name: "National Policy on Skill Development and Entrepreneurship 2015",
    title: "National Policy on Skill Development and Entrepreneurship 2015",
    department: "Ministry of Skill Development and Entrepreneurship",
    category: "Skill Development",
    description: "The National Policy on Skill Development and Entrepreneurship 2015 establishes a national framework for developing a highly skilled workforce. It seeks to provide individuals with access to quality vocational training, standardize certifications, and foster an active entrepreneurship culture.\n\nNPSDE 2015 replaces the national skill policy of 2009. It focuses on aligning training with industrial demands, launching subsidy schemes like PMKVY, and supporting startup incubators to drive self-employment.",
    effectiveDate: "15 July 2015",
    status: "Published",
    eligibility: [
      "Job seekers requiring technical or vocational skills",
      "Existing workers seeking upskilling or reskilling",
      "Women interested in skill training and startup ventures"
    ],
    pdf: "https://www.msde.gov.in/static/uploads/2024/02/National-Policy-on-Skill-Development-and-Entreprenurship-Final-1.pdf",
    icon: "GraduationCap",
    vision: "To create an ecosystem of empowerment by skilling on a large scale at speed with high standards, and to promote an entrepreneurship culture that generates sustainable livelihoods.",
    objectives: [
      "Provide industry-aligned vocational training to millions of youth",
      "Establish a common national standard framework for certifications",
      "Build incubation centers and ease access to credit for new startups",
      "Increase participation of women in technical training programs"
    ],
    keyBenefits: [
      { icon: "LuCpu", title: "Vocational Labs", desc: "State-of-the-art training facilities aligned with digital and industrial technology.", color: "text-indigo-600", bg: "bg-indigo-50" },
      { icon: "LuBadgeCheck", title: "Recognized Badges", desc: "Certificates verified under the National Skills Qualification Framework (NSQF).", color: "text-teal-600", bg: "bg-teal-50" }
    ],
    whoIsAffected: [
      { title: "Job Aspirants", desc: "Unemployed youth seeking vocational certifications", isPrimary: true, icon: "LuAward" },
      { title: "Employers", desc: "Private and public industrial sectors requiring skilled talent pools", isPrimary: true, icon: "LuBriefcase" }
    ],
    importantChanges: [
      { title: "Standardized NSQF Scales", desc: "Introduction of national competency levels matching certifications to job grades." },
      { title: "Prior Learning Recognition", desc: "Assessment and formal certification of skills acquired informally by existing workers." }
    ],
    timeline: [
      { year: "2015", title: "Policy Launch", desc: "Prime Minister launches the skill policy on World Youth Skills Day." },
      { year: "2016", title: "PMKVY Launch", desc: "Pradhan Mantri Kaushal Vikas Yojana launched as the core skill incentive program." }
    ],
    faqs: [
      { q: "What is Recognition of Prior Learning (RPL)?", a: "It is a scheme that evaluates and certifies skills already possessed by workers in the unorganized sector, giving them formal recognition." },
      { q: "Are training programs free?", a: "Yes, many government-supported courses under PMKVY are fully subsidized, including diagnostic assessments and certifications." }
    ]
  },
  {
    name: "National Policy on Electronics 2019",
    title: "National Policy on Electronics 2019",
    department: "Ministry of Electronics and Information Technology",
    category: "Technology",
    description: "The National Policy on Electronics 2019 aims to position India as a global hub for Electronics System Design and Manufacturing (ESDM). It focuses on promoting domestic production clusters, chip design startups, semiconductor fabrication facilities, and mobile handset manufacturing.\n\nNPE 2019 replaces the earlier electronics policy of 2012. It sets out capital incentive structures, production-linked incentives (PLI), and research grants to achieve export competitiveness and self-reliance in electronic goods.",
    effectiveDate: "25 February 2019",
    status: "Published",
    eligibility: [
      "Domestic electronics manufacturing companies",
      "Startups in semiconductor design and hardware",
      "Research institutes specializing in chip technology"
    ],
    pdf: "https://www.meity.gov.in/static/uploads/2026/04/46face7d48c8f6a97030f713ad5fdab4.pdf",
    icon: "Cpu",
    vision: "To position India as a global hub for Electronics System Design and Manufacturing (ESDM) by encouraging domestic manufacturing, value addition, exports, and research.",
    objectives: [
      "Achieve domestic electronics turnover of $400 Billion by 2025",
      "Promote manufacturing of mobile handsets and component ecosystems",
      "Encourage R&D in emerging areas like IoT, AI, and 5G hardware",
      "Attain global competitiveness in hardware export markets"
    ],
    keyBenefits: [
      { icon: "LuCoins", title: "Capital Incentives", desc: "Financial support and subsidies for setting up large manufacturing plants.", color: "text-amber-600", bg: "bg-amber-50" },
      { icon: "LuBinary", title: "Design Subsidies", desc: "Incentives for domestic IP creation and semiconductor design startups.", color: "text-purple-600", bg: "bg-purple-50" }
    ],
    whoIsAffected: [
      { title: "Hardware Producers", desc: "Manufacturers of components, mobile parts, and industrial electronics", isPrimary: true, icon: "LuTv" },
      { title: "Design Engineers", desc: "Hardware architects and chip designers creating local IP", isPrimary: true, icon: "LuWorkflow" }
    ],
    importantChanges: [
      { title: "Electronic Clusters", desc: "Setting up Electronic Manufacturing Clusters (EMC 2.0) with common testing labs." },
      { title: "Semiconductor Incentives", desc: "State funding for high-risk ventures in semiconductor fabrications." }
    ],
    timeline: [
      { year: "2019", title: "NPE Approved", desc: "Cabinet adopts NPE 2019 replacing the 2012 framework." },
      { year: "2020", title: "PLI Scheme", desc: "Production Linked Incentives (PLI) rolled out for mobile manufacturing." }
    ],
    faqs: [
      { q: "What is the ESDM sector?", a: "ESDM stands for Electronics System Design and Manufacturing, covering all stages from hardware conceptual design to physical manufacturing." },
      { q: "How does the policy support component manufacturing?", a: "By providing custom duty incentives and tax holidays for firms manufacturing components locally instead of importing." }
    ]
  },
  {
    name: "National Steel Policy 2017",
    title: "National Steel Policy 2017",
    department: "Ministry of Steel",
    category: "Industry",
    description: "The National Steel Policy 2017 provides policy support for developing a globally competitive, technologically advanced, and self-reliant steel industry in India. It focuses on increasing domestic production capacity, raw material security (iron ore and coking coal), and adopting clean coking technologies.\n\nNSP 2017 replaces the older steel policy of 2005. It aims to increase per-capita steel consumption across rural areas, reduce energy footprints, and enforce BIS standards on all commercial steel grades used in construction.",
    effectiveDate: "8 May 2017",
    status: "Published",
    eligibility: [
      "Steel manufacturing units and metallurgical plants",
      "Mining corporations supplying iron ore and coal",
      "Infrastructure developers consuming commercial steel"
    ],
    pdf: "https://steel.gov.in/national-steel-policy-nsp-2017",
    icon: "Factory",
    vision: "To build a technologically advanced, globally competitive, and self-reliant steel industry in India, meeting domestic requirements and leading in exports.",
    objectives: [
      "Achieve crude steel capacity of 300 Million Tonnes (MT) by 2030-31",
      "Increase per capita steel consumption in rural areas",
      "Ensure raw material security (iron ore, coking coal) for steel plants",
      "Reduce carbon footprint and increase energy efficiency in production"
    ],
    keyBenefits: [
      { icon: "LuFlame", title: "Energy Upgrades", desc: "Tax write-offs for installing energy-efficient furnace technologies.", color: "text-orange-600", bg: "bg-orange-50" },
      { icon: "LuTruck", title: "Logistics Corridors", desc: "Dedicated rail and port lines for faster movement of heavy steel cargo.", color: "text-slate-600", bg: "bg-slate-100" }
    ],
    whoIsAffected: [
      { title: "Steel Producers", desc: "Heavy metallurgical plants and rolling mills", isPrimary: true, icon: "LuWrench" },
      { title: "Mining Enterprises", desc: "Coal and iron ore mining concessionaires", isPrimary: true, icon: "LuDigger" }
    ],
    importantChanges: [
      { title: "Coking Coal Security", desc: "Promoting coal gasification plants and domestic washing to reduce import dependence." },
      { title: "Quality Mandates", desc: "Enforcement of BIS standards on all commercial steel grades used in construction." }
    ],
    timeline: [
      { year: "2017", title: "Cabinet Approval", desc: "NSP 2017 replaces the outdated 2005 framework." },
      { year: "2030", title: "Capacity Milestone", desc: "Target year for achieving the 300 MT production capability." }
    ],
    faqs: [
      { q: "What is the per-capita steel goal?", a: "The policy aims to increase domestic per-capita steel consumption from 61 kg to 160 kg by 2030-31." },
      { q: "Does the policy address carbon emissions?", a: "Yes, it mandates adoption of waste heat recovery systems and encourages green hydrogen experiments in steel manufacturing." }
    ]
  },
  {
    name: "National Tourism Policy",
    title: "National Tourism Policy",
    department: "Ministry of Tourism",
    category: "Tourism",
    description: "The National Tourism Policy provides a comprehensive framework for sustainable growth of tourism across India. It focuses on building high-quality tourist infrastructure, safety standards, skill training for guides, and promoting cultural heritage destinations.\n\nThe policy guides state tourism boards in developing theme-based tourist circuits (like Buddhist or Desert trails). It supports rural homestays, eco-friendly tourism guidelines, and community-led operations to boost local village livelihoods.",
    effectiveDate: "22 July 2025",
    status: "Published",
    eligibility: [
      "Tour operators, guides, and hospitality startups",
      "Local communities in tourist destination areas",
      "State tourism boards and development corporations"
    ],
    pdf: "https://www.tourism.gov.in/documents/acts-and-policies",
    icon: "Map",
    vision: "To establish India as a premier, sustainable, and inclusive global tourism destination, generating livelihood opportunities and preserving ecological and cultural heritage.",
    objectives: [
      "Increase foreign tourist arrivals and double tourism revenues",
      "Promote eco-tourism, rural tourism, and adventure tourism circuits",
      "Improve skill training and safety standards for tourist guides",
      "Develop infrastructure along theme-based tourist circuits"
    ],
    keyBenefits: [
      { icon: "LuCompass", title: "Circuit Funding", desc: "Government grants for developing heritage, spiritual, and wildlife trails.", color: "text-amber-600", bg: "bg-amber-50" },
      { icon: "LuMapPin", title: "Local Homestays", desc: "Subsidies for rural households to set up authenticated homestay facilities.", color: "text-green-600", bg: "bg-green-50" }
    ],
    whoIsAffected: [
      { title: "Guides & Operators", desc: "Registered guides, travel agencies, and hotel operators", isPrimary: true, icon: "LuSmile" },
      { title: "Local Communities", desc: "Village artisans and homestay hosts in cultural zones", isPrimary: true, icon: "LuHome" }
    ],
    importantChanges: [
      { title: "Standardized Star Ratings", desc: "Mandatory safety and star-rating compliance audits for budget accommodations." },
      { title: "Green Tourism Codes", desc: "Zero-plastic guidelines and waste management norms for high-altitude ecological sites." }
    ],
    timeline: [
      { year: "2025", title: "Policy Release", desc: "Enactment of the updated national tourism guidelines." },
      { year: "2028", title: "Infrastructure Targets", desc: "Completion of 50 major theme-based tourist circuits." }
    ],
    faqs: [
      { q: "What are theme-based circuits?", a: "These are unified geographic routes connecting historically or culturally linked sites, such as the Buddhist Circuit or Desert Circuit." },
      { q: "How does this benefit local village economies?", a: "By driving tourist traffic to rural areas and supporting local homestays, handicrafts, and regional cuisine operators." }
    ]
  },
  {
    name: "National Electric Mobility Mission Plan 2020",
    title: "National Electric Mobility Mission Plan 2020",
    department: "Ministry of Heavy Industries",
    category: "Transport and Technology",
    description: "The National Electric Mobility Mission Plan 2020 promotes the adoption and manufacturing of hybrid and electric vehicles in India. It seeks to achieve a transition toward clean mobility, providing purchase incentives directly to consumers, supporting charging grids, and battery research.\n\nNEMMP 2020 establishes the FAME subsidy framework to lower the purchase cost of clean vehicles. It sets guidelines for standardized charging ports and tax breaks to establish a domestic EV manufacturing ecosystem.",
    effectiveDate: "9 January 2013",
    status: "Approved",
    eligibility: [
      "Electric and hybrid vehicle manufacturing companies",
      "Battery developers and charging station operators",
      "Consumers purchasing registered electric vehicles"
    ],
    pdf: "https://heavyindustries.gov.in/en/node/2953",
    icon: "Car",
    vision: "To achieve a major transition toward clean electric and hybrid mobility, reducing fossil fuel imports, improving urban air quality, and promoting domestic manufacturing of clean vehicles.",
    objectives: [
      "Deploy 6-7 million hybrid and electric vehicles by 2020+",
      "Establish a robust public charging station infrastructure",
      "Provide demand-side purchase incentives directly to consumers",
      "Support local research in battery chemistry and electric motors"
    ],
    keyBenefits: [
      { icon: "LuZap", title: "Purchase Subsidies", desc: "Direct cash subsidies reducing the price of electric two-wheelers and cars.", color: "text-yellow-600", bg: "bg-yellow-50" },
      { icon: "LuBatteryCharging", title: "Charging Subsidies", desc: "Subsidized power tariffs and tax breaks for setting up public charging points.", color: "text-emerald-600", bg: "bg-emerald-50" }
    ],
    whoIsAffected: [
      { title: "EV Buyers", desc: "Citizens purchasing hybrid or pure electric vehicles", isPrimary: true, icon: "LuSmile" },
      { title: "Auto Manufacturers", desc: "Automotive companies transitioning production lines to EV models", isPrimary: true, icon: "LuCpu" }
    ],
    importantChanges: [
      { title: "FAME Subsidies", desc: "Introduction of Faster Adoption and Manufacturing of Hybrid and Electric Vehicles (FAME) incentives." },
      { title: "Standardized Chargers", desc: "Mandating unified charging plug specifications to ensure cross-vehicle compatibility." }
    ],
    timeline: [
      { year: "2013", title: "NEMMP Enacted", desc: "Cabinet adopts the green mobility plan." },
      { year: "2015", title: "FAME-I Launch", desc: "FAME subsidy structure officially goes live." },
      { year: "2019", title: "FAME-II Extension", desc: "Expanded phase II FAME incentives rolled out with higher allocations." }
    ],
    faqs: [
      { q: "What is the FAME scheme?", a: "FAME is the operational subsidy framework under NEMMP that pays cash incentives to lower the purchase cost of certified clean vehicles." },
      { q: "Are hybrid vehicles supported?", a: "Yes, the policy supports both pure electric vehicles and certified mild/strong hybrid vehicles." }
    ]
  }
];

fs.writeFileSync(destPath, JSON.stringify(policies, null, 2), "utf-8");
console.log("Successfully wrote rich policies data to policies.json.");
