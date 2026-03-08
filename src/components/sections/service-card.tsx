"use client";

import type { LucideIcon } from "lucide-react";
import { Brain, Code, Cog, Compass } from "lucide-react";
import type { Service } from "@/types/services";

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  code: Code,
  cog: Cog,
  compass: Compass,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Code;

  return (
    <div className="group rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-bright hover:shadow-glow">
      <Icon size={32} className="text-accent-cyan" aria-hidden="true" />

      <h3 className="text-h4 mt-4">{service.title}</h3>

      <p className="mt-2 leading-relaxed text-foreground-muted">
        {service.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm bg-accent-cyan-soft px-2 py-0.5 text-[0.75rem] text-accent-cyan"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-4 font-mono text-[0.75rem] text-foreground-faint">
        {service.command}
      </p>
    </div>
  );
}
