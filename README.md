# Abdul-Muizz — Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, and **Three.js**. Features an interactive 3D particle field, terminal-style UI, custom cursor, Konami code easter egg, and comprehensive test coverage.

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 16 (App Router, React Compiler) |
| **UI** | React 19, Tailwind CSS 4, ShadCN/UI, Framer Motion |
| **3D** | Three.js, React Three Fiber, Drei |
| **Icons** | Lucide React |
| **Fonts** | Geist Sans, Geist Mono, Space Grotesk |
| **Email** | Resend |
| **Skeleton Loading** | Boneyard |
| **Testing** | Vitest, React Testing Library |
| **CI** | GitHub Actions |
| **Type Safety** | TypeScript 5 (strict mode) |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero with 3D particle field, skills showcase, tech stack, featured projects, terminal emulator, CTA |
| `/about` | Bio, experience timeline, education, volunteer experience, values |
| `/projects` | GitHub-integrated project gallery with language filtering |
| `/projects/[slug]` | Project detail with README rendering, stats, and live demo links |
| `/resume` | Resume rendered as a styled code block with PDF export |
| `/contact` | Contact form powered by Resend (Server Action) |

## Features

- **3D Particle Field** — 200 WebGL particles with gradient colors (cyan/blue/purple), velocity-based physics, mouse repulsion, ambient drift, and connection lines
- **Skills Showcase** — Six domain cards (AI/ML, Frontend, Backend, Automation, Databases, DevOps) with technology tags
- **Interactive Terminal** — Embedded terminal emulator on the home page with commands (`help`, `about`, `projects`, `skills`, `contact`, `coffee`)
- **Terminal Typer** — Animated terminal-style introduction (`whoami`, `role`, `location`)
- **Custom Cursor** — Animated cyan dot + ring on pointer devices, hidden on mobile/touch
- **Konami Code Easter Egg** — Type `↑↑↓↓←→←→BA` to unlock a secret terminal with Matrix rain effect
- **Dark Mode Only** — Consistent dark theme throughout the site
- **GitHub Integration** — Projects fetched live from GitHub API with ISR (1hr revalidation), README rendering, deployed links
- **Boneyard Skeleton Loading** — Shimmer-animated skeleton screens for loading states
- **Server-First** — Server Components by default, client components only where needed
- **Responsive** — Mobile-first design with Tailwind breakpoints across all pages
- **SEO** — Dynamic metadata, sitemap, and robots.txt generation
- **Page Transitions** — Gradient sweep + content fade-in on route changes
- **Test Coverage** — 235 tests across 54 files, 99%+ line coverage

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables (optional)

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | Higher GitHub API rate limits |
| `RESEND_API_KEY` | Contact form email delivery |

Both are optional — the site works without them with graceful degradation.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm test` | Run tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Project Structure

```
src/
├── app/                        # Next.js App Router pages and layouts
│   ├── layout.tsx              # Root layout (nav, cursor, status bar, konami)
│   ├── page.tsx                # Home (hero, skills, stack, projects, terminal, CTA)
│   ├── template.tsx            # Page transition animations
│   ├── globals.css             # Global styles (Tailwind, dark-only theme)
│   ├── robots.ts               # Robots.txt generation
│   ├── sitemap.ts              # Sitemap generation
│   ├── about/page.tsx          # Bio, experience, education, volunteer, values
│   ├── contact/                # Contact form (server action + client component)
│   ├── projects/               # GitHub project gallery + [slug] detail
│   └── resume/page.tsx         # Resume as styled code block
│
├── components/
│   ├── ui/                     # ShadCN/UI primitives (button.tsx)
│   ├── sections/               # Page sections
│   │   ├── hero.tsx            # Hero with particle field + terminal typer
│   │   ├── skills-showcase.tsx # Skills domain cards with tech tags
│   │   ├── featured-projects.tsx
│   │   ├── home-terminal.tsx   # Interactive terminal emulator
│   │   ├── home-cta.tsx
│   │   ├── uses-stack.tsx      # Tech stack in package.json format
│   │   ├── experience-timeline.tsx
│   │   ├── education-timeline.tsx
│   │   ├── volunteer-timeline.tsx
│   │   ├── values.tsx
│   │   └── project-filter.tsx
│   ├── three/                  # Three.js/R3F components
│   │   └── particle-field.tsx  # 200-particle field with gradient colors
│   ├── code-block.tsx          # macOS-style code display
│   ├── custom-cursor.tsx       # Custom pointer cursor
│   ├── konami-terminal.tsx     # Easter egg terminal with Matrix rain
│   ├── navigation.tsx          # Main navigation bar
│   ├── project-card.tsx        # Project preview card
│   ├── section-header.tsx      # Terminal-style section title
│   ├── status-bar.tsx          # Bottom IDE-style status bar
│   └── terminal-typer.tsx      # Terminal-style text animation
│
├── hooks/
│   ├── use-cursor.ts           # Custom cursor position tracking + lerp
│   └── use-konami.ts           # Konami code sequence detection
│
├── lib/
│   ├── boneyard.ts             # Boneyard skeleton loading config
│   ├── constants.ts            # App constants (site URL, nav links, etc.)
│   ├── github.ts               # GitHub API integration (repos + README)
│   ├── resume-data.ts          # Resume/CV data (experience, education, skills)
│   └── utils.ts                # Utility functions (cn, class merging)
│
├── types/
│   └── github.ts               # GitHub API types
│
└── __tests__/                  # Test suite (54 files, 235 tests)
    ├── setup.ts                # Test environment setup
    ├── app/                    # Page-level tests
    ├── components/             # Component tests
    ├── hooks/                  # Hook tests
    └── lib/                    # Library/utility tests
```

## Architecture

- **Server Components** by default — client components only for interactivity
- **App Router** — file-based routing with layouts, templates, and Server Actions
- **Data fetching** — GitHub API with ISR caching (1hr), static data files for resume/skills
- **Styling** — Tailwind CSS 4 utilities + ShadCN/UI + Framer Motion + custom CSS utilities (gradient-text, gradient-bg, glass)
- **3D** — React Three Fiber with Suspense boundaries and velocity-based particle physics
- **Testing** — Vitest + React Testing Library with 99%+ line coverage
- **CI/CD** — GitHub Actions runs lint, build, and tests on push to `dev` and PRs

## CI

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on:
- Push to `dev`
- Pull requests targeting `dev`

The pipeline runs: **lint → build → tests**
