import type { Metadata } from "next";
import Link from "next/link";
import { Star, GitFork, ExternalLink, Globe } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { fetchGitHubRepos, fetchRepoReadme } from "@/lib/github";
import { LANGUAGE_COLORS } from "@/lib/constants";
import { CodeBlock } from "@/components/code-block";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repos = await fetchGitHubRepos();
  return repos.map((repo) => ({ slug: repo.name }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const repos = await fetchGitHubRepos();
  const repo = repos.find((r) => r.name === slug);

  return {
    title: repo ? `${repo.name} — Abdul-Muizz` : "Project — Abdul-Muizz",
    description: repo?.description ?? "A project by Abdul-Muizz",
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const repos = await fetchGitHubRepos();
  const repo = repos.find((r) => r.name === slug);

  if (!repo) {
    return (
      <>
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
          <p className="font-mono text-foreground-muted">
            {"// Repository not found"}
          </p>
        </div>
      </>
    );
  }

  const readme = await fetchRepoReadme(repo.name);
  const languageColor = repo.language
    ? (LANGUAGE_COLORS[repo.language] ?? "#888")
    : null;

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
        {/* Back link */}
        <Link
          href="/projects"
          className="mb-6 inline-block font-mono text-[0.875rem] text-foreground-muted transition-colors hover:text-accent-cyan"
        >
          &larr; cd ~/projects
        </Link>

        {/* Two-column layout */}
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          {/* Main area — README */}
          <div>
            <CodeBlock filename="README.md" showLineNumbers={false}>
              {readme ? (
                <div className="prose-custom">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mb-4 mt-6 text-h3 text-foreground first:mt-0">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mb-3 mt-5 text-h4 text-foreground">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mb-2 mt-4 font-heading text-[1.125rem] font-semibold text-foreground">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="mb-3 leading-relaxed text-foreground-muted">
                          {children}
                        </p>
                      ),
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-cyan underline decoration-accent-cyan/30 transition-colors hover:text-accent-blue"
                        >
                          {children}
                        </a>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-3 space-y-1 pl-4">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-3 list-decimal space-y-1 pl-4">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-foreground-muted before:mr-2 before:text-foreground-faint before:content-['•']">
                          {children}
                        </li>
                      ),
                      code: ({ children, className }) => {
                        const isInline = !className;
                        if (isInline) {
                          return (
                            <code className="rounded bg-surface-hover px-1.5 py-0.5 font-mono text-[0.8125rem] text-accent-cyan">
                              {children}
                            </code>
                          );
                        }
                        return (
                          <code className="block overflow-x-auto rounded-md bg-surface-hover p-4 font-mono text-[0.8125rem] text-foreground-muted">
                            {children}
                          </code>
                        );
                      },
                      pre: ({ children }) => (
                        <pre className="mb-3 overflow-x-auto rounded-md bg-surface-hover p-4">
                          {children}
                        </pre>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="mb-3 border-l-2 border-accent-cyan pl-4 text-foreground-muted italic">
                          {children}
                        </blockquote>
                      ),
                      img: ({ src, alt }) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={src}
                          alt={alt ?? ""}
                          className="my-3 max-w-full rounded-md"
                        />
                      ),
                      hr: () => <hr className="my-6 border-border" />,
                    }}
                  >
                    {readme}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-foreground-faint">
                  {"// No README available"}
                </p>
              )}
            </CodeBlock>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Repo name */}
            <h1 className="text-h3 text-foreground">{repo.name}</h1>

            {repo.description && (
              <p className="text-[0.875rem] leading-relaxed text-foreground-muted">
                {repo.description}
              </p>
            )}

            {/* Language */}
            {repo.language && languageColor && (
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: languageColor }}
                />
                <span className="text-[0.875rem] text-foreground-muted">
                  {repo.language}
                </span>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[0.875rem] text-foreground-muted">
                <Star size={16} />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[0.875rem] text-foreground-muted">
                <GitFork size={16} />
                <span>{repo.forks_count}</span>
              </div>
            </div>

            {/* Topics */}
            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
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

            {/* Links */}
            <div className="space-y-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[0.875rem] text-foreground-muted transition-colors hover:text-accent-cyan"
              >
                <ExternalLink size={16} />
                View on GitHub
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[0.875rem] text-foreground-muted transition-colors hover:text-accent-cyan"
                >
                  <Globe size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
