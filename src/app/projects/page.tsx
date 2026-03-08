import type { Metadata } from "next";
import { fetchGitHubRepos } from "@/lib/github";
import { PageTransition } from "@/components/page-transition";
import { SectionHeader } from "@/components/section-header";
import { ProjectsClient } from "@/app/projects/projects-client";

export const metadata: Metadata = {
  title: "Projects — Abdul-Muizz",
  description:
    "Open-source projects and repositories by Abdul-Muizz, covering AI/ML, full-stack web development, and Python automation.",
};

export default async function ProjectsPage() {
  const repos = await fetchGitHubRepos();

  return (
    <PageTransition>
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
        <SectionHeader command="$ ls ~/projects" />
        <ProjectsClient repos={repos} />
      </div>
    </PageTransition>
  );
}
