export const PERSONAL_INFO = {
  name: "Abdul-Muizz",
  title: "Software Engineer",
  location: "Islamabad, Pakistan",
  email: "abdulmuizz1310@outlook.com",
  summary:
    "Software Engineer specializing in AI/ML solutions, full-stack web development, and Python automation. Experienced in building LangGraph AI agents, RAG pipelines, and scalable microservice architectures. Passionate about leveraging LLMs and modern web technologies to solve complex business problems.",
} as const;

export interface Experience {
  hash: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    hash: "e1a2b3c",
    role: "AI Software Engineer",
    company: "Codeaza Technologies",
    location: "Islamabad, PK",
    startDate: "August 2025",
    endDate: "Present",
    description: [
      "Architected an AI-powered fee intelligence platform with 13 microservices, enabling automated fee extraction, change tracking, and structured data delivery across 40+ global exchanges.",
      "Engineered a config-driven web crawling system using Scrapy, Playwright, and Redis with 13+ exchange-specific handlers and proxy rotation, achieving 40+ exchange coverage with zero manual intervention.",
      "Designed and implemented 7 LangGraph AI agents (GPT-4o, GPT-4o-mini) for fee extraction, validation, change detection, and definition parsing, reducing manual fee analysis time by 85%.",
      "Built an end-to-end document change pipeline using AWS Lambda, SQS, and ECS Tasks to automatically detect, diff, and summarize fee schedule changes within hours instead of days.",
      "Developed a high-performance operations backend (ops-api) with FastAPI, handling 61 services across 9 Celery queues, 65+ SQLAlchemy models, and robust middleware chain at scale.",
      "Built a secure operations portal using Next.js 16, React 19, and TypeScript with httpOnly cookie authentication, HMAC-signed permission cookies, and tamper-proof RBAC across 15+ dashboard modules.",
      "Resolved scalability bottlenecks in PDF fee extraction by implementing batch processing with LandingAI DPT-2 and Playwright, parallel Celery task execution, and S3-backed result storage.",
      "Developed a public-facing RESTful API and SDKs (Python + TypeScript) with RS256 JWT + API key authentication, rate limiting, cursor pagination, and comprehensive Mintlify documentation.",
      "Implemented a comprehensive evaluation framework using DeepEval metrics to continuously measure AI extraction accuracy, enabling data-driven prompt tuning and agent improvements.",
    ],
  },
  {
    hash: "f4d5e6a",
    role: "Associate Software Engineer",
    company: "Phish Rod",
    location: "Lahore, PK",
    startDate: "August 2024",
    endDate: "July 2025",
    description: [
      "Optimized back-end data processing by designing and implementing robust solutions with Java and Hibernate ORM, leveraging Dynamic Query in Liferay to streamline database operations, resulting in 30% lower response times.",
      "Improved system stability and scalability by debugging and enhancing existing Liferay-based systems, ensuring adherence to best practices in the production environment, and reducing system crashes by 10%.",
      "Resolved performance bottlenecks in SQL queries by understanding the client's business needs to identify key resources and removing overheads in REST APIs to ensure efficient data management and enterprise application reliability.",
      "Identified performance and UX gaps to deliver solutions integrating modern web dev techniques and efficient state management, enabling high-performance applications that increased user session duration by 20%.",
      "Implemented an RAG-based Cyber Security Consultant chatbot using phi-3.5 large language model and Hugging Face guardrails and embedding to improve users' personalized experience and answer quick queries.",
      "Integrated the Firebase backend for the RAG-based Cyber Security Consultant chatbot for user-specific memory retention and context management, resulting in a 60% increase in desktop application usage.",
      "Addressed scalability and customization challenges made due to legacy codebase and Liferay constraints by combining multiple codebases into a singular structure, reducing development time by 40% and increasing code reusability by 70%.",
    ],
  },
  {
    hash: "a7b8c9d",
    role: "Associate Software Engineer – Part-time",
    company: "VAASEL",
    location: "Islamabad, PK",
    startDate: "September 2023",
    endDate: "April 2024",
    description: [
      "Implemented a centralized property listing platform to address fragmented property listings, enhancing user accessibility, and streamlining the property browsing experience.",
      "Designed and developed an agriculture-focused e-commerce platform to improve farmer and manufacturer connections that reduced intermediary reliance, cutting intermediary costs by 30% and improving product availability.",
      "Enhanced team coordination for a food donation platform and led an agile development team, optimizing collaboration and communication, ensuring zero delays and on-time project delivery.",
      "Boosted online engagement and visibility by creating interactive promotional websites to increase user interaction and support effective digital marketing campaigns.",
      "Developed a transparent hiring process platform by identifying gaps in human resource management workflows to improve candidate visibility and reduce HR workload by 40%.",
    ],
  },
  {
    hash: "b2c3d4e",
    role: "Frontend Engineer Intern",
    company: "SAUFIK",
    location: "Islamabad, PK",
    startDate: "June 2023",
    endDate: "August 2023",
    description: [
      "Built and maintained responsive frontend interfaces using React, React Router, and Redux for state management, contributing to production-ready web applications.",
      "Gained hands-on experience with the MERN stack, implementing Context API and Redux patterns for efficient data flow across complex component hierarchies.",
      "Collaborated with senior engineers to deliver feature modules, applying best practices in component architecture, routing, and client-side state management.",
    ],
  },
];

export interface Education {
  hash: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export const EDUCATION: Education[] = [
  {
    hash: "ed1a2b3",
    degree: "Bachelor of Software Engineering",
    institution: "National University of Sciences and Technology",
    location: "Islamabad, PK",
    startDate: "2020",
    endDate: "2024",
    highlights: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "Software Engineering",
      "Web Development",
      "Software Requirement Engineering",
      "Machine Learning",
      "Large Language Models",
      "Mobile Development",
    ],
  },
];

export interface Extracurricular {
  hash: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export const EXTRACURRICULARS: Extracurricular[] = [
  {
    hash: "ex1a2b3",
    role: "General Secretary",
    organization: "Hack Club NUST",
    location: "Islamabad, PK",
    startDate: "2021",
    endDate: "2022",
    description: [
      "Spearheaded a week-long event showcasing innovative technologies, leading workshops and hands-on projects to inspire creativity and practical learning among participants.",
      "Served as VP Operations for CodeFest'21, NUST's inaugural hackathon, leading cross-functional teams to execute seamless on-ground operations and ensure a memorable participant experience.",
      "Appointed as Non-Technical Program Manager for GDSC NUST, responsible for leading non-technical teams and creatively promoting a passion for technology among students.",
      "Managed all logistics and coordination for both on-ground and online events, demonstrating strong organizational leadership to ensure smooth, impactful event execution.",
    ],
  },
  {
    hash: "ex4d5e6",
    role: "Director Social Events",
    organization: "NUST Literary Circle",
    location: "Islamabad, PK",
    startDate: "March 2022",
    endDate: "May 2022",
    description: [
      "NLC hosted NLF 3.0 — a national-level 3-day literary festival aimed at helping the young generation connect with their culture, art, and traditions through seminars, talks, workshops, and interactive sessions.",
      "Managed and arranged the Cultural Carnival, Book Bazaar, Art Expo, and Qawali night while coordinating with different teams and wings to ensure smooth event execution.",
    ],
  },
];

export const SKILLS = {
  languages: ["JavaScript", "Python", "TypeScript"],
  ai_ml: ["LangChain", "LangGraph", "LangFuse", "RAG", "NLP"],
  frontend: ["React", "Next.js", "React Native", "Tailwind CSS"],
  backend: ["FastAPI", "Express", "Node.js", "REST APIs"],
  databases: ["PostgreSQL", "MongoDB"],
  tools: ["Git", "Docker", "AWS", "Celery", "Redis"],
} as const;

export const VALUES = [
  { key: "PROBLEM_SOLVING", value: "true" },
  { key: "COMMUNICATION", value: "excellent" },
  { key: "TEAMWORK", value: "collaborative" },
  { key: "LEARNING_RATE", value: "constant" },
] as const;
