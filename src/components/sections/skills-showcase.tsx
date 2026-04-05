"use client";

import { motion } from "framer-motion";
import { Brain, Code, Cog, Database, Globe, Terminal } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

interface SkillDomain {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  technologies: string[];
}

const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description:
      "Building intelligent systems with LangGraph agents, RAG pipelines, and NLP solutions that solve real business problems.",
    icon: <Brain className="size-5" />,
    technologies: ["Python", "LangChain", "LangGraph", "LangFuse", "RAG", "NLP", "GPT-4o", "DeepEval"],
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    description:
      "Crafting performant, responsive interfaces with modern React and Next.js, styled with Tailwind CSS.",
    icon: <Globe className="size-5" />,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description:
      "Designing scalable microservice architectures, RESTful APIs, and robust backend systems.",
    icon: <Terminal className="size-5" />,
    technologies: ["FastAPI", "Node.js", "Express", "REST APIs", "Celery", "Redis"],
  },
  {
    id: "automation",
    title: "Automation & Scraping",
    description:
      "Building data extraction pipelines, web scraping solutions, and workflow automation to eliminate manual work.",
    icon: <Cog className="size-5" />,
    technologies: ["Scrapy", "Playwright", "Selenium", "BeautifulSoup", "AWS Lambda", "SQS"],
  },
  {
    id: "databases",
    title: "Databases & Storage",
    description:
      "Working with relational and NoSQL databases, designing efficient schemas, and managing data at scale.",
    icon: <Database className="size-5" />,
    technologies: ["PostgreSQL", "MongoDB", "SQLAlchemy", "Redis", "S3"],
  },
  {
    id: "devtools",
    title: "DevOps & Tooling",
    description:
      "Containerized deployments, CI/CD pipelines, and cloud infrastructure for reliable production systems.",
    icon: <Code className="size-5" />,
    technologies: ["Git", "Docker", "AWS", "ECS", "GitHub Actions"],
  },
];

function SkillCard({ domain, index }: { domain: SkillDomain; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group rounded-lg border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-border-bright hover:shadow-glow"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="text-accent-cyan">{domain.icon}</span>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {domain.title}
        </h3>
      </div>

      <p className="mb-4 text-[0.875rem] leading-relaxed text-foreground-muted">
        {domain.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {domain.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-sm bg-accent-cyan-soft px-2 py-0.5 text-[0.75rem] text-accent-cyan transition-colors group-hover:bg-accent-cyan/15"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsShowcase() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <SectionHeader command="~/skills" />

      <p className="mt-4 max-w-2xl text-foreground-muted">
        Domains I specialize in and the technologies I use to build solutions.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_DOMAINS.map((domain, i) => (
          <SkillCard key={domain.id} domain={domain} index={i} />
        ))}
      </div>
    </section>
  );
}
