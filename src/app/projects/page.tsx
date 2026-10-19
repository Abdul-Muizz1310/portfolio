import { fetchGitHubRepos } from "@/lib/github";
import { SectionHeader } from "@/components/section-header";
import { ProjectsClient } from "@/app/projects/projects-client";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Open-source projects by Abdul-Muizz Anwar: AI agents, RAG pipelines, full-stack web apps and Python automation, pulled live from GitHub.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const repos = await fetchGitHubRepos();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <SectionHeader as="h1" command="$ ls ~/projects" />
      <ProjectsClient repos={repos} />
    </div>
  );
}
