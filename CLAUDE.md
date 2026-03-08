# Portfolio Project - CLAUDE.md

## Project Overview

Personal portfolio website built with Next.js 16, React 19, and modern web technologies. Features programmatic video generation with Remotion, 3D visuals with Three.js, and polished UI/UX.

## Tech Stack

| Technology | Purpose | Docs |
|---|---|---|
| **Next.js 16** (App Router) | Framework, SSR, routing | https://nextjs.org/docs |
| **React 19** | UI library (with React Compiler) | https://react.dev/reference/react |
| **TypeScript 5** | Type safety | https://www.typescriptlang.org/docs |
| **Tailwind CSS 4** | Utility-first styling | https://tailwindcss.com/docs |
| **ShadCN/UI** | Component library | https://ui.shadcn.com/docs |
| **Zustand** | State management | https://zustand.docs.pmnd.rs/getting-started/introduction |
| **Three.js / R3F** | 3D graphics | https://r3f.docs.pmnd.rs/getting-started/introduction |
| **Remotion** | Programmatic video | https://www.remotion.dev/docs |
| **Framer Motion** | Animations | https://motion.dev/docs |

## Documentation Lookup

**When unsure about any API, pattern, or feature — ALWAYS consult the official docs before guessing.**

Use the `context7` MCP tool (`resolve-library-id` then `query-docs`) or `WebFetch` to look up:

- **Next.js**: https://nextjs.org/docs — App Router, Server Components, Server Actions, metadata, routing
- **Remotion**: https://www.remotion.dev/docs — compositions, sequences, animations, rendering
- **Three.js / R3F**: https://r3f.docs.pmnd.rs — Canvas, meshes, materials, hooks
- **Zustand**: https://zustand.docs.pmnd.rs — stores, slices, middleware
- **ShadCN**: https://ui.shadcn.com/docs — component installation, theming, variants
- **Tailwind v4**: https://tailwindcss.com/docs — utilities, theme config, dark mode
- **Framer Motion**: https://motion.dev/docs — motion components, variants, gestures

Never hallucinate APIs. If you don't know the exact API, look it up.

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles (Tailwind)
├── components/       # Reusable React components
│   ├── ui/           # ShadCN/UI primitives
│   ├── sections/     # Page sections (hero, about, projects, etc.)
│   └── three/        # Three.js/R3F components
├── lib/              # Utilities, helpers, constants
├── hooks/            # Custom React hooks
├── stores/           # Zustand stores
├── types/            # Shared TypeScript types
└── remotion/         # Remotion compositions and video components
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

## Code Conventions

### General
- TypeScript strict mode — no `any` types, always define interfaces/types
- Use `@/` path alias for all imports
- Prefer Server Components by default; only use `"use client"` when needed (state, effects, event handlers, browser APIs)
- Keep components small and focused — extract logic into custom hooks
- No default exports except for pages/layouts (Next.js requirement)

### Styling
- Tailwind CSS utility classes only — no inline styles, no CSS modules
- Use ShadCN/UI components as the base — extend with Tailwind, don't rewrite
- Mobile-first responsive design (`sm:`, `md:`, `lg:`, `xl:`)
- Use CSS variables for theme colors (ShadCN convention)
- Animations: prefer Tailwind `animate-*` for simple, Framer Motion for complex

### State Management
- **Local state**: `useState` / `useReducer` for component-scoped state
- **Global state**: Zustand stores in `src/stores/` with slices pattern
- **Server state**: Next.js Server Components + `fetch` with caching
- **URL state**: `useSearchParams` for filterable/shareable state
- Never put server-fetchable data in global state

### Three.js / R3F
- All 3D components go in `src/components/three/`
- Wrap `<Canvas>` in a client component with `"use client"`
- Use `@react-three/fiber` hooks (`useFrame`, `useThree`) — not raw Three.js
- Use `@react-three/drei` for common helpers (OrbitControls, Text, Environment)
- Always add `Suspense` fallbacks around 3D scenes

### Remotion
- Compositions in `src/remotion/`
- Use `useCurrentFrame()` and `interpolate()` for animations
- Parametrize with Zod schemas
- Keep video components pure — no side effects

### Next.js Patterns
- App Router only — no Pages Router
- Use `loading.tsx` for streaming/Suspense
- Use `error.tsx` for error boundaries
- Server Actions for mutations — no API routes unless needed for external consumers
- Metadata API for SEO (`generateMetadata`)
- Image optimization with `next/image`
- Font optimization with `next/font`

## Skills Reference

This project has 13 installed skills in `.agents/skills/`. **Use the right skill for the right task.**

### Frontend & UI Skills

| Skill | When to Use |
|---|---|
| **`frontend-design`** (built-in) | Creating new pages, sections, or visual components. ALWAYS use this for any UI work. |
| **`ui-ux-pro-max`** | Design system decisions — color palettes, typography, spacing, style selection. Use when choosing visual direction. |
| **`frontend-responsive-design-standards`** | Ensuring responsive layouts. Use when building any layout or reviewing responsiveness. |
| **`web-design-guidelines`** | Reviewing UI code for Vercel's Web Interface Guidelines compliance. Use for UI audits. |

### React & Next.js Skills

| Skill | When to Use |
|---|---|
| **`vercel-react-best-practices`** | Performance optimization — eliminating waterfalls, bundle size, re-renders, memoization. Use when optimizing or reviewing React code. |
| **`nextjs-app-router-patterns`** | Server/Client Components, streaming, parallel routes, data fetching, caching. Use for any Next.js architecture decisions. |
| **`react-components`** | Converting designs to modular React components with proper architecture. Use when building component systems. |
| **`react-state-management`** | Zustand stores, state patterns, server vs client state. Use when adding or refactoring state. |

### Remotion & 3D Skills

| Skill | When to Use |
|---|---|
| **`remotion-best-practices`** | Any Remotion video work — compositions, animations, Three.js in video, audio, captions. ALWAYS use for Remotion tasks. |

### Backend Skills (when needed)

| Skill | When to Use |
|---|---|
| **`backend-patterns`** | API routes, middleware, database patterns in Next.js. |
| **`backend-dev-guidelines`** | Node.js/Express microservice patterns (if project expands). |
| **`backend-development`** | General backend architecture and security. |
| **`nextjs-supabase-auth`** | If/when Supabase auth is added. |

### Meta Skills

| Skill | When to Use |
|---|---|
| **`find-skills`** | Discovering and installing new skills from the ecosystem. |

## Skill Usage Rules

1. **Before building any UI component** → invoke `frontend-design` skill
2. **Before making design system choices** → invoke `ui-ux-pro-max` skill
3. **Before any Remotion work** → invoke `remotion-best-practices` skill
4. **Before optimizing performance** → invoke `vercel-react-best-practices` skill
5. **Before adding/changing state** → invoke `react-state-management` skill
6. **Before Next.js architecture decisions** → invoke `nextjs-app-router-patterns` skill
7. **When building responsive layouts** → invoke `frontend-responsive-design-standards` skill
8. **When unsure about an API or pattern** → use `context7` MCP or `WebFetch` to check docs
9. **Always brainstorm before creative work** → invoke `brainstorming` skill first

## Quality Checklist

Before marking any task as complete:
- [ ] TypeScript compiles with no errors (`npm run build`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Server Components used where possible
- [ ] No unnecessary `"use client"` directives
- [ ] Accessibility: semantic HTML, ARIA labels, keyboard navigation
- [ ] Performance: no layout shifts, optimized images, minimal bundle
