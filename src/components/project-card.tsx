"use client";

import Link from "next/link";
import { Star, GitFork } from "lucide-react";
import type { GitHubRepo } from "@/types/github";
import { LANGUAGE_EXTENSIONS, LANGUAGE_COLORS } from "@/lib/constants";

interface ProjectCardProps {
  repo: GitHubRepo;
}

export function ProjectCard({ repo }: ProjectCardProps) {
  const extension = repo.language
    ? (LANGUAGE_EXTENSIONS[repo.language] ?? "")
    : "";
  const languageColor = repo.language
    ? (LANGUAGE_COLORS[repo.language] ?? "#888")
    : null;

  return (
    <Link href={`/projects/${repo.name}`} className="block">
      <div className="group overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-border-bright hover:shadow-glow">
        {/* File tab bar */}
        <div className="flex h-8 items-center gap-2 border-b border-border bg-surface-hover px-3">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "#FF5F56" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "#FFBD2E" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "#27C93F" }}
          />
          <span className="ml-2 font-mono text-[0.75rem] text-foreground-muted">
            {repo.name}
            {extension}
          </span>
        </div>

        {/* Content area */}
        <div className="p-4">
          {/* Description as code comment */}
          <p className="font-mono text-[0.875rem] text-foreground-muted">
            {"// "}{repo.description ?? "No description provided"}
          </p>

          {/* Topics */}
          {repo.topics.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {repo.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-sm bg-accent-cyan-soft px-2 py-0.5 text-[0.75rem] text-accent-cyan"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Bottom row */}
          <div className="mt-3 flex items-center gap-4">
            {repo.language && languageColor && (
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: languageColor }}
                />
                <span className="text-[0.75rem] text-foreground-muted">
                  {repo.language}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1 text-[0.75rem] text-foreground-muted">
              <Star size={14} />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1 text-[0.75rem] text-foreground-muted">
              <GitFork size={14} />
              <span>{repo.forks_count}</span>
            </div>

            {/* Open arrow on hover */}
            <span className="ml-auto text-[0.75rem] text-accent-cyan opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Open &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
