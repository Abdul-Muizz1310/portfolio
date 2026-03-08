# Abdul-Muizz — Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, and **Three.js**. Features interactive 3D particle fields, a terminal-style hero, and a full experiments lab.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Framework | Next.js 16 (App Router, React Compiler) |
| UI | React 19, Tailwind CSS 4, ShadCN/UI, Framer Motion |
| 3D | Three.js, React Three Fiber, Drei |
| State | Zustand |
| Fonts | Geist Sans, Geist Mono, Space Grotesk |
| Email | Resend |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero with particle field, tech stack, featured projects, testimonials |
| `/about` | Bio, experience timeline, education, values |
| `/projects` | GitHub-integrated project gallery with filtering |
| `/resume` | Resume rendered as a styled code block |
| `/blog` | Articles fetched from Dev.to |
| `/services` | AI/ML, Full-Stack, Automation, Consulting |
| `/contact` | Contact form powered by Resend |
| `/lab/*` | Interactive experiments (AI chat, particles, terminal, scraper, API playground, frontend showcase) |

## Features

- **3D Particle Field** — WebGL particles with mouse-reactive physics on the hero
- **Terminal Typer** — Animated terminal-style introduction (`whoami`, `role`, `location`)
- **Custom Cursor** — Animated cyan dot + ring on pointer devices
- **Konami Code Easter Egg** — Type `↑↑↓↓←→←→BA` to unlock a secret terminal with Matrix rain
- **Dark/Light Theme** — System-aware with manual toggle
- **Responsive** — Mobile-first design across all pages

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
├── app/              # Pages and layouts (App Router)
├── components/       # React components
│   ├── ui/           # ShadCN/UI primitives
│   ├── sections/     # Page sections (hero, projects, etc.)
│   └── three/        # Three.js/R3F components
├── hooks/            # Custom React hooks
├── stores/           # Zustand stores
├── lib/              # Utilities, constants, data
└── types/            # Shared TypeScript types
```
