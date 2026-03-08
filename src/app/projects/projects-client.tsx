"use client";

import { useState, useMemo } from "react";
import type { GitHubRepo } from "@/types/github";
import { ProjectFilter } from "@/components/sections/project-filter";
import { ProjectCard } from "@/components/project-card";

interface ProjectsClientProps {
  repos: GitHubRepo[];
}

export function ProjectsClient({ repos }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const languages = useMemo(() => {
    const langSet = new Set<string>();
    for (const repo of repos) {
      if (repo.language) {
        langSet.add(repo.language);
      }
    }
    return Array.from(langSet).sort();
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (activeFilter === "all") return repos;
    return repos.filter((repo) => repo.language === activeFilter);
  }, [repos, activeFilter]);

  return (
    <div className="mt-8">
      <ProjectFilter
        languages={languages}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredRepos.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRepos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <p className="mt-8 font-mono text-[0.875rem] text-foreground-faint">
          // No projects found
        </p>
      )}
    </div>
  );
}
