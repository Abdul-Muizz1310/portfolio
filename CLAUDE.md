# Portfolio Project — CLAUDE.md

## Project Overview

Personal portfolio website for Abdul-Muizz built with Next.js 16, React 19, and modern web technologies. Features an interactive 3D particle field with Three.js, terminal-style UI throughout, dark-only theme, and comprehensive test coverage (235 tests, 99%+ line coverage).

## Tech Stack

| Technology | Purpose | Docs |
|---|---|---|
| **Next.js 16** (App Router) | Framework, SSR, routing | https://nextjs.org/docs |
| **React 19** | UI library (with React Compiler) | https://react.dev/reference/react |
| **TypeScript 5** | Type safety (strict mode) | https://www.typescriptlang.org/docs |
| **Tailwind CSS 4** | Utility-first styling | https://tailwindcss.com/docs |
| **ShadCN/UI** | Component library | https://ui.shadcn.com/docs |
| **Three.js / R3F** | 3D graphics | https://r3f.docs.pmnd.rs/getting-started/introduction |
| **Framer Motion** | Animations | https://motion.dev/docs |
| **Lucide React** | Icons | https://lucide.dev/docs |
| **Resend** | Email (contact form) | https://resend.com/docs |
| **Boneyard** | Skeleton loading | https://boneyard.vercel.app/overview |
| **Vitest** | Unit/integration testing | https://vitest.dev |
| **React Testing Library** | Component testing | https://testing-library.com/docs/react-testing-library/intro |

## Documentation Lookup

**When unsure about any API, pattern, or feature — ALWAYS consult the official docs before guessing.**

Use the `context7` MCP tool (`resolve-library-id` then `query-docs`), `WebFetch`, or `WebSearch` to look up:

- **Next.js**: https://nextjs.org/docs — App Router, Server Components, Server Actions, metadata, routing
- **Three.js / R3F**: https://r3f.docs.pmnd.rs — Canvas, meshes, materials, hooks
- **ShadCN**: https://ui.shadcn.com/docs — component installation, theming, variants
- **Tailwind v4**: https://tailwindcss.com/docs — utilities, theme config
- **Framer Motion**: https://motion.dev/docs — motion components, variants, gestures
- **Vitest**: https://vitest.dev — test configuration, mocking, coverage

Never hallucinate APIs. If you don't know the exact API, look it up.

## Architecture

### Server-First Approach

- Pages use Next.js App Router with Server Components by default
- Client components (`"use client"`) only for interactivity (state, effects, event handlers, browser APIs)
- Server Actions for mutations (e.g., contact form in `src/app/contact/action.ts`)
- No API routes unless needed for external consumers

### Dark Mode Only

The site uses a dark-only theme. There is no light mode toggle. The `<html>` element has `className="dark"` hardcoded in `src/app/layout.tsx`. All CSS variables in `globals.css` use dark theme values directly on `:root`.

### Data Sources

| Source | Integration | Used In |
|---|---|---|
| GitHub API | `src/lib/github.ts` | Projects gallery, project detail pages |
| Resume Data | `src/lib/resume-data.ts` | About, Resume pages, skills |

### Interactive Features

| Feature | Files |
|---|---|
| 3D Particle Field | `src/components/three/particle-field.tsx` |
| Skills Showcase | `src/components/sections/skills-showcase.tsx` |
| Interactive Terminal | `src/components/sections/home-terminal.tsx` |
| Custom Cursor | `src/hooks/use-cursor.ts` → `src/components/custom-cursor.tsx` |
| Konami Code Easter Egg | `src/hooks/use-konami.ts` → `src/components/konami-terminal.tsx` |
| Terminal Typer | `src/components/terminal-typer.tsx` |
| Skeleton Loading | `src/lib/boneyard.ts` → `src/app/projects/loading.tsx` |

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
│   ├── resume-data.ts          # Resume/CV data (experience, education, skills, volunteer)
│   └── utils.ts                # Utility functions (cn, class merging)
│
├── types/
│   └── github.ts               # GitHub API types
│
└── __tests__/                  # Test suite (54 files, 235 tests)
    ├── setup.ts                # Test environment setup (mocks for IntersectionObserver, matchMedia, ResizeObserver)
    ├── app/                    # Page-level tests
    ├── components/             # Component tests
    ├── hooks/                  # Hook tests
    └── lib/                    # Library/utility tests
```

## Path Alias

`@/*` maps to `./src/*` — always use `@/` imports instead of relative paths.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm test` | Run tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | Optional | Higher GitHub API rate limits (60/hr without) |
| `RESEND_API_KEY` | Optional | Contact form email delivery (shows fallback message without) |

## Code Conventions

### General
- TypeScript strict mode — no `any` types, always define interfaces/types
- Use `@/` path alias for all imports
- Prefer Server Components by default; only use `"use client"` when needed
- Keep components small and focused — extract logic into custom hooks
- No default exports except for pages/layouts (Next.js requirement)

### Styling
- Tailwind CSS utility classes only — no inline styles, no CSS modules
- Use ShadCN/UI components as the base — extend with Tailwind, don't rewrite
- Mobile-first responsive design (`sm:`, `md:`, `lg:`, `xl:`)
- Dark-only theme — all CSS variables set on `:root` with dark values
- Custom utilities: `gradient-text`, `gradient-bg`, `gradient-border`, `glass`
- Animations: prefer Tailwind `animate-*` for simple, Framer Motion for complex

### State Management
- **Local state**: `useState` / `useReducer` for component-scoped state
- **Server state**: Next.js Server Components + `fetch` with ISR caching
- **URL state**: `useSearchParams` for filterable/shareable state
- Never put server-fetchable data in global state

### Three.js / R3F
- All 3D components go in `src/components/three/`
- Wrap `<Canvas>` in a client component with `"use client"`
- Use `@react-three/fiber` hooks (`useFrame`, `useThree`) — not raw Three.js
- Use `useRef` for mutable data in animation loops (not `useMemo`)
- Always add `Suspense` fallbacks around 3D scenes

### Next.js Patterns
- App Router only — no Pages Router
- Use `loading.tsx` with Boneyard `<Skeleton>` for streaming/Suspense
- Use `error.tsx` for error boundaries
- Server Actions for mutations — no API routes unless needed for external consumers
- Metadata API for SEO (`generateMetadata`)
- Image optimization with `next/image`
- Font optimization with `next/font`

### Testing
- Vitest + React Testing Library + jsdom
- Test files in `src/__tests__/` mirroring source structure
- Mock external dependencies (next/navigation, framer-motion, next/image, next/link)
- Server components tested by calling the async function directly
- Hooks tested with `renderHook` from `@testing-library/react`
- Coverage target: 99%+ lines, 98%+ statements

## Testing

The project has comprehensive test coverage:

- **54 test files** with **235 tests**
- **99.8% line coverage**, **98.87% statement coverage**, **99.39% function coverage**
- Tests cover: utilities, data models, API integrations, all components, all pages, hooks
- Run with `npm test` or `npm run test:coverage`

### Test Configuration

- Config: `vitest.config.ts`
- Setup: `src/__tests__/setup.ts` (mocks IntersectionObserver, matchMedia, ResizeObserver)
- Coverage excludes: `src/__tests__/`, loading/error/layout files, Three.js components, type-only files

## CI/CD

GitHub Actions workflow at `.github/workflows/ci.yml`:
- **Triggers**: push to `dev`, PRs targeting `dev`
- **Pipeline**: lint → build → tests
- **Node**: v20 with npm cache

## File Lookup & Search Permissions

Claude has full access to read, search, and explore any file in this repository. When investigating issues or implementing features:

- **Read any file** in the repo without restriction
- **Search** with `Grep`, `Glob`, or `Agent` (Explore) across the entire codebase
- **Web search** and **web fetch** for documentation lookups on any domain
- **Run** `npm run build`, `npm run lint`, `npm test`, and other project scripts
- **Use MCP tools**: context7 (docs), playwright (browser testing)

## Skills Reference

This project has **15 installed skills** in `.agents/skills/`. Use the right skill for the right task.

### Frontend & UI Skills

| Skill | When to Use |
|---|---|
| **`frontend-design`** (built-in) | Creating new pages, sections, or visual components. ALWAYS use for any UI work. |
| **`ui-ux-pro-max`** | Design system decisions — color palettes, typography, spacing, style selection. |
| **`frontend-responsive-design-standards`** | Ensuring responsive layouts. Breakpoints, fluid layouts, touch targets. |
| **`web-design-guidelines`** | Reviewing UI code for Vercel's Web Interface Guidelines compliance. UI audits. |

### React & Next.js Skills

| Skill | When to Use |
|---|---|
| **`vercel-react-best-practices`** | Performance optimization — waterfalls, bundle size, re-renders, memoization. |
| **`nextjs-app-router-patterns`** | Server/Client Components, streaming, parallel routes, data fetching, caching. |
| **`react-components`** | Converting designs to modular React components with proper architecture. |
| **`react-state-management`** | State patterns, server vs client state decisions. |

### Remotion & 3D Skills

| Skill | When to Use |
|---|---|
| **`remotion-best-practices`** | Any Remotion video work — compositions, animations, Three.js in video, audio, captions. |

### Backend Skills

| Skill | When to Use |
|---|---|
| **`backend-patterns`** | API routes, middleware, database patterns in Next.js. |
| **`backend-dev-guidelines`** | Node.js/Express microservice patterns (if project expands). |
| **`backend-development`** | General backend architecture and security. |
| **`nextjs-supabase-auth`** | If/when Supabase auth is added. |

### Template & Meta Skills

| Skill | When to Use |
|---|---|
| **`next-forge`** | Production-grade Next.js SaaS template patterns (Turborepo, monorepo). |
| **`find-skills`** | Discovering and installing new skills from the ecosystem. |

## Skill Usage Rules

1. **Before building any UI component** → invoke `frontend-design` skill
2. **Before making design system choices** → invoke `ui-ux-pro-max` skill
3. **Before any Remotion work** → invoke `remotion-best-practices` skill
4. **Before optimizing performance** → invoke `vercel-react-best-practices` skill
5. **Before adding/changing state** → invoke `react-state-management` skill
6. **Before Next.js architecture decisions** → invoke `nextjs-app-router-patterns` skill
7. **When building responsive layouts** → invoke `frontend-responsive-design-standards` skill
8. **When unsure about an API or pattern** → use `context7` MCP, `WebFetch`, or `WebSearch` to check docs
9. **When auditing UI quality** → invoke `web-design-guidelines` skill

## Quality Checklist

Before marking any task as complete:
- [ ] TypeScript compiles with no errors (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] All tests pass (`npm test`)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Server Components used where possible
- [ ] No unnecessary `"use client"` directives
- [ ] Accessibility: semantic HTML, ARIA labels, keyboard navigation
- [ ] Performance: no layout shifts, optimized images, minimal bundle
