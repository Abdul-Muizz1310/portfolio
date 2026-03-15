# Abdul-Muizz — Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, and **Three.js**. Features interactive 3D particle fields, a terminal-style hero, custom cursor, Konami code easter egg, and a full experiments lab.

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 16 (App Router, React Compiler) |
| **UI** | React 19, Tailwind CSS 4, ShadCN/UI, Framer Motion |
| **3D** | Three.js, React Three Fiber, Drei |
| **State** | Zustand |
| **Icons** | Lucide React |
| **Fonts** | Geist Sans, Geist Mono, Space Grotesk |
| **Email** | Resend |
| **Type Safety** | TypeScript 5 (strict mode) |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero with 3D particle field, tech stack, featured projects, testimonials, CTA |
| `/about` | Bio, experience timeline, education, values |
| `/projects` | GitHub-integrated project gallery with tag filtering |
| `/projects/[slug]` | Individual project detail page |
| `/resume` | Resume rendered as a styled code block |
| `/blog` | Articles fetched from Dev.to + LinkedIn |
| `/services` | AI/ML, Full-Stack, Automation, Consulting offerings |
| `/contact` | Contact form powered by Resend (Server Action) |
| `/lab` | Experiments hub |
| `/lab/ai-chat` | AI chat playground |
| `/lab/particles` | 3D particle playground |
| `/lab/terminal` | Terminal simulator |
| `/lab/scraper` | Web scraper visualizer |
| `/lab/api` | API playground |
| `/lab/frontend` | Frontend showcase |

## Features

- **3D Particle Field** — WebGL particles with mouse-reactive physics on the hero section
- **Terminal Typer** — Animated terminal-style introduction (`whoami`, `role`, `location`)
- **Custom Cursor** — Animated cyan dot + ring on pointer devices, hidden on mobile
- **Konami Code Easter Egg** — Type `↑↑↓↓←→←→BA` to unlock a secret terminal with Matrix rain
- **Dark/Light Theme** — System-aware with manual toggle via Zustand
- **GitHub Integration** — Projects fetched live from GitHub API with repo metadata
- **Dev.to Integration** — Blog posts fetched from Dev.to API
- **Server-First** — Server Components by default, client components only where needed
- **Responsive** — Mobile-first design with Tailwind breakpoints across all pages
- **SEO** — Dynamic metadata, sitemap, and robots.txt generation

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── about/            # About page
│   ├── blog/             # Blog page
│   ├── contact/          # Contact form (server action)
│   ├── lab/              # Experiments (6 sub-pages)
│   ├── projects/         # Projects gallery + [slug] detail
│   ├── resume/           # Resume page
│   └── services/         # Services page
├── components/
│   ├── ui/               # ShadCN/UI primitives
│   ├── sections/         # Page sections (hero, projects, testimonials, etc.)
│   └── three/            # Three.js/R3F 3D components
├── hooks/                # Custom React hooks (cursor, konami)
├── lib/                  # Utilities, API integrations, data
├── stores/               # Zustand stores (theme)
└── types/                # Shared TypeScript types
```

## Architecture

- **Server Components** by default — client components only for interactivity
- **App Router** — file-based routing with layouts, templates, and Server Actions
- **Data fetching** — GitHub API, Dev.to API, LinkedIn articles, static data files
- **State** — Zustand for global (theme), useState for local, useSearchParams for URL state
- **Styling** — Tailwind CSS 4 utilities + ShadCN/UI components + Framer Motion animations
- **3D** — React Three Fiber with Suspense boundaries for progressive loading
