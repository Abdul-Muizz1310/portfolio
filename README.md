<div >

# Portfolio

A terminal/IDE-themed personal portfolio with a site-wide interactive Three.js particle field, an in-browser command terminal, and a Konami-code easter egg. 
</div>

---

## ✨ Highlights

- 🌌 **Site-wide 3D particle field** — 200 WebGL particles with gradient colors, mouse repulsion, and connection lines, rendered behind every page
- 💻 **Interactive terminal** — In-browser command emulator with Tab autocomplete, `Ctrl+/` global focus shortcut, command history, suggestion chips, and a custom click-to-jump scroll rail
- 🎨 **Terminal/IDE aesthetic** — Section headers as shell paths, status bar as IDE chrome, code-block framing throughout
- 🪄 **Konami code easter egg** — `↑↑↓↓←→←→BA` unlocks a full-screen terminal with Matrix rain
- 🖱️ **Custom cursor** — Cyan dot + lerped ring on pointer devices, gracefully degrades on touch
- 📨 **Server Actions contact form** — Resend-powered with reply-to, HTML body, and graceful fallback
- 🚫 **Funny 404** — Terminal-styled with rotating one-liners and rescue links
- ⚡ **Server-first** — RSC by default, ISR-cached GitHub gallery, dynamic metadata, sitemap & robots
- 🌑 **Dark only** — Single, intentional theme; no toggle, no FOUC
- ✅ **250 tests, 99%+ line coverage** — Vitest + React Testing Library, gated by CI

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|---|---|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![ShadCN](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) |
| **3D** | ![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white) ![R3F](https://img.shields.io/badge/React_Three_Fiber-000000?style=flat-square&logo=react&logoColor=61DAFB) |
| **Icons** | ![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat-square&logo=lucide&logoColor=white) ![React Icons](https://img.shields.io/badge/React_Icons-E91E63?style=flat-square&logo=react&logoColor=white) |
| **Email** | ![Resend](https://img.shields.io/badge/Resend-000000?style=flat-square&logo=resend&logoColor=white) |
| **Testing** | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white) ![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=flat-square&logo=testinglibrary&logoColor=white) |
| **CI/CD** | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) |

</div>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** 10+

### Install & run

```bash
git clone https://github.com/Abdul-Muizz1310/portfolio.git
cd portfolio
npm install
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)**.

### Environment variables (optional)

Create a `.env.local` file in the project root:

```env
# Higher GitHub API rate limits (60/hr without)
GITHUB_TOKEN=ghp_your_token_here

# Contact form delivery (graceful fallback message without)
RESEND_API_KEY=re_your_key_here
```

| Variable | Required | Purpose |
|---|:---:|---|
| `GITHUB_TOKEN` | ⚪ Optional | Higher GitHub API rate limits for the projects gallery |
| `RESEND_API_KEY` | ⚪ Optional | Enables real email delivery from the contact form |

> 💡 The site works fully without either — projects fall back to the public 60 req/hr limit, and the contact form shows a friendly fallback message.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | ESLint check (cached) |
| `npm run lint:fix` | ESLint auto-fix |
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with v8 coverage report |

---

## 🗺️ Pages

| Route | Description |
|---|---|
| `/` | Hero, skills showcase, tech stack grid, featured projects, terminal, CTA |
| `/about` | Bio, experience, education, volunteer work, values |
| `/projects` | GitHub-integrated project gallery with language filtering |
| `/projects/[slug]` | Project detail with rendered README, stats, and live links |
| `/resume` | Resume rendered as a styled code block with PDF export |
| `/contact` | Contact form (Server Action → Resend) |
| `/404` | Funny terminal-styled not-found page |

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (particle bg, nav, cursor, status bar)
│   ├── page.tsx                  # Home composition
│   ├── not-found.tsx             # Funny terminal-styled 404
│   ├── template.tsx              # Page transition animations
│   ├── globals.css               # Tailwind + dark theme tokens
│   ├── about/                    # Bio + timelines
│   ├── contact/                  # Server action + client form
│   ├── projects/                 # Gallery + [slug] detail
│   └── resume/                   # Resume page
│
├── components/
│   ├── sections/                 # Page sections (hero, uses-stack, terminal, ...)
│   ├── three/                    # R3F components
│   │   ├── particle-field.tsx    # 200-particle physics + connection lines
│   │   └── particle-background.tsx  # Client-only dynamic wrapper
│   ├── ui/                       # ShadCN primitives
│   ├── code-block.tsx            # macOS-style code frame
│   ├── custom-cursor.tsx         # Cursor dot + lerp ring
│   ├── konami-terminal.tsx       # Matrix-rain easter egg
│   ├── navigation.tsx
│   ├── status-bar.tsx
│   └── terminal-typer.tsx
│
├── hooks/                        # use-cursor, use-konami
├── lib/                          # github API, resume data, constants, utils
├── types/                        # Shared type definitions
└── __tests__/                    # 56 test files, 250 tests
```

---

## 🏗️ Architecture

- **Server Components** by default — `"use client"` only where state, effects, or browser APIs are needed
- **App Router** with Server Actions for mutations (no API routes)
- **Site-wide Three.js background** lifted into the root layout via a client-only `next/dynamic` wrapper to avoid SSR style mismatches; cursor is tracked via a window listener so the field stays interactive under `pointer-events-none`
- **GitHub API** wrapped in `fetch()` with ISR (1h revalidation)
- **Dark-only theme** — `<html className="dark">` hardcoded; all CSS variables on `:root`
- **Path alias** — `@/*` → `./src/*`
- **Type safety** — TypeScript strict mode, no `any`

---

## 🧪 Testing

```bash
npm run test:coverage
```

| Metric | Value |
|---|---|
| Test files | **56** |
| Tests | **250** |
| Line coverage | **99.6%** |
| Function coverage | **98.8%** |

Tests live in `src/__tests__/` and mirror the source structure. External dependencies (`next/navigation`, `next/image`, `next/link`, `framer-motion`) are mocked in [src/__tests__/setup.ts](src/__tests__/setup.ts) and shared mock files. Three.js components are excluded from coverage by config.

---

## 🔄 CI/CD

GitHub Actions workflow at [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

| Stage | Command |
|---|---|
| 1️⃣ Lint | `npm run lint` |
| 2️⃣ Build | `npm run build` |
| 3️⃣ Test | `npm test` |

**Triggers:** push to `dev`, pull requests targeting `dev`.

---

## 🥚 Easter Eggs

- **Konami Code** — Press `↑ ↑ ↓ ↓ ← → ← → B A` anywhere on the site to open a secret terminal with Matrix rain. Type `matrix` inside it for the full effect.
- **Ctrl + /** — Focuses the home terminal from anywhere on the home page.
- **Tab** — Autocompletes commands inside the home terminal.

---

## 📬 Contact

- 📧 **Email:** [abdulmuizz1310@outlook.com](mailto:abdulmuizz1310@outlook.com)
- 💼 **LinkedIn:** [linkedin.com/in/abdulmuizz1310](https://linkedin.com/in/abdulmuizz1310)
- 🐙 **GitHub:** [@Abdul-Muizz1310](https://github.com/Abdul-Muizz1310)

---
</div>
