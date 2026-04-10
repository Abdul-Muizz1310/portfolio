/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import type * as ConstantsModule from "@/lib/constants";

const TEST_REPO = {
  id: 1,
  name: "test-repo",
  full_name: "user/test-repo",
  description: "A test",
  html_url: "https://github.com/user/test-repo",
  homepage: "https://test.com",
  language: "TypeScript",
  stargazers_count: 5,
  forks_count: 2,
  topics: ["react"],
  created_at: "2024-01-01",
  updated_at: "2024-06-01",
  pushed_at: "2024-06-01",
};

const mockFetchGitHubRepos = vi.fn().mockResolvedValue([TEST_REPO]);
const mockFetchRepoReadme = vi
  .fn()
  .mockResolvedValue("# Test Repo\nHello world");

vi.mock("@/lib/github", () => ({
  fetchGitHubRepos: (...args: any[]) => mockFetchGitHubRepos(...args),
  fetchRepoReadme: (...args: any[]) => mockFetchRepoReadme(...args),
}));

vi.mock("@/lib/constants", async (importOriginal) => {
  const actual = await importOriginal<typeof ConstantsModule>();
  return {
    ...actual,
    LANGUAGE_COLORS: { TypeScript: "#3178c6" },
  };
});

vi.mock("@/components/code-block", () => ({
  CodeBlock: ({ children, filename }: any) => (
    <div data-testid="code-block" data-filename={filename}>
      {children}
    </div>
  ),
}));

vi.mock("@/components/mermaid-diagram", () => ({
  MermaidDiagram: ({ chart }: any) => (
    <div data-testid="mermaid-diagram">{chart}</div>
  ),
}));

vi.mock("react-markdown", () => ({
  default: ({ children, components, urlTransform }: any) => {
    const c = components || {};
    // Exercise urlTransform with key parameter
    const resolvedHref = urlTransform?.("docs/README.md", "href", {});
    const resolvedSrc = urlTransform?.("assets/img.png", "src", {});
    const absoluteUrl = urlTransform?.("https://example.com", "href", {});
    return (
      <div data-testid="markdown">
        {/* inline code (no className) */}
        {c.code ? c.code({ children: "inline", className: undefined }) : null}
        {/* block code (with className) */}
        {c.code
          ? c.code({ children: "block code", className: "language-js" })
          : null}
        {/* mermaid code block */}
        {c.code
          ? c.code({
              children: "graph TD\n  A-->B",
              className: "language-mermaid",
            })
          : null}
        {/* pre with mermaid hast node */}
        {c.pre
          ? c.pre({
              children: c.code
                ? c.code({
                    children: "graph LR\n  X-->Y",
                    className: "language-mermaid",
                  })
                : null,
              node: {
                children: [
                  {
                    tagName: "code",
                    properties: { className: ["language-mermaid"] },
                  },
                ],
              },
            })
          : null}
        {/* pre with regular content */}
        {c.pre
          ? c.pre({
              children: "preformatted",
              node: {
                children: [
                  {
                    tagName: "code",
                    properties: { className: ["language-js"] },
                  },
                ],
              },
            })
          : null}
        {/* valid image */}
        {c.img
          ? c.img({ src: "https://example.com/img.png", alt: "test" })
          : null}
        {/* invalid image (no src) */}
        {c.img ? c.img({ src: undefined, alt: "broken" }) : null}
        {/* invalid image (data: URI — not valid per filter) */}
        {c.img ? c.img({ src: "data:image/png;base64,abc", alt: "bad" }) : null}
        {resolvedHref && (
          <a data-testid="resolved-href" href={resolvedHref}>
            link
          </a>
        )}
        {resolvedSrc && (
          <img data-testid="resolved-src" src={resolvedSrc} alt="" />
        )}
        {absoluteUrl && (
          <a data-testid="absolute-url" href={absoluteUrl}>
            abs
          </a>
        )}
        <span>{children}</span>
      </div>
    );
  },
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import ProjectDetailPage, {
  generateStaticParams,
  generateMetadata,
} from "@/app/projects/[slug]/page";

describe("Project detail page", () => {
  beforeEach(() => {
    mockFetchGitHubRepos.mockResolvedValue([TEST_REPO]);
    mockFetchRepoReadme.mockResolvedValue("# Test Repo\nHello world");
  });

  it("generateStaticParams returns array with slug", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([{ slug: "test-repo" }]);
  });

  it("generateMetadata returns title containing repo name", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "test-repo" }),
    });
    expect(meta.title).toContain("test-repo");
  });

  it("generateMetadata returns fallback title for non-existent slug", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "no-such-repo" }),
    });
    expect(meta.title).toBe("Project — Abdul-Muizz");
  });

  it("renders repo info for a valid slug", async () => {
    const jsx = await ProjectDetailPage({
      params: Promise.resolve({ slug: "test-repo" }),
    });
    render(jsx);

    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("A test")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("View on GitHub")).toBeInTheDocument();
    expect(screen.getByText("Live Demo")).toBeInTheDocument();
  });

  it("shows not found for non-existent slug", async () => {
    const jsx = await ProjectDetailPage({
      params: Promise.resolve({ slug: "no-such-repo" }),
    });
    render(jsx);

    expect(
      screen.getByText("// Repository not found"),
    ).toBeInTheDocument();
  });

  it("does not render Live Demo link when homepage is null", async () => {
    mockFetchGitHubRepos.mockResolvedValueOnce([
      { ...TEST_REPO, homepage: null },
    ]);

    const jsx = await ProjectDetailPage({
      params: Promise.resolve({ slug: "test-repo" }),
    });
    render(jsx);

    expect(screen.queryByText("Live Demo")).not.toBeInTheDocument();
  });

  it("renders mermaid code blocks as MermaidDiagram", async () => {
    const jsx = await ProjectDetailPage({
      params: Promise.resolve({ slug: "test-repo" }),
    });
    render(jsx);

    const diagrams = screen.getAllByTestId("mermaid-diagram");
    expect(diagrams.length).toBeGreaterThanOrEqual(1);
    expect(diagrams[0]).toHaveTextContent("graph TD");
  });

  it("resolves relative href links to GitHub blob URLs", async () => {
    const jsx = await ProjectDetailPage({
      params: Promise.resolve({ slug: "test-repo" }),
    });
    render(jsx);

    const link = screen.getByTestId("resolved-href");
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("github.com"),
    );
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("/blob/HEAD/"),
    );
  });

  it("resolves relative src URLs to raw.githubusercontent", async () => {
    const jsx = await ProjectDetailPage({
      params: Promise.resolve({ slug: "test-repo" }),
    });
    render(jsx);

    const img = screen.getByTestId("resolved-src");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("raw.githubusercontent.com"),
    );
  });

  it("preserves absolute URLs in urlTransform", async () => {
    const jsx = await ProjectDetailPage({
      params: Promise.resolve({ slug: "test-repo" }),
    });
    render(jsx);

    const link = screen.getByTestId("absolute-url");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("shows no README message when readme is null", async () => {
    mockFetchRepoReadme.mockResolvedValueOnce(null);

    const jsx = await ProjectDetailPage({
      params: Promise.resolve({ slug: "test-repo" }),
    });
    render(jsx);

    expect(
      screen.getByText("// No README available"),
    ).toBeInTheDocument();
  });
});
