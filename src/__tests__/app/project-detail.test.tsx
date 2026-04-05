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

vi.mock("react-markdown", () => ({
  default: ({ children, components }: any) => {
    // Exercise all custom component renderers to cover lines 76-160
    const c = components || {};
    return (
      <div data-testid="markdown">
        {c.h1 ? c.h1({ children: "Heading 1" }) : null}
        {c.h2 ? c.h2({ children: "Heading 2" }) : null}
        {c.h3 ? c.h3({ children: "Heading 3" }) : null}
        {c.p ? c.p({ children: "Paragraph" }) : null}
        {c.a ? c.a({ href: "https://example.com", children: "Link" }) : null}
        {c.ul ? c.ul({ children: <li>item</li> }) : null}
        {c.ol ? c.ol({ children: <li>ordered</li> }) : null}
        {c.li ? c.li({ children: "List item" }) : null}
        {/* inline code (no className) */}
        {c.code ? c.code({ children: "inline", className: undefined }) : null}
        {/* block code (with className) */}
        {c.code
          ? c.code({ children: "block code", className: "language-js" })
          : null}
        {c.pre ? c.pre({ children: "preformatted" }) : null}
        {c.blockquote ? c.blockquote({ children: "quote" }) : null}
        {/* valid image */}
        {c.img
          ? c.img({ src: "https://example.com/img.png", alt: "test" })
          : null}
        {/* invalid image (no src) */}
        {c.img ? c.img({ src: undefined, alt: "broken" }) : null}
        {/* invalid image (data: URI — not valid per filter) */}
        {c.img ? c.img({ src: "data:image/png;base64,abc", alt: "bad" }) : null}
        {c.hr ? c.hr({}) : null}
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
