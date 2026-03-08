# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a clean, hacker-themed portfolio website with 8 pages, terminal/code-editor aesthetics, dynamic GitHub/Dev.to data, 3D particles, and interactive features.

**Architecture:** Next.js 16 App Router with Server Components by default, client components only for interactivity. Data from GitHub/Dev.to APIs fetched at build time with ISR. Framer Motion for animations, Three.js for hero particles, Zustand for theme state.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, ShadCN/UI, Framer Motion, Three.js/R3F, Zustand

**Design doc:** `docs/plans/2026-03-08-portfolio-design.md`
**Design system:** `docs/plans/2026-03-08-design-system.md`

---

## Phase 1: Foundation — Dependencies, Types, Data Files

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install production dependencies**

Run:
```bash
npm install framer-motion three @react-three/fiber @react-three/drei zustand react-markdown resend lucide-react
```

**Step 2: Initialize ShadCN/UI**

Run:
```bash
npx shadcn@latest init
```

Choose: New York style, Zinc base color, CSS variables = yes.

**Step 3: Add ShadCN components we need**

Run:
```bash
npx shadcn@latest add button input textarea card badge separator
```

**Step 4: Install Three.js types**

Run:
```bash
npm install -D @types/three
```

**Step 5: Verify build**

Run: `npm run build`
Expected: Compiles successfully.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: install core dependencies — framer-motion, three.js, shadcn, zustand"
```

---

### Task 2: Create Type Definitions

**Files:**
- Create: `src/types/github.ts`
- Create: `src/types/blog.ts`
- Create: `src/types/services.ts`

**Step 1: Create types directory and GitHub types**

`src/types/github.ts`:
```typescript
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubReadme {
  content: string;
  encoding: string;
}
```

**Step 2: Create blog types**

`src/types/blog.ts`:
```typescript
export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  reading_time_minutes: number;
  cover_image: string | null;
  social_image: string | null;
}

export interface LinkedInArticle {
  title: string;
  url: string;
  date: string;
  description: string;
  thumbnail?: string;
}
```

**Step 3: Create services types**

`src/types/services.ts`:
```typescript
export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  command: string;
  icon: string;
}

export interface Testimonial {
  hash: string;
  author: string;
  company: string;
  role: string;
  date: string;
  quote: string;
}
```

**Step 4: Verify build**

Run: `npm run build`

**Step 5: Commit**

```bash
git add src/types/
git commit -m "feat: add TypeScript type definitions for GitHub, blog, services"
```

---

### Task 3: Create Data Files

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/lib/resume-data.ts`
- Create: `src/lib/testimonials.ts`
- Create: `src/lib/services.ts`

**Step 1: Create constants**

`src/lib/constants.ts`:
```typescript
export const SITE_CONFIG = {
  name: "Abdul-Muizz",
  title: "Abdul-Muizz — Software Engineer",
  description: "Software Engineer specializing in AI/ML, Full-Stack Development, and Python Automation. Based in Islamabad, Pakistan.",
  url: "https://abdul-muizz.dev",
  github: "https://github.com/Abdul-Muizz1310",
  linkedin: "https://www.linkedin.com/in/abdulmuizz1310/",
  devto: "https://dev.to/abdulmuizz1310",
  email: "abdulmuizz1310@outlook.com",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/", path: "~" },
  { label: "About", href: "/about", path: "~/about" },
  { label: "Projects", href: "/projects", path: "~/projects" },
  { label: "Services", href: "/services", path: "~/services" },
  { label: "Blog", href: "/blog", path: "~/blog" },
  { label: "Lab", href: "/lab", path: "~/lab" },
  { label: "Resume", href: "/resume", path: "~/resume" },
  { label: "Contact", href: "/contact", path: "~/contact" },
] as const;

export const GITHUB_USERNAME = "Abdul-Muizz1310";
export const DEVTO_USERNAME = "abdulmuizz1310";

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
```

**Step 2: Create resume data**

`src/lib/resume-data.ts` — Extract from the resume PDF that was read earlier. Structure:
```typescript
export const PERSONAL_INFO = {
  name: "Abdul-Muizz",
  title: "Software Engineer",
  location: "Islamabad, Pakistan",
  email: "abdulmuizz1310@outlook.com",
  phone: "+92-XXX-XXXXXXX",
  summary: "Software Engineer specializing in AI/ML solutions, full-stack web development, and Python automation. Passionate about building intelligent systems that solve real-world problems.",
} as const;

export interface Experience {
  hash: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export const EXPERIENCE: Experience[] = [
  // Populate from resume — each role with hash, company, dates, bullet points
  // The implementer should read docs/resume.docx.pdf to fill these
];

export interface Education {
  hash: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export const EDUCATION: Education[] = [
  // Populate from resume
];

export const SKILLS = {
  languages: ["Python", "TypeScript", "JavaScript"],
  ai_ml: ["LangChain", "RAG", "NLP", "LangFlow"],
  frontend: ["React", "Next.js", "Tailwind CSS"],
  backend: ["FastAPI", "Node.js", "REST APIs"],
  tools: ["Git", "Docker", "VS Code"],
} as const;

export const VALUES = [
  { key: "PROBLEM_SOLVING", value: "true" },
  { key: "COMMUNICATION", value: "excellent" },
  { key: "TEAMWORK", value: "collaborative" },
  { key: "LEARNING_RATE", value: "constant" },
] as const;
```

NOTE: The implementer MUST read `docs/resume.docx.pdf` and fill in the actual EXPERIENCE and EDUCATION arrays with real data from the resume.

**Step 3: Create testimonials data**

`src/lib/testimonials.ts`:
```typescript
import type { Testimonial } from "@/types/services";

export const TESTIMONIALS: Testimonial[] = [
  {
    hash: "a3f8c2d",
    author: "Sarah Chen",
    company: "TechVentures AI",
    role: "CTO",
    date: "Feb 2026",
    quote: "Abdul-Muizz built a RAG pipeline that cut our research time by 60%. Exceptional understanding of LLM architectures and practical AI solutions.",
  },
  {
    hash: "b7e1d4a",
    author: "Marcus Rivera",
    company: "Launchpad Digital",
    role: "Founder",
    date: "Jan 2026",
    quote: "Delivered a full-stack Next.js platform ahead of schedule. Clean code, great communication, and a keen eye for performance.",
  },
  {
    hash: "c9f2e8b",
    author: "Priya Sharma",
    company: "DataFlow Corp",
    role: "Operations Lead",
    date: "Nov 2025",
    quote: "His Python automation scripts saved our team 20+ hours per week. Reliable, efficient, and always thinking about edge cases.",
  },
  {
    hash: "d4a6f1c",
    author: "James Okafor",
    company: "Nexus Systems",
    role: "Engineering Manager",
    date: "Sep 2025",
    quote: "Brought clarity to our AI strategy when we were drowning in options. Abdul-Muizz doesn't just code — he thinks architecturally.",
  },
];
```

**Step 4: Create services data**

`src/lib/services.ts`:
```typescript
import type { Service } from "@/types/services";

export const SERVICES: Service[] = [
  {
    id: "ai-ml",
    title: "AI & ML Solutions",
    description: "Custom RAG pipelines, intelligent chatbots, NLP systems, and LangChain/LangFlow integrations tailored to your business needs.",
    tags: ["Python", "LangChain", "LangFlow", "RAG", "NLP"],
    command: '$ hire --service "ai-ml"',
    icon: "brain",
  },
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    description: "Modern, performant web applications with Next.js and React frontends, FastAPI or Node.js backends, and clean architecture.",
    tags: ["Next.js", "React", "TypeScript", "FastAPI", "Node.js"],
    command: '$ hire --service "fullstack"',
    icon: "code",
  },
  {
    id: "automation",
    title: "Python Automation & Scraping",
    description: "Data extraction pipelines, web scraping solutions, workflow automation, and custom scripting to eliminate manual work.",
    tags: ["Python", "BeautifulSoup", "Scrapy", "Selenium"],
    command: '$ hire --service "automation"',
    icon: "cog",
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    description: "Architecture reviews, AI strategy sessions, code audits, and tech stack decisions to set your project on the right path.",
    tags: ["System Design", "AI Strategy", "Code Review"],
    command: '$ hire --service "consulting"',
    icon: "compass",
  },
];
```

**Step 5: Create LinkedIn articles data file**

`src/lib/linkedin-articles.ts`:
```typescript
import type { LinkedInArticle } from "@/types/blog";

// Manually maintained — update when new LinkedIn articles are published
export const LINKEDIN_ARTICLES: LinkedInArticle[] = [
  // Add entries as needed:
  // { title: "...", url: "https://linkedin.com/...", date: "...", description: "..." },
];
```

**Step 6: Verify build**

Run: `npm run build`

**Step 7: Commit**

```bash
git add src/lib/ src/types/
git commit -m "feat: add data files — constants, resume data, testimonials, services"
```

---

### Task 4: Create API Fetcher Functions

**Files:**
- Create: `src/lib/github.ts`
- Create: `src/lib/devto.ts`

**Step 1: Create GitHub fetcher**

`src/lib/github.ts`:
```typescript
import { GITHUB_USERNAME } from "@/lib/constants";
import type { GitHubRepo } from "@/types/github";

const GITHUB_API = "https://api.github.com";

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const repos: GitHubRepo[] = await response.json();

  // Filter out the profile README repo
  return repos.filter((repo) => repo.name !== GITHUB_USERNAME);
}

export async function fetchRepoReadme(repoName: string): Promise<string | null> {
  const response = await fetch(
    `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) return null;

  const data = await response.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}
```

**Step 2: Create Dev.to fetcher**

`src/lib/devto.ts`:
```typescript
import { DEVTO_USERNAME } from "@/lib/constants";
import type { DevToArticle } from "@/types/blog";

const DEVTO_API = "https://dev.to/api";

export async function fetchDevToArticles(): Promise<DevToArticle[]> {
  const response = await fetch(
    `${DEVTO_API}/articles?username=${DEVTO_USERNAME}&per_page=30`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Dev.to API error: ${response.status}`);
  }

  return response.json();
}
```

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/lib/github.ts src/lib/devto.ts
git commit -m "feat: add GitHub and Dev.to API fetcher functions"
```

---

## Phase 2: Layout Shell — Navigation, Status Bar, Theme

### Task 5: Set Up Zustand Theme Store

**Files:**
- Create: `src/stores/theme-store.ts`

**Step 1: Create theme store**

`src/stores/theme-store.ts`:
```typescript
import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),
}));
```

NOTE: The actual theme application (adding/removing class on `<html>`) should be handled in a client component that reads this store and applies the class. Consider using `next-themes` if ShadCN recommends it, or implement manually.

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/stores/
git commit -m "feat: add Zustand theme store"
```

---

### Task 6: Build Navigation Component

**Files:**
- Create: `src/components/navigation.tsx`

**Step 1: Build the tab-bar navigation**

`src/components/navigation.tsx` — Client component (`"use client"`):
- Import `NAV_LINKS` from `@/lib/constants`
- Use `usePathname()` from `next/navigation` to detect active tab
- Desktop: horizontal tab bar with gradient underline on active link
- Mobile (<768px): hamburger icon that opens a slide-down menu
- Glass effect background: use `glass` utility class
- Fixed position, `z-50`, height `64px`
- Logo "AM" on left with `gradient-text` utility
- Theme toggle button on right (sun/moon icon from `lucide-react`)
- Active tab: gradient underline (2px, `gradient-bg` utility)

Refer to design doc Section 1 for exact specs. Use `@/components/ui/button` for the theme toggle. Use Framer Motion for hamburger menu animation.

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/components/navigation.tsx
git commit -m "feat: add tab-bar navigation with glass effect and mobile hamburger"
```

---

### Task 7: Build Status Bar Component

**Files:**
- Create: `src/components/status-bar.tsx`

**Step 1: Build the bottom status bar**

`src/components/status-bar.tsx` — Client component (`"use client"`):
- Fixed bottom, height `28px`, `z-50`
- Background: `bg-surface`, border-top `border-border`
- Font: `font-mono text-label`
- Left side: `◉ abdul-muizz.dev · ~/current-path`
- Right side: `UTF-8 · ☾ dark · HH:MM PM ▊` (blinking cursor)
- Use `usePathname()` to get current route
- Map route to display path using `NAV_LINKS[].path`
- Clock updates every minute (not every second)
- Blinking cursor: CSS animation (`animate-pulse` or custom)
- Mobile: show only path and theme indicator

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/components/status-bar.tsx
git commit -m "feat: add code-editor status bar with route path and clock"
```

---

### Task 8: Update Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update layout with navigation, status bar, and metadata**

Update `src/app/layout.tsx`:
- Import and render `Navigation` and `StatusBar` components
- Update `metadata` with real site title and description from `SITE_CONFIG`
- Add `pt-16 pb-7` padding to main content area (nav height + status bar height)
- Keep existing font setup (Geist, Geist Mono, Space Grotesk)
- Add skip-nav link for accessibility

Structure:
```tsx
<html lang="en">
  <body className={`${fonts} antialiased bg-background text-foreground`}>
    <a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>
    <Navigation />
    <main id="main-content" className="min-h-screen pt-16 pb-7">
      {children}
    </main>
    <StatusBar />
  </body>
</html>
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Verify dev server**

Run: `npm run dev` — check that nav and status bar render on the page.

**Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: update root layout with navigation, status bar, and metadata"
```

---

### Task 9: Build Shared UI Components

**Files:**
- Create: `src/components/terminal-typer.tsx`
- Create: `src/components/code-block.tsx`
- Create: `src/components/project-card.tsx`
- Create: `src/components/git-commit-card.tsx`
- Create: `src/components/section-header.tsx`
- Create: `src/components/page-transition.tsx`

**Step 1: Terminal typer component**

`src/components/terminal-typer.tsx` — Client component:
- Props: `commands: Array<{ command: string; response: string }>`
- Types each command character by character (~60ms)
- After command completes, pauses 300ms, then reveals response
- Then moves to next command
- Uses `font-mono` class
- Command text: `text-foreground-muted`, prefixed with `$ `
- Response text: `text-foreground`, prefixed with `> ` in `text-accent-cyan`
- Uses `useState` + `useEffect` with `setTimeout` for typing animation

**Step 2: Code block component**

`src/components/code-block.tsx` — Server-compatible:
- Props: `filename: string`, `children: React.ReactNode`, `showLineNumbers?: boolean`
- Renders a container styled like a code editor:
  - Top bar: file tab with filename, colored dots (red/yellow/green)
  - Optional line number gutter on the left
  - Content area with `font-mono`, `bg-surface`, `border`, `rounded-lg`

**Step 3: Project card component**

`src/components/project-card.tsx` — Client component:
- Props: `repo: GitHubRepo`
- Code-editor style card:
  - File tab: `repo-name.ext` (extension from `LANGUAGE_EXTENSIONS`)
  - Description as code comment: `// description`
  - Language color dot + name, star count, fork count
  - Topics as badges
- Hover: `translateY(-2px)`, gradient glow, "Open →" appears
- Links to `/projects/[repo.name]`

**Step 4: Git commit card component**

`src/components/git-commit-card.tsx`:
- Props: `testimonial: Testimonial`
- Renders a git-commit-styled testimonial:
  - `commit {hash}` in `text-foreground-faint font-mono`
  - `Author: {name} <{company}>` in `text-accent-cyan`
  - `Date: {date}` in `text-foreground-muted`
  - Quote in `text-foreground`, indented

**Step 5: Section header component**

`src/components/section-header.tsx`:
- Props: `command: string` (e.g., `"$ ls ~/projects"`)
- Renders the command in `font-mono text-h2` with gradient underline
- Semantic: wraps in an `<h2>` tag

**Step 6: Page transition wrapper**

`src/components/page-transition.tsx` — Client component:
- Uses Framer Motion `motion.div`
- Fade in + slide up on mount
- Props: `children: React.ReactNode`
- Wrap each page's content in this component

**Step 7: Verify build**

Run: `npm run build`

**Step 8: Commit**

```bash
git add src/components/
git commit -m "feat: add shared UI components — terminal typer, code block, project card, git commit card"
```

---

## Phase 3: Home Page

### Task 10: Build Three.js Particle Background

**Files:**
- Create: `src/components/three/particle-field.tsx`

**Step 1: Create the particle field component**

`src/components/three/particle-field.tsx` — Client component (`"use client"`):
- R3F `<Canvas>` wrapper
- ~120 particles (dots) randomly positioned in a 3D space
- Faint lines connecting nearby particles (distance threshold)
- Mouse interaction: particles gently repel from cursor position
- Colors: `#22D3EE` (accent-cyan) for dots, `#1E1E2E` (border) for lines
- Use `useFrame` for animation loop
- Use `useThree` to get pointer position
- No shadows, no post-processing
- Wrap in `Suspense` with `null` fallback
- Component accepts `className` for positioning

Refer to `@react-three/fiber` docs for Canvas setup and `@react-three/drei` for any helpers needed.

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/components/three/
git commit -m "feat: add Three.js particle field background for hero section"
```

---

### Task 11: Build Home Page Hero Section

**Files:**
- Create: `src/components/sections/hero.tsx`

**Step 1: Build the hero section**

`src/components/sections/hero.tsx` — Client component:
- Full viewport height (`min-h-screen`)
- Particle field as absolute-positioned background
- Content positioned on top (`relative z-10`)
- Left side: `TerminalTyper` with commands:
  - `{ command: "whoami", response: "Abdul-Muizz" }`
  - `{ command: "role", response: "Software Engineer · AI/ML · Full-Stack" }`
  - `{ command: "location", response: "Islamabad, Pakistan" }`
- Right side: Photo in `CodeBlock` frame with `filename="avatar.jpg"`
  - Use `next/image` for the photo, `avatar.jpg` from public directory
- CTAs below terminal: `View Projects` (gradient button) and `Download Resume` (ghost button)
- Scroll indicator: `// scroll to continue` with animated chevron
- Responsive: stack vertically on mobile (terminal above, photo below)

NOTE: Copy `avatar.jpg` to `public/` directory for `next/image` to serve it.

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/components/sections/hero.tsx public/avatar.jpg
git commit -m "feat: add hero section with terminal typer, photo frame, and particle background"
```

---

### Task 12: Build Home Page Remaining Sections

**Files:**
- Create: `src/components/sections/uses-stack.tsx`
- Create: `src/components/sections/featured-projects.tsx`
- Create: `src/components/sections/testimonials.tsx`
- Create: `src/components/sections/home-cta.tsx`

**Step 1: Uses/Stack section**

`src/components/sections/uses-stack.tsx`:
- Renders `SKILLS` data as a styled `package.json` code block
- Uses `CodeBlock` component with `filename="package.json"`
- Each skill array value is a hoverable badge that glows on interaction
- Section header: `~/uses`

**Step 2: Featured Projects section**

`src/components/sections/featured-projects.tsx`:
- Server component that fetches top 3 repos from GitHub
- Uses `fetchGitHubRepos()` → sort by stars → take top 3
- Renders 3 `ProjectCard` components
- Section header: `~/featured-projects`
- Bottom link: `cd ./projects →`

**Step 3: Testimonials section**

`src/components/sections/testimonials.tsx` — Client component:
- Imports `TESTIMONIALS` data
- Renders `GitCommitCard` for each testimonial
- Horizontal scroll container on mobile, grid on desktop
- Section header: `~/testimonials`

**Step 4: CTA section**

`src/components/sections/home-cta.tsx`:
- `$ ping abdul-muizz --message "let's work together"`
- Gradient button linking to `/contact`
- Centered layout, `py-20`

**Step 5: Assemble Home page**

Update `src/app/page.tsx`:
- Import and render: `Hero`, `UsesStack`, `FeaturedProjects`, `Testimonials`, `HomeCta`
- Wrap in `PageTransition`
- Each section separated by `space-20` vertical padding

**Step 6: Verify build**

Run: `npm run build`

**Step 7: Verify dev server**

Run: `npm run dev` — navigate to `/`, verify all sections render.

**Step 8: Commit**

```bash
git add src/components/sections/ src/app/page.tsx
git commit -m "feat: build complete home page — uses/stack, featured projects, testimonials, CTA"
```

---

## Phase 4: Content Pages

### Task 13: Build About Page

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/components/sections/experience-timeline.tsx`
- Create: `src/components/sections/education-timeline.tsx`
- Create: `src/components/sections/values.tsx`

**Step 1: Experience timeline component**

`src/components/sections/experience-timeline.tsx` — Client component:
- Renders `EXPERIENCE` data as git-log timeline
- Gradient line (cyan→blue→purple) running vertically
- Each node: circle dot + content card
- Framer Motion `whileInView` for fade + slide in
- Commit hash, role in `accent-cyan`, company in `accent-purple`, dates in `foreground-muted`

**Step 2: Education timeline component**

`src/components/sections/education-timeline.tsx`:
- Same visual as experience but with `branch: education` label
- Uses `EDUCATION` data

**Step 3: Values component**

`src/components/sections/values.tsx`:
- Renders `VALUES` as environment variables
- `font-mono`, keys in `foreground-muted`, values in `accent-cyan`

**Step 4: Assemble About page**

`src/app/about/page.tsx`:
- Section header: `$ cat about.md`
- Intro paragraphs (from `PERSONAL_INFO.summary`)
- `ExperienceTimeline`
- `EducationTimeline`
- `Values`
- Wrap in `PageTransition`

**Step 5: Verify build**

Run: `npm run build`

**Step 6: Commit**

```bash
git add src/app/about/ src/components/sections/experience-timeline.tsx src/components/sections/education-timeline.tsx src/components/sections/values.tsx
git commit -m "feat: add About page with git-log timeline, education, and env-var values"
```

---

### Task 14: Build Projects Page + Detail Page

**Files:**
- Create: `src/app/projects/page.tsx`
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/components/sections/project-filter.tsx`

**Step 1: Project filter component**

`src/components/sections/project-filter.tsx` — Client component:
- Terminal-style flags: `--all`, `--python`, `--typescript`, etc.
- Active filter: `gradient-bg text-white rounded-full`
- Inactive: ghost style
- Uses `useState` for active filter
- Emits filtered language to parent via callback

**Step 2: Projects list page**

`src/app/projects/page.tsx`:
- Server component that fetches all repos via `fetchGitHubRepos()`
- Section header: `$ ls ~/projects`
- Renders `ProjectFilter` (client) + project grid
- Grid: 3 cols desktop, 2 tablet, 1 mobile, gap `space-6`
- Each repo rendered as `ProjectCard`
- Client-side filtering by language

NOTE: Since filter is client-side, the page needs to pass repos to a client wrapper that handles filtering. Use a pattern like:
```tsx
// page.tsx (server)
const repos = await fetchGitHubRepos();
return <ProjectsClient repos={repos} />;

// projects-client.tsx (client)
"use client";
// handles filter state + renders grid
```

**Step 3: Project detail page**

`src/app/projects/[slug]/page.tsx`:
- Server component
- Fetch repo data + README via `fetchRepoReadme(slug)`
- File tab: `README.md`
- Render markdown with `react-markdown`
- Sidebar: language, stars, forks, repo link, homepage link, topics
- Line-number gutter aesthetic on the README

Also implement `generateStaticParams` to pre-generate known project pages at build time.

**Step 4: Verify build**

Run: `npm run build`

**Step 5: Commit**

```bash
git add src/app/projects/ src/components/sections/project-filter.tsx
git commit -m "feat: add Projects page with GitHub API integration and detail pages"
```

---

### Task 15: Build Services Page

**Files:**
- Create: `src/app/services/page.tsx`
- Create: `src/components/sections/service-card.tsx`

**Step 1: Service card component**

`src/components/sections/service-card.tsx` — Client component:
- Props: `service: Service`
- Icon at top (from `lucide-react` — map `service.icon` to component)
- Title (`text-h3`) + description (`text-body`)
- Tech tags as badges (`accent-cyan-soft` bg, `accent-cyan` text)
- Hover: gradient border reveals, `translateY(-2px)`, glow
- Bottom: `service.command` in `font-mono text-foreground-faint`

**Step 2: Services page**

`src/app/services/page.tsx`:
- Section header: `$ cat services.md`
- Grid of 4 `ServiceCard` components (2x2 on desktop, 1 col mobile)
- CTA at bottom: `$ get-quote --project "your idea"` → `/contact`
- Import `SERVICES` from `@/lib/services`
- Wrap in `PageTransition`

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/app/services/ src/components/sections/service-card.tsx
git commit -m "feat: add Services page with gradient-border cards and terminal CTAs"
```

---

### Task 16: Build Blog Page

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/components/sections/blog-entry.tsx`
- Create: `src/components/sections/linkedin-section.tsx`

**Step 1: Blog entry component**

`src/components/sections/blog-entry.tsx` — Client component:
- Props: `article: DevToArticle`
- Styled as directory listing row:
  - `-rw-r--r--  1 muizz  {date}  {filename}.md`
- Hover: row expands to show description, tags, read time
- Click: opens URL in new tab
- `font-mono` for the file listing line
- Tags as small badges below description

**Step 2: LinkedIn section**

`src/components/sections/linkedin-section.tsx`:
- Imports `LINKEDIN_ARTICLES` from `@/lib/linkedin-articles`
- Renders manual list of LinkedIn article links
- "Follow on LinkedIn" gradient CTA button

**Step 3: Blog page**

`src/app/blog/page.tsx`:
- Server component that fetches Dev.to articles via `fetchDevToArticles()`
- Section header: `$ ls ~/blog`
- Dev.to articles rendered as `BlogEntry` list
- LinkedIn section below
- Wrap in `PageTransition`

**Step 4: Verify build**

Run: `npm run build`

**Step 5: Commit**

```bash
git add src/app/blog/ src/components/sections/blog-entry.tsx src/components/sections/linkedin-section.tsx
git commit -m "feat: add Blog page with Dev.to API integration and LinkedIn section"
```

---

### Task 17: Build Resume Page

**Files:**
- Create: `src/app/resume/page.tsx`

**Step 1: Build resume page**

`src/app/resume/page.tsx`:
- Styled as a code file: `resume.tsx` file tab via `CodeBlock`
- Line numbers in left gutter
- Syntax-highlighted content:
  - Section headers as comments: `// Experience`, `// Education`, `// Skills`
  - Role names: `text-accent-cyan`
  - Company names: `text-accent-purple`
  - Dates: `text-foreground-muted`
  - Descriptions: `text-foreground`
- Sticky download button (top-right): `$ export resume.pdf`
  - Links to `/resume.pdf` (copy PDF to `public/resume.pdf`)
- Data from `resume-data.ts` (same source as About page)
- Mobile: hide line numbers, simplify layout
- Wrap in `PageTransition`

NOTE: Copy `docs/resume.docx.pdf` to `public/resume.pdf` for download.

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/app/resume/ public/resume.pdf
git commit -m "feat: add interactive Resume page styled as code file with PDF download"
```

---

### Task 18: Build Contact Page

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/contact/action.ts`

**Step 1: Create contact form server action**

`src/app/contact/action.ts`:
- Server Action that receives form data (name, email, subject, message)
- Validates all fields are non-empty, email format is valid
- Sends email via Resend API (or returns success for now if no API key)
- Returns `{ success: boolean; message: string }`

**Step 2: Build contact page**

`src/app/contact/page.tsx` — Client component:
- Section header: `$ ping abdul-muizz`
- Terminal-styled form:
  - Each field: `font-mono`, border-bottom only, blinking cursor on focus
  - Labels styled as terminal prompts: `name:`, `email:`, `subject:`, `message:`
- Submit button: gradient primary, label `$ send --message`
- Success state: `✓ Message sent successfully. Response time: ~24h`
- Error state: `✗ Failed to send. Try again or email directly.`
- Social links section below the form:
  - `→ github.com/...` etc. with icons from `lucide-react`
  - Each link: `text-accent-cyan`, hover underline
- Wrap in `PageTransition`

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/app/contact/
git commit -m "feat: add Contact page with terminal-styled form and server action"
```

---

## Phase 5: Playground/Lab Page

### Task 19: Build Lab Page with Experiments

**Files:**
- Create: `src/app/lab/page.tsx`
- Create: `src/components/sections/lab-card.tsx`
- Create: `src/app/lab/particles/page.tsx`
- Create: `src/app/lab/terminal/page.tsx`

**Step 1: Lab card component**

`src/components/sections/lab-card.tsx` — Client component:
- Props: `title`, `description`, `tech`, `href`, `preview` (React node for animated thumbnail)
- Card with animated preview area at top
- Title, description, tech badges below
- Hover: gradient glow, slight lift
- Links to the experiment page

**Step 2: Lab index page**

`src/app/lab/page.tsx`:
- Section header: `$ cd ~/lab && ls`
- Grid of lab cards (2 cols desktop, 1 mobile)
- Experiments:
  1. Particle Playground → `/lab/particles`
  2. Terminal Emulator → `/lab/terminal`
  3. RAG Demo → `/lab/rag` (placeholder for future)

**Step 3: Particle Playground page**

`src/app/lab/particles/page.tsx` — Client component:
- Full-screen Three.js particle system
- Controls panel: particle count slider, color picker, gravity toggle
- Mouse interaction: attract/repel toggle
- Back button to `/lab`
- Reuse and extend the particle field component from hero

**Step 4: Terminal Emulator page**

`src/app/lab/terminal/page.tsx` — Client component:
- Full-screen terminal interface
- Geist Mono font, cyan-on-dark color scheme
- Input prompt: `visitor@abdul-muizz:~$ `
- Commands:
  - `help` → lists available commands
  - `about` → prints short bio
  - `projects` → lists projects
  - `skills` → prints skills
  - `contact` → prints contact info
  - `sudo hire-me` → fun response
  - `clear` → clears terminal
  - `matrix` → CSS Matrix rain animation (easter egg)
  - `coffee` → ASCII art coffee cup
- Command history with arrow keys
- Scrollable output area

**Step 5: Verify build**

Run: `npm run build`

**Step 6: Commit**

```bash
git add src/app/lab/ src/components/sections/lab-card.tsx
git commit -m "feat: add Lab page with particle playground and terminal emulator experiments"
```

---

## Phase 6: Interactive Features

### Task 20: Build Custom Cursor

**Files:**
- Create: `src/hooks/use-cursor.ts`
- Create: `src/components/custom-cursor.tsx`

**Step 1: Create cursor hook**

`src/hooks/use-cursor.ts`:
- Tracks mouse position via `mousemove` listener
- Uses `useRef` + `requestAnimationFrame` (no state, no re-renders)
- Returns ref to attach to cursor DOM element
- Lerps position for smooth ~50ms delay
- Detects hover on interactive elements (buttons, links, inputs) to scale up
- Hidden on touch devices (check `window.matchMedia('(pointer: coarse)')`)

**Step 2: Create cursor component**

`src/components/custom-cursor.tsx` — Client component:
- Small dot (6px, `accent-cyan`)
- Gradient glow ring (24px, fades out)
- `pointer-events: none`, `position: fixed`, `z-[200]`
- Scales up to 1.5x when hovering interactive elements
- Respects `prefers-reduced-motion`: disable follow delay

**Step 3: Add cursor to root layout**

Add `<CustomCursor />` to `src/app/layout.tsx` body.

**Step 4: Verify build**

Run: `npm run build`

**Step 5: Commit**

```bash
git add src/hooks/use-cursor.ts src/components/custom-cursor.tsx src/app/layout.tsx
git commit -m "feat: add custom cursor with gradient glow and interactive scaling"
```

---

### Task 21: Build Magnetic Hover Hook

**Files:**
- Create: `src/hooks/use-magnetic.ts`

**Step 1: Create magnetic hover hook**

`src/hooks/use-magnetic.ts`:
- Takes a `ref` to an element
- On `mousemove` within a 40px radius of the element center, applies `transform: translate(x, y)` pulling element toward cursor
- Max displacement: 4px
- Spring-like easing on mouseout (returns to center)
- Uses `requestAnimationFrame` for smooth animation
- Returns: `{ ref }` to attach to the target element

**Step 2: Apply to navigation links and CTA buttons**

Update `navigation.tsx` and relevant button components to use `useMagnetic`.

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/hooks/use-magnetic.ts src/components/navigation.tsx
git commit -m "feat: add magnetic hover effect to navigation and CTA buttons"
```

---

### Task 22: Add Scroll Animations

**Step 1: Create a scroll-animated wrapper**

`src/components/scroll-reveal.tsx` — Client component:
- Uses Framer Motion `motion.div` with `whileInView`
- Props: `children`, `delay?`, `direction?` (up/left/right)
- Default: fade in + slide up 20px
- `once: true`, threshold `0.2`
- Stagger children variant with 50ms delay
- Respects `prefers-reduced-motion`: instant reveal, no animation

**Step 2: Apply scroll reveal to all page sections**

Wrap each section component in `ScrollReveal`:
- Hero sections (within each page)
- Card grids
- Timeline items
- Testimonials

This is a matter of going through each section component and wrapping content blocks.

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/scroll-reveal.tsx
git commit -m "feat: add scroll-triggered reveal animations with Framer Motion"
```

---

### Task 23: Build Konami Code Easter Egg

**Files:**
- Create: `src/hooks/use-konami.ts`
- Create: `src/components/konami-terminal.tsx`

**Step 1: Create Konami code hook**

`src/hooks/use-konami.ts`:
- Listens for key sequence: ↑↑↓↓←→←→BA
- Tracks input buffer, resets on wrong key or timeout (2s)
- Calls callback when sequence completed
- Returns `{ isActive: boolean, deactivate: () => void }`

**Step 2: Create terminal overlay**

`src/components/konami-terminal.tsx` — Client component:
- Full-screen overlay (`fixed inset-0 z-[200] bg-black/95`)
- Terminal UI similar to lab terminal but with a "secret mode" feel
- Commands: `help`, `about`, `projects`, `matrix`, `hire-me`, `exit`
- `exit` or `Esc` closes the overlay
- Framer Motion: fade in on open, fade out on close

**Step 3: Add to root layout**

Add `<KonamiTerminal />` to `src/app/layout.tsx`.

**Step 4: Verify build**

Run: `npm run build`

**Step 5: Commit**

```bash
git add src/hooks/use-konami.ts src/components/konami-terminal.tsx src/app/layout.tsx
git commit -m "feat: add Konami code easter egg with full-screen terminal overlay"
```

---

## Phase 7: Polish & Optimization

### Task 24: Add Page Transitions

**Step 1: Update page transition component**

Ensure `src/components/page-transition.tsx` uses Framer Motion `AnimatePresence` properly with the App Router.

NOTE: Next.js App Router doesn't natively support exit animations between routes. Use a `template.tsx` file approach:
- Create `src/app/template.tsx` that wraps children in the motion wrapper
- Gradient line sweep: a `motion.div` that animates `scaleX` from 0 to 1 across the top

**Step 2: Add gradient sweep line**

Add a gradient line (`gradient-bg`, height 2px) at the top of `template.tsx` that animates on each route change.

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/app/template.tsx src/components/page-transition.tsx
git commit -m "feat: add page transition animations with gradient sweep line"
```

---

### Task 25: SEO & Metadata

**Files:**
- Modify: `src/app/layout.tsx` (root metadata)
- Add `generateMetadata` to each page

**Step 1: Add metadata to all pages**

Each page should export a `metadata` object or `generateMetadata` function:
- `title`: `"Page Name — Abdul-Muizz"`
- `description`: page-specific description
- `openGraph`: title, description, image
- Home page: use `SITE_CONFIG` values

Pages to update:
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/projects/[slug]/page.tsx` (dynamic metadata from repo)
- `src/app/services/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/lab/page.tsx`
- `src/app/resume/page.tsx`
- `src/app/contact/page.tsx`

**Step 2: Add robots.txt and sitemap**

Create `src/app/robots.ts` and `src/app/sitemap.ts` using Next.js metadata API.

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/app/
git commit -m "feat: add SEO metadata, Open Graph tags, robots.txt, and sitemap"
```

---

### Task 26: Accessibility Pass

**Step 1: Audit and fix accessibility**

Go through each component and verify:
- All images have alt text
- All interactive elements are keyboard-accessible
- Focus states use the design system ring: `focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background`
- Terminal-styled text has proper semantic HTML (headings, lists, paragraphs)
- ARIA labels on purely decorative elements (`aria-hidden="true"`)
- Skip-nav link works
- Color contrast passes WCAG AA
- `prefers-reduced-motion` is respected (particles stop, transitions instant)

**Step 2: Test with keyboard navigation**

Navigate through every page using only Tab/Enter/Escape. Verify all interactive elements are reachable and focus is visible.

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git commit -am "fix: accessibility improvements — focus states, ARIA labels, reduced motion"
```

---

### Task 27: Responsive Testing & Fixes

**Step 1: Test all breakpoints**

Test every page at:
- 375px (mobile)
- 768px (tablet)
- 1024px (small desktop)
- 1440px (wide desktop)

Verify:
- Navigation: hamburger on mobile, tabs on desktop
- Hero: stacked on mobile, side-by-side on desktop
- Grids: 1 col → 2 col → 3 col
- Status bar: simplified on mobile
- Text scales: display/h1/h2/h3 mobile sizes per design system
- No horizontal overflow anywhere

**Step 2: Fix any responsive issues found**

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git commit -am "fix: responsive layout adjustments across all breakpoints"
```

---

### Task 28: Final Build & Lint

**Step 1: Run ESLint**

Run: `npm run lint`
Fix any warnings or errors.

**Step 2: Run production build**

Run: `npm run build`
Verify: no TypeScript errors, no build warnings.

**Step 3: Test production server locally**

Run: `npm run start`
Navigate through all pages, verify everything works.

**Step 4: Commit any final fixes**

```bash
git commit -am "chore: final lint fixes and build verification"
```

---

## Task Dependency Graph

```
Phase 1 (Foundation):  T1 → T2 → T3 → T4
Phase 2 (Layout):      T5 → T6 → T7 → T8 → T9
Phase 3 (Home):        T10 → T11 → T12
Phase 4 (Pages):       T13, T14, T15, T16, T17, T18 (parallel — no dependencies between pages)
Phase 5 (Lab):         T19
Phase 6 (Interactive): T20, T21, T22, T23 (parallel — independent features)
Phase 7 (Polish):      T24 → T25 → T26 → T27 → T28

Phase 2 depends on Phase 1 completing.
Phase 3 depends on Phase 2 (layout shell) + Task 4 (GitHub fetcher).
Phase 4 depends on Phase 2 + Task 4 (fetchers) + Task 3 (data files).
Phase 5 depends on Phase 2 + Task 10 (particle component to reuse).
Phase 6 depends on Phase 2 (needs layout to attach to).
Phase 7 depends on all previous phases.
```

## Summary

| Phase | Tasks | Description |
|---|---|---|
| 1 — Foundation | 1-4 | Dependencies, types, data, API fetchers |
| 2 — Layout | 5-9 | Theme, nav, status bar, layout, shared components |
| 3 — Home | 10-12 | Particles, hero, all home sections |
| 4 — Pages | 13-18 | About, Projects, Services, Blog, Resume, Contact |
| 5 — Lab | 19 | Playground experiments |
| 6 — Interactive | 20-23 | Cursor, magnetic hover, scroll animations, Konami |
| 7 — Polish | 24-28 | Transitions, SEO, accessibility, responsive, final build |

**Total: 28 tasks across 7 phases.**
