"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { CodeBlock } from "@/components/code-block";
import { SKILLS } from "@/lib/resume-data";

type SkillCategory = keyof typeof SKILLS;

function SkillBadge({ skill }: { skill: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={`cursor-pointer text-accent-cyan transition-all duration-150 ${
        hovered ? "rounded bg-accent-cyan-soft px-1" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      &quot;{skill}&quot;
    </span>
  );
}

function SkillLine({
  category,
  skills,
  isLast,
}: {
  category: string;
  skills: readonly string[];
  isLast: boolean;
}) {
  return (
    <div className="flex flex-wrap">
      <span className="whitespace-pre">{"    "}</span>
      <span className="text-accent-purple">&quot;{category}&quot;</span>
      <span className="text-foreground-faint">: [</span>
      {skills.map((skill, i) => (
        <span key={skill}>
          <SkillBadge skill={skill} />
          {i < skills.length - 1 && (
            <span className="text-foreground-faint">, </span>
          )}
        </span>
      ))}
      <span className="text-foreground-faint">]{isLast ? "" : ","}</span>
    </div>
  );
}

export function UsesStack() {
  const categories = Object.keys(SKILLS) as SkillCategory[];

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20">
      <SectionHeader command="~/uses" />

      <div className="mt-8">
        <CodeBlock filename="package.json" showLineNumbers={true}>
          <div className="text-foreground-faint">{"{"}</div>
          <div>
            <span className="whitespace-pre">{"  "}</span>
            <span className="text-accent-purple">&quot;name&quot;</span>
            <span className="text-foreground-faint">: </span>
            <span className="text-accent-cyan">&quot;abdul-muizz&quot;</span>
            <span className="text-foreground-faint">,</span>
          </div>
          <div>
            <span className="whitespace-pre">{"  "}</span>
            <span className="text-accent-purple">&quot;version&quot;</span>
            <span className="text-foreground-faint">: </span>
            <span className="text-accent-cyan">&quot;2026.3&quot;</span>
            <span className="text-foreground-faint">,</span>
          </div>
          <div>
            <span className="whitespace-pre">{"  "}</span>
            <span className="text-accent-purple">&quot;skills&quot;</span>
            <span className="text-foreground-faint">{": {"}</span>
          </div>
          {categories.map((category, i) => (
            <SkillLine
              key={category}
              category={category}
              skills={SKILLS[category]}
              isLast={i === categories.length - 1}
            />
          ))}
          <div>
            <span className="whitespace-pre">{"  "}</span>
            <span className="text-foreground-faint">{"}"}</span>
          </div>
          <div className="text-foreground-faint">{"}"}</div>
        </CodeBlock>
      </div>
    </section>
  );
}
