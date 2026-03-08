import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { ProjectCard } from "@/components/project-card";
import { fetchGitHubRepos } from "@/lib/github";

export async function FeaturedProjects() {
  let repos;

  try {
    const allRepos = await fetchGitHubRepos();
    repos = allRepos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3);
  } catch {
    return (
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20">
        <SectionHeader command="~/featured-projects" />
        <p className="mt-8 font-mono text-foreground-muted">
          // Error fetching repositories. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20">
      <SectionHeader command="~/featured-projects" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>

      <Link
        href="/projects"
        className="font-mono text-accent-cyan hover:underline mt-6 inline-block"
      >
        cd ./projects &rarr;
      </Link>
    </section>
  );
}
