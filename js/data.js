/**
 * CareerPulse - Static Data Stores
 * Contains initial student profile, skills matrix, projects, and job listings
 */

const DEFAULT_PROFILE = {
  name: "Alex Rivera",
  headline: "Aspiring Full-Stack Software Engineer & AI Enthusiast",
  degree: "B.S. Computer Science & Data Systems",
  university: "State University of Technology",
  graduationYear: "2026",
  gpa: "3.92",
  location: "San Francisco, CA (Open to Relocation & Remote)",
  availability: "Available for Summer 2027 Internships",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  bio: "Honors Computer Science undergraduate with dual concentrations in Cloud Computing and Machine Learning. Passionate about architecting scalable microservices, creating intuitive human-computer interfaces, and leveraging transformer models for automated data extraction. Proven track record of shipping production code, organizing collegiate hackathons with 600+ attendees, and mentoring junior engineers.",
  email: "alex.rivera@campus.edu",
  phone: "(415) 890-1234",
  github: "https://github.com/alexrivera-dev",
  linkedin: "https://linkedin.com/in/alexrivera"
};

const INITIAL_SKILLS = [
  // Frontend
  {
    id: "sk-1",
    name: "React 18 & Next.js",
    category: "frontend",
    level: "Advanced",
    proficiency: 92,
    experience: "3 yrs exp",
    description: "Server components, state management (Zustand, Redux), SSR & ISR pipelines."
  },
  {
    id: "sk-2",
    name: "TypeScript & JavaScript ES6+",
    category: "frontend",
    level: "Advanced",
    proficiency: 90,
    experience: "3.5 yrs exp",
    description: "Strict typing, generics, async event-driven runtime architectures."
  },
  {
    id: "sk-3",
    name: "HTML5, CSS3 & Responsive UI",
    category: "frontend",
    level: "Expert",
    proficiency: 95,
    experience: "4 yrs exp",
    description: "Semantic web standards, CSS Grid/Flexbox, WCAG 2.1 AA accessibility, animations."
  },
  {
    id: "sk-4",
    name: "Tailwind CSS & Design Systems",
    category: "frontend",
    level: "Advanced",
    proficiency: 88,
    experience: "2 yrs exp",
    description: "Reusable component tokens, dark mode design systems, micro-interactions."
  },

  // Backend & DB
  {
    id: "sk-5",
    name: "Node.js & Express",
    category: "backend",
    level: "Advanced",
    proficiency: 86,
    experience: "2.5 yrs exp",
    description: "RESTful APIs, WebSockets, JWT authentication, middleware pipelines."
  },
  {
    id: "sk-6",
    name: "Python & FastAPI",
    category: "backend",
    level: "Advanced",
    proficiency: 89,
    experience: "3 yrs exp",
    description: "Asynchronous endpoints, Pydantic validation, scientific libraries (NumPy, Pandas)."
  },
  {
    id: "sk-7",
    name: "PostgreSQL & Prisma ORM",
    category: "backend",
    level: "Intermediate",
    proficiency: 82,
    experience: "2 yrs exp",
    description: "Complex joins, indexing, relational database schema design, migrations."
  },
  {
    id: "sk-8",
    name: "Redis & MongoDB",
    category: "backend",
    level: "Intermediate",
    proficiency: 78,
    experience: "1.5 yrs exp",
    description: "In-memory caching strategies, document data stores, session stores."
  },

  // Cloud & DevOps
  {
    id: "sk-9",
    name: "Docker & Containerization",
    category: "cloud",
    level: "Intermediate",
    proficiency: 80,
    experience: "2 yrs exp",
    description: "Multi-stage builds, docker-compose setups, container orchestration basics."
  },
  {
    id: "sk-10",
    name: "AWS (S3, EC2, Lambda)",
    category: "cloud",
    level: "Intermediate",
    proficiency: 76,
    experience: "1.5 yrs exp",
    description: "Serverless functions, CloudWatch metrics, S3 bucket static asset delivery."
  },
  {
    id: "sk-11",
    name: "Git & CI/CD GitHub Actions",
    category: "cloud",
    level: "Advanced",
    proficiency: 90,
    experience: "3 yrs exp",
    description: "Trunk-based development, automated testing, linting and build automation."
  },
  {
    id: "sk-12",
    name: "Linux & Bash Scripting",
    category: "cloud",
    level: "Intermediate",
    proficiency: 82,
    experience: "2.5 yrs exp",
    description: "Server administration, cron jobs, log analysis, SSH key authentication."
  },

  // Soft Skills
  {
    id: "sk-13",
    name: "Technical Communication",
    category: "soft",
    level: "Advanced",
    proficiency: 94,
    experience: "Student Leader",
    description: "Experience presenting engineering demos, documentation, and sprint reports."
  },
  {
    id: "sk-14",
    name: "Agile & Scrum Teamwork",
    category: "soft",
    level: "Advanced",
    proficiency: 88,
    experience: "2+ projects",
    description: "Sprint retrospectives, Jira/Linear task estimations, bi-weekly standups."
  },
  {
    id: "sk-15",
    name: "Problem Solving & Algorithmic Thinking",
    category: "soft",
    level: "Advanced",
    proficiency: 91,
    experience: "LeetCode 350+",
    description: "Graph algorithms, dynamic programming, space/time complexity tradeoffs."
  },
  {
    id: "sk-16",
    name: "Peer Mentorship & Code Review",
    category: "soft",
    level: "Advanced",
    proficiency: 89,
    experience: "CS TA",
    description: "Guiding 85+ students through debugging, algorithmic optimization, and clean code."
  }
];

const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "OmniTask AI &mdash; Intelligent Sprint Planner",
    category: "ai",
    badge: "Hackathon Winner",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
    tags: ["React 18", "FastAPI", "OpenAI API", "PostgreSQL", "Tailwind CSS"],
    description: "An AI-powered project workspace that automatically translates feature PRDs into technical tasks, estimates story points, and spots blocker dependencies.",
    metrics: "2,400+ weekly active students &bull; 98% accuracy in sprint bottleneck prediction",
    demoUrl: "https://omnitask-demo.dev",
    githubUrl: "https://github.com/alexrivera-dev/omnitask-ai",
    overview: "Built for university capstone engineering teams who struggle with agile workload distribution. OmniTask AI leverages LLM embeddings to parse project requirements, break them down into bite-sized actionable tickets, and match tickets to students based on individual tech proficiencies.",
    highlights: [
      "Engineered real-time collaboration using WebSockets and PostgreSQL LISTEN/NOTIFY for instantaneous team board sync.",
      "Integrated OpenAI Function Calling to automate dependency tree generation and estimate story points.",
      "Built resilient client-side state caching with TanStack Query and optimistic UI updates for zero-lag interactions."
    ]
  },
  {
    id: "proj-2",
    title: "EcoTrack &mdash; Edge IoT Carbon Analytics",
    category: "mobile",
    badge: "Featured Hardware Project",
    image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=700&q=80",
    tags: ["Python", "ESP32", "MQTT", "Next.js", "Chart.js"],
    description: "An open-source IoT environmental sensing device and web dashboard measuring campus building electricity draw, indoor CO2, and thermal efficiency.",
    metrics: "1st Place HackWestern &bull; Deployed across 3 university labs",
    demoUrl: "https://ecotrack-campus.org",
    githubUrl: "https://github.com/alexrivera-dev/ecotrack-iot",
    overview: "EcoTrack connects low-power ESP32 microcontrollers deployed in university lecture halls to a central cloud telemetry broker. The web application renders interactive 3D floor maps with real-time heatmaps and electricity usage forecasts.",
    highlights: [
      "Created lightweight MQTT message pipelines handling over 100 sensor packets per second with zero data loss.",
      "Designed responsive data visualization dashboards with Chart.js and customized SVG floorplans.",
      "Identified phantom energy loads saving the university engineering department an estimated $4,200 annually."
    ]
  },
  {
    id: "proj-3",
    title: "DevPulse &mdash; Campus Developer Directory",
    category: "fullstack",
    badge: "Open Source",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80",
    tags: ["TypeScript", "Node.js", "Express", "MongoDB", "Redis"],
    description: "A student-to-student networking platform allowing campus developers, designers, and founders to match based on complementary skills and hackathon ideas.",
    metrics: "1,100+ registered student profiles &bull; 45 hackathon teams formed",
    demoUrl: "https://devpulse-campus.net",
    githubUrl: "https://github.com/alexrivera-dev/devpulse",
    overview: "Finding teammates with the right skill balance for hackathons and startup incubation is difficult. DevPulse provides algorithmic skill-matching, verifiable project portfolios, and direct in-app messaging.",
    highlights: [
      "Implemented a graph-based matching heuristic that pairs complementary developer and designer archetypes.",
      "Secured API endpoints using rate limiting, JWT tokens with refresh cookies, and input sanitization.",
      "Utilized Redis caching for instant full-text student searches across tech stacks and graduation years."
    ]
  },
  {
    id: "proj-4",
    title: "CloudVault &mdash; Distributed Encrypted File Drive",
    category: "cloud",
    badge: "Systems & Security",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80",
    tags: ["Go", "Docker", "AWS S3", "Cryptography", "gRPC"],
    description: "A zero-knowledge client-side encrypted storage architecture providing seamless cross-device synchronization and peer-to-peer file sharing.",
    metrics: "100% Zero-knowledge compliance &bull; Sub-50ms encryption overhead",
    demoUrl: "https://cloudvault-secure.io",
    githubUrl: "https://github.com/alexrivera-dev/cloudvault",
    overview: "Developed as a distributed systems term project, CloudVault protects student intellectual property by encrypting files in the browser before transmission to remote cloud storage buckets.",
    highlights: [
      "Implemented AES-256-GCM symmetric encryption with PBKDF2 key derivation directly in the browser Web Crypto API.",
      "Built high-throughput Go backend services streaming file chunks with gRPC to Amazon S3 compatible object storage.",
      "Packaged complete local dev cluster orchestration using Docker Compose and automated health checks."
    ]
  },
  {
    id: "proj-5",
    title: "AlgoVisual &mdash; Interactive Algorithm Sandbox",
    category: "fullstack",
    badge: "Educational Tool",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=80",
    tags: ["JavaScript", "HTML5 Canvas", "CSS3", "Algorithms"],
    description: "An interactive step-by-step educational visualizer for graph traversal algorithms (Dijkstra, A*, BFS/DFS) and sorting complexity comparison.",
    metrics: "Used as official supplementary tool in CS 201 Course",
    demoUrl: "https://algovisual-lab.edu",
    githubUrl: "https://github.com/alexrivera-dev/algovisualizer",
    overview: "Built to help fellow university students understand complex time/space complexity trade-offs through real-time interactive canvas manipulation, adjustable execution speeds, and memory heatmaps.",
    highlights: [
      "Crafted performant HTML5 60fps canvas rendering with custom playback controls (pause, step forward, rewind).",
      "Included custom weighted graph maze generators and interactive obstacle drawing tools.",
      "Received adoption endorsement from two university faculty professors for introductory CS curriculum."
    ]
  },
  {
    id: "proj-6",
    title: "Neurolab &mdash; Medical Imaging Classifier",
    category: "ai",
    badge: "Research Publication",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80",
    tags: ["PyTorch", "Python", "Flask", "Docker", "OpenCV"],
    description: "A deep convolutional neural network for detecting anomalies in chest X-rays with Grad-CAM explainability heatmaps for medical students.",
    metrics: "93.4% AUC ROC Score &bull; Co-authored IEEE Student Workshop Paper",
    demoUrl: "https://neurolab-research.org",
    githubUrl: "https://github.com/alexrivera-dev/neurolab-vision",
    overview: "In collaboration with the university biomedical engineering lab, trained a DenseNet-121 architecture on open-access NIH chest radiography datasets with attention-weight visual overlays.",
    highlights: [
      "Trained custom transfer-learning PyTorch models with automated data augmentation and balanced mini-batch sampling.",
      "Integrated Grad-CAM heatmaps showing exact regions of the scan that influenced neural activations.",
      "Deployed containerized inference endpoint with Flask and Docker on cloud GPU instances."
    ]
  }
];

const INITIAL_JOBS = [
  {
    id: "job-1",
    title: "Software Engineering Intern &bull; Summer 2027",
    company: "CloudScale Systems",
    logoBg: "#4f46e5",
    logoText: "CS",
    location: "San Francisco, CA",
    setting: "Hybrid",
    type: "Internship",
    department: "Software Engineering",
    stipend: "$48 - $56 / hr",
    stipendValue: 52,
    postedDate: "2026-10-04",
    deadline: "Nov 15, 2026",
    urgency: "Popular",
    tags: ["React", "TypeScript", "Node.js", "AWS"],
    description: "CloudScale is seeking passionate undergraduate software engineering interns to join our Core Infrastructure and Web Platform engineering teams for a 12-week immersive summer internship.",
    requirements: [
      "Pursuing a B.S. or M.S. in Computer Science, Software Engineering, or related STEM discipline.",
      "Experience with modern web application development (React, TypeScript, or Node.js).",
      "Solid foundation in data structures, algorithms, and object-oriented software engineering.",
      "Self-driven problem solver with excellent written and verbal communication."
    ],
    benefits: [
      "Competitive hourly pay ($48-$56/hr) plus $3,000 corporate housing relocation stipend.",
      "1-on-1 mentorship from Senior Staff Engineers and executive lunch & learns.",
      "Full return-offer consideration for graduation 2027 new grad positions."
    ]
  },
  {
    id: "job-2",
    title: "Frontend Developer Intern &bull; Design Systems",
    company: "Starlight Digital",
    logoBg: "#059669",
    logoText: "SD",
    location: "Remote",
    setting: "Remote",
    type: "Internship",
    department: "Product & UI/UX",
    stipend: "$40 - $46 / hr",
    stipendValue: 43,
    postedDate: "2026-10-02",
    deadline: "Nov 30, 2026",
    urgency: "Remote Only",
    tags: ["React", "CSS3", "Design Systems", "Figma", "Accessibility"],
    description: "Help build the next generation of accessible UI components used by millions of creative professionals worldwide. You will work closely with our Principal Designers and Design System engineers.",
    requirements: [
      "Demonstrated proficiency in semantic HTML, modern CSS (Flexbox/Grid), and React component architecture.",
      "Passion for typography, micro-interactions, and WCAG accessibility standards.",
      "Familiarity with Figma handoffs, Git pull requests, and Storybook."
    ],
    benefits: [
      "$40-$46/hr remote hourly compensation + $1,000 home office equipment stipend.",
      "Flexible working hours across US timezones.",
      "Mentorship from industry-leading UX and accessibility champions."
    ]
  },
  {
    id: "job-3",
    title: "Machine Learning & AI Engineering Intern",
    company: "NeuralPulse Labs",
    logoBg: "#7c3aed",
    logoText: "NP",
    location: "Seattle, WA",
    setting: "Hybrid",
    type: "Internship",
    department: "Data & AI",
    stipend: "$52 - $60 / hr",
    stipendValue: 56,
    postedDate: "2026-10-05",
    deadline: "Nov 20, 2026",
    urgency: "High Stipend",
    tags: ["Python", "PyTorch", "LLMs", "FastAPI", "Vector DBs"],
    description: "Join our Applied AI research unit to fine-tune open weights models, build evaluation benchmarks, and deploy low-latency retrieval-augmented generation (RAG) pipelines for enterprise search.",
    requirements: [
      "Currently enrolled student with coursework in Deep Learning, Linear Algebra, and Probability.",
      "Strong Python coding skills with PyTorch, Hugging Face, or LangChain.",
      "Experience deploying REST or gRPC microservices is a plus."
    ],
    benefits: [
      "Top-tier compensation ($52-$60/hr) with Seattle housing allowance.",
      "Access to high-compute GPU clusters and dedicated mentorship from research scientists.",
      "Opportunity to co-author engineering whitepapers and open-source contributions."
    ]
  },
  {
    id: "job-4",
    title: "Software Engineering Co-op (6 Months)",
    company: "Vanguard Tech Group",
    logoBg: "#d97706",
    logoText: "VT",
    location: "Austin, TX",
    setting: "On-site",
    type: "Co-op",
    department: "Software Engineering",
    stipend: "$38 - $44 / hr",
    stipendValue: 41,
    postedDate: "2026-09-28",
    deadline: "Dec 05, 2026",
    urgency: "Co-op Track",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Docker", "REST API"],
    description: "A comprehensive 6-month cooperative education role (Jan - June 2027). You will embed directly as a full-time software contributor in our Enterprise Cloud Billing platform.",
    requirements: [
      "Available for full-time 40-hour work weeks during the Spring semester.",
      "Proficiency in Java or C++, relational databases, and unit testing concepts.",
      "Strong analytical mind and passion for mission-critical software systems."
    ],
    benefits: [
      "$38-$44/hr with health benefits eligibility during the 6-month term.",
      "Structured rotation across database engineering and frontend micro-frontends.",
      "High conversion rate to full-time new grad offers."
    ]
  },
  {
    id: "job-5",
    title: "Junior Cloud & DevOps Associate",
    company: "Aether Cloud Networks",
    logoBg: "#0284c7",
    logoText: "AC",
    location: "San Francisco, CA",
    setting: "Hybrid",
    type: "Full-Time",
    department: "Cloud & Security",
    stipend: "$95k - $115k / yr",
    stipendValue: 50,
    postedDate: "2026-10-01",
    deadline: "Dec 15, 2026",
    urgency: "New Grad",
    tags: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    description: "Exciting new grad full-time role for graduating seniors (Class of 2026/2027) looking to specialize in site reliability, infrastructure as code, and cloud automation.",
    requirements: [
      "Bachelor's degree in Computer Science, Computer Engineering, or graduating senior.",
      "Hands-on experience with Linux environments, Docker containers, and Git workflows.",
      "Foundational knowledge of networking protocols (TCP/IP, DNS, SSL/TLS, HTTP)."
    ],
    benefits: [
      "Full-time starting base salary: $95,000 - $115,000 + equity options.",
      "Comprehensive medical, dental, vision, 401(k) match, and 4 weeks PTO.",
      "Annual $2,500 learning & conference travel stipend."
    ]
  },
  {
    id: "job-6",
    title: "Product Design (UI/UX) Intern",
    company: "Loomis Media Interactive",
    logoBg: "#e11d48",
    logoText: "LM",
    location: "New York, NY",
    setting: "Hybrid",
    type: "Internship",
    department: "Product & UI/UX",
    stipend: "$36 - $42 / hr",
    stipendValue: 39,
    postedDate: "2026-10-03",
    deadline: "Nov 25, 2026",
    urgency: "Design Track",
    tags: ["Figma", "User Research", "Prototyping", "Design Systems"],
    description: "Collaborate with cross-functional product managers and engineers to conduct user research, wireframe intuitive interaction flows, and test prototypes with real student users.",
    requirements: [
      "Online portfolio demonstrating clean visual design and user-centered design reasoning.",
      "Proficiency in Figma (auto-layout, components, interactive prototypes).",
      "Empathy for user pain points and clear communication skills."
    ],
    benefits: [
      "$36-$42/hr compensation + NY metro transit commuter benefits.",
      "Portfolio reviews with VP of Product Design.",
      "Real product shipping experience reaching over 500k monthly readers."
    ]
  },
  {
    id: "job-7",
    title: "Data Analyst & Business Intelligence Intern",
    company: "FinMetrics Analytics",
    logoBg: "#059669",
    logoText: "FM",
    location: "Remote",
    setting: "Remote",
    type: "Internship",
    department: "Data & AI",
    stipend: "$35 - $40 / hr",
    stipendValue: 37,
    postedDate: "2026-09-29",
    deadline: "Dec 01, 2026",
    urgency: "Remote Only",
    tags: ["SQL", "Python", "Tableau", "Data Warehousing", "Excel"],
    description: "Support our quantitative analytics group by building automated SQL data pipelines, dashboard reports in Tableau, and exploratory predictive customer retention models.",
    requirements: [
      "Pursuing a degree in Data Science, Statistics, Economics, CS, or Business Analytics.",
      "Intermediate to advanced SQL query capabilities (window functions, CTEs).",
      "Experience with Python data stack (Pandas, Matplotlib, Seaborn)."
    ],
    benefits: [
      "100% remote flexibility with East Coast or West Coast schedule options.",
      "Weekly workshops with Senior Quantitative Analysts.",
      "Direct exposure to C-suite executive reporting decks."
    ]
  },
  {
    id: "job-8",
    title: "Cybersecurity & Systems Security Intern",
    company: "IronGate Cyber Defense",
    logoBg: "#334155",
    logoText: "IG",
    location: "Remote",
    setting: "Remote",
    type: "Internship",
    department: "Cloud & Security",
    stipend: "$42 - $48 / hr",
    stipendValue: 45,
    postedDate: "2026-10-06",
    deadline: "Dec 10, 2026",
    urgency: "New Posting",
    tags: ["Network Security", "Python", "SIEM", "Linux", "Ethical Hacking"],
    description: "Work with our Security Operations Center (SOC) and vulnerability management team to analyze intrusion detection logs, write security automation scripts, and harden cloud perimeter defenses.",
    requirements: [
      "Coursework or self-study in Computer Networking, Cryptography, or Linux Security.",
      "Familiarity with Wireshark, vulnerability scanning tools, and Python automation.",
      "Security certifications like Security+ or participation in CTFs is a major plus."
    ],
    benefits: [
      "$42-$48/hr pay + $1,500 security certification reimbursement (Security+, CySA+).",
      "Hands-on experience in blue team operations and incident response.",
      "High probability of conversion for graduating seniors."
    ]
  }
];
