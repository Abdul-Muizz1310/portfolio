"use client";

import Link from "next/link";

interface LabCardProps {
  title: string;
  description: string;
  tech: string[];
  href: string;
  preview: React.ReactNode;
}

export function LabCard({ title, description, tech, href, preview }: LabCardProps) {
  return (
    <Link href={href}>
      <div className="bg-surface border border-border rounded-lg overflow-hidden group transition-all duration-200 hover:border-border-bright hover:shadow-glow hover:-translate-y-0.5">
        <div className="h-40 bg-background relative overflow-hidden">
          {preview}
        </div>
        <div className="p-4">
          <h3 className="text-h4">{title}</h3>
          <p className="text-foreground-muted text-[0.875rem] mt-1">{description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {tech.map((t) => (
              <span
                key={t}
                className="bg-accent-cyan-soft text-accent-cyan text-[0.75rem] px-2 py-0.5 rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
