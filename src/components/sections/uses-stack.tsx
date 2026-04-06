"use client";

import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFastapi,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiRedis,
  SiCelery,
  SiLangchain,
} from "react-icons/si";
import { TbBrandReactNative, TbApi, TbBrain } from "react-icons/tb";
import { FaAws } from "react-icons/fa";
import { SectionHeader } from "@/components/section-header";

import type { IconType } from "react-icons";

type Tech = {
  name: string;
  Icon: IconType;
  color: string;
};

const CATEGORIES: { title: string; items: Tech[] }[] = [
  {
    title: "languages",
    items: [
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    title: "ai / ml",
    items: [
      { name: "LangChain", Icon: SiLangchain, color: "#1C3C3C" },
      { name: "LangGraph", Icon: TbBrain, color: "#22D3EE" },
      { name: "RAG", Icon: TbBrain, color: "#8B5CF6" },
      { name: "NLP", Icon: TbBrain, color: "#3B82F6" },
    ],
  },
  {
    title: "frontend",
    items: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "React Native", Icon: TbBrandReactNative, color: "#61DAFB" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "backend",
    items: [
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", Icon: SiExpress, color: "#FFFFFF" },
      { name: "REST APIs", Icon: TbApi, color: "#22D3EE" },
    ],
  },
  {
    title: "databases",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    title: "tools",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "AWS", Icon: FaAws, color: "#FF9900" },
      { name: "Redis", Icon: SiRedis, color: "#DC382D" },
      { name: "Celery", Icon: SiCelery, color: "#37814A" },
    ],
  },
];

export function UsesStack() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <SectionHeader command="~/uses" />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map(({ title, items }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-border-bright hover:shadow-glow"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[0.75rem] uppercase tracking-spaced text-foreground-faint">
                {`// ${title}`}
              </span>
              <span className="font-mono text-[0.75rem] text-accent-cyan">
                {items.length}
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-2">
              {items.map(({ name, Icon, color }) => (
                <li
                  key={name}
                  className="flex items-center gap-2 rounded-md border border-transparent bg-background/40 px-2.5 py-2 transition-all duration-200 hover:border-border-bright hover:bg-surface-hover"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ color }}
                  />
                  <span className="truncate text-[0.8125rem] text-foreground-muted">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
