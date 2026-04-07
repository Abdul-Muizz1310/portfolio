export const PERSONAL_INFO = {
  name: "Abdul-Muizz Anwar",
  title: "AI Software Engineer",
  location: "Islamabad, Pakistan",
  email: "abdulmuizz1310@outlook.com",
  phone: "+92-303-7279436",
  linkedin: "abdulmuizz1310",
  github: "Abdul-Muizz1310",
  summary:
    "AI Software Engineer specializing in LangGraph agents, RAG pipelines, and scalable full-stack systems. Experienced in building production-grade AI tooling with GPT-4o/GPT-5.3, FastAPI microservices handling 10k+ RPM, and secure Next.js internal tools with RBAC. Passionate about turning complex rulebooks, fragmented data, and manual workflows into reliable automated platforms.",
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
      "Built a ReAct-style Trade Validator agent using GPT-5.3 to ensure real-time trade compliance with the most recent exchange fee requirements, lowering compliance errors by 35% and enhancing confidence in auto-published data.",
      "Designed a LangGraph Fee Extraction agent using GPT-4o to replace hours of manual fee extraction from complex rulebooks, reducing structured fee extraction time by 30%.",
      "Built a secure Next.js internal tool using signed cookie authentication and RBAC to ensure tokens never reach the browser and provide secure access control.",
      "Reduced frontend development bottlenecks using SWR for caching, Zustand for predictable state, and Chakra UI and Shadcn for reusable components, resulting in 35% faster feature development and fewer redundant API calls.",
      "Solved fragmented rulebook collection by creating a configuration-based Scrapy & Playwright scraper architecture that ingests rulebooks from over 30 exchange websites, allowing new exchange scraping through config rather than code.",
      "Improved database performance under high microservice load by implementing suitable indexing and query optimization across shared SQLAlchemy models, reducing average query latency by 40% and stabilising cross-service data access.",
      "Reduced integration friction for external developers by releasing typed Python and TypeScript SDKs alongside API documentation, allowing partners to integrate fee data without developing new clients.",
      "Refined backend stability by developing MVC-structured FastAPI services capable of handling 10,000+ requests per minute and implementing path-filtered GitHub Actions pipelines with automated testing, resulting in an 80% reduction in production issues.",
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
      "Orchestrated the migration of legacy Liferay-based systems to a cloud-native architecture on AWS, improving system availability and scalability by 40%.",
      "Resolved performance bottlenecks in SQL queries by understanding the client's business needs to identify key resources and removing overheads in REST APIs to ensure efficient data management and enterprise application reliability.",
      "Identified performance and UX gaps to deliver solutions integrating modern web techniques and efficient state management, enabling high-performance applications that extended user session duration by 20%.",
      "Implemented an RAG-based Cyber Security Consultant chatbot using phi-3.5 large language model and Hugging Face guardrails and embedding to improve users' personalized experience, resulting in a 20% increase in conversion rates.",
      "Integrated the Firebase backend for the RAG-based Cyber Security Consultant chatbot for user-specific memory retention and context management, resulting in a 60% increase in desktop application usage.",
      "Migrated legacy Liferay platform to microservices, resolving scalability issues and reducing development time by 40%, directly contributing to stable and faster deployments.",
    ],
  },
  {
    hash: "a7b8c9d",
    role: "Associate Software Engineer – Part-time",
    company: "Vaasel Software Solutions",
    location: "Islamabad, PK",
    startDate: "September 2023",
    endDate: "April 2024",
    description: [
      "Implemented a centralized property listing platform to address fragmented property listings, enhancing user accessibility, and streamlining the property browsing experience.",
      "Developed an agriculture-focused e-commerce platform to improve farmer and manufacturer connections that reduced intermediary reliance, cutting intermediary costs by 30% and improving product availability.",
      "Enhanced team coordination for a food donation platform and led an agile development team, optimizing collaboration and communication, ensuring zero delays and on-time project delivery.",
      "Built and deployed chatbots on promotional websites, answering 80% of common user queries, improving user satisfaction scores by 15%, while providing personalized assistance.",
      "Engineered an AI-powered candidate screening model using machine learning, improving the efficiency of resume processing and reducing HR workload by 40%.",
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
  languages: ["JavaScript", "Python"],
  ai_ml: ["LangGraph", "LangChain", "LangFuse"],
  frontend: ["Next.js", "React Native"],
  backend: ["FastAPI", "Express"],
  databases: ["PostgreSQL", "MongoDB"],
  tools: ["Git"],
} as const;

export const VALUES = [
  { key: "PROBLEM_SOLVING", value: "true" },
  { key: "COMMUNICATION", value: "excellent" },
  { key: "TEAMWORK", value: "collaborative" },
  { key: "LEARNING_RATE", value: "constant" },
] as const;
