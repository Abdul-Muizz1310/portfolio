// Canonical origin used for metadata, sitemap, robots and structured data.
// Set NEXT_PUBLIC_SITE_URL when the site moves to a custom domain.
const DEFAULT_SITE_URL = "https://abdul-muizz-info.vercel.app";

export const SITE_CONFIG = {
  name: "Abdul-Muizz",
  title: "Abdul-Muizz Anwar — AI Software Engineer",
  description:
    "Abdul-Muizz Anwar is an AI Software Engineer in Islamabad, Pakistan, building LangGraph agents, RAG pipelines and full-stack systems with Next.js and FastAPI.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, ""),
  locale: "en_US",
  themeColor: "#0a0a0a",
  github: "https://github.com/Abdul-Muizz1310",
  linkedin: "https://www.linkedin.com/in/abdulmuizz1310/",
  email: "abdulmuizz1310@outlook.com",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/", path: "~" },
  { label: "About", href: "/about", path: "~/about" },
  { label: "Projects", href: "/projects", path: "~/projects" },
  { label: "Resume", href: "/resume", path: "~/resume" },
  { label: "Contact", href: "/contact", path: "~/contact" },
] as const;

export const GITHUB_USERNAME = "Abdul-Muizz1310";

export const LANGUAGE_EXTENSIONS: Record<string, string> = {
  Python: ".py",
  TypeScript: ".ts",
  JavaScript: ".js",
  HTML: ".html",
  CSS: ".css",
  Rust: ".rs",
  Go: ".go",
  Java: ".java",
};

export const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Java: "#B07219",
};
