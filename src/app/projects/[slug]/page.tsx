import type { Metadata } from "next";
import Link from "next/link";
import { Star, GitFork, ExternalLink, Globe } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { fetchGitHubRepos, fetchRepoReadme } from "@/lib/github";
import { LANGUAGE_COLORS, GITHUB_USERNAME } from "@/lib/constants";
import { CodeBlock } from "@/components/code-block";
import { MermaidDiagram } from "@/components/mermaid-diagram";

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
        <div className="grid gap-8 overflow-x-hidden md:grid-cols-[1fr_300px]">
          {/* Main area — README */}
          <div className="min-w-0">
            <CodeBlock filename="README.md" showLineNumbers={false}>
              {readme ? (
                <div className="prose-github">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    urlTransform={(url, key) => {
                      if (
                        url.startsWith("https://") ||
                        url.startsWith("http://") ||
                        url.startsWith("#") ||
                        url.startsWith("mailto:")
                      )
                        return url;
                      const clean = url.replace(/^\.?\//, "");
                      if (key === "src") {
                        return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/HEAD/${clean}`;
                      }
                      const segment = clean.endsWith("/") ? "tree" : "blob";
                      return `https://github.com/${GITHUB_USERNAME}/${repo.name}/${segment}/HEAD/${clean}`;
                    }}
                    components={{
                      code: ({ children, className }) => {
                        const match = /language-(\w+)/.exec(className ?? "");
                        if (match?.[1] === "mermaid") {
                          return (
                            <MermaidDiagram
                              chart={String(children).replace(/\n$/, "")}
                            />
                          );
                        }
                        return <code className={className}>{children}</code>;
                      },
                      pre: ({ children, node }) => {
                        const codeNode = node?.children?.[0];
                        if (
                          codeNode &&
                          "tagName" in codeNode &&
                          codeNode.tagName === "code"
                        ) {
                          const cls = codeNode.properties?.className;
                          if (
                            Array.isArray(cls) &&
                            cls.includes("language-mermaid")
                          ) {
                            return <>{children}</>;
                          }
                        }
                        return <pre>{children}</pre>;
                      },
                      img: ({ src, alt }) => {
                        if (!src || typeof src !== "string") return null;
                        const isValidSrc =
                          src.startsWith("https://") ||
                          src.startsWith("http://") ||
                          src.startsWith("/") ||
                          src.startsWith("./");
                        if (!isValidSrc) return null;
                        return (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={src}
                            alt={alt ?? "Project image"}
                          />
                        );
                      },
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
