import type { Service } from "@/types/services";

export const SERVICES: Service[] = [
  {
    id: "ai-ml",
    title: "AI & ML Solutions",
    description:
      "Custom RAG pipelines, intelligent chatbots, NLP systems, and LangChain/LangFlow integrations tailored to your business needs.",
    tags: ["Python", "LangChain", "LangFlow", "RAG", "NLP"],
    command: '$ hire --service "ai-ml"',
    icon: "brain",
  },
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    description:
      "Modern, performant web applications with Next.js and React frontends, FastAPI or Node.js backends, and clean architecture.",
    tags: ["Next.js", "React", "TypeScript", "FastAPI", "Node.js"],
    command: '$ hire --service "fullstack"',
    icon: "code",
  },
  {
    id: "automation",
    title: "Python Automation & Scraping",
    description:
      "Data extraction pipelines, web scraping solutions, workflow automation, and custom scripting to eliminate manual work.",
    tags: ["Python", "BeautifulSoup", "Scrapy", "Selenium"],
    command: '$ hire --service "automation"',
    icon: "cog",
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    description:
      "Architecture reviews, AI strategy sessions, code audits, and tech stack decisions to set your project on the right path.",
    tags: ["System Design", "AI Strategy", "Code Review"],
    command: '$ hire --service "consulting"',
    icon: "compass",
  },
];
