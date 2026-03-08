# Portfolio Website Design

**Date:** 2026-03-08
**Approach:** Clean & Refined, Distinctly Hacker — polished modern portfolio where hacker/dev DNA is woven into every detail

## Design Philosophy

Professional enough for recruiters, creative enough to impress devs, memorable enough to build a brand. The site uses terminal/code-editor aesthetics not as a gimmick but as a natural expression of who Abdul-Muizz is. Every section has a dev-flavored twist that makes it distinct from generic portfolios while remaining clean and accessible.

**Four goals served simultaneously:**
1. Land a job — clear experience, skills, resume access
2. Attract freelance clients — services, project results, easy contact
3. Build personal brand — memorable design, blog, social presence
4. Showcase technical ability — the site itself proves the skill

---

## 1. Site Identity & Navigation

### Top Navigation

Styled as a **browser tab bar**. Each page is a "tab" with a subtle icon. Active tab has a gradient underline (cyan→blue→purple). Clean, minimal, instantly familiar to devs.

```
[AM logo]  Home  About  Projects  Services  Blog  Lab  Resume  Contact   [theme toggle]
──────────────────────────── gradient line ─────────────────────────────────
```

- Fixed position, glass effect background on scroll
- Hamburger menu below 768px
- Height: 64px
- Theme toggle: sun/moon icon, switches `prefers-color-scheme`

### Bottom Status Bar

Persistent bar at the viewport bottom, styled like a code editor status bar:

```
◉ abdul-muizz.dev  ·  ~/home  ·  UTF-8  ·  ☾ dark  ·  03:42 PM  ▊
```

- Updates `~/path` on route change
- Blinking cursor at the end
- Height: 28px
- Background: `surface` color
- Font: Geist Mono, `text-label` size
- z-index: `z-nav` (50)

### Page Transitions

- Gradient line sweeps left-to-right across the top (200ms)
- Content cross-fades (300ms, Framer Motion)
- Feels like switching editor tabs

---

## 2. Pages

### 2.1 Home Page

#### Hero Section
- Full viewport height (`100vh`)
- **Background:** Subtle animated particle grid (Three.js) — low-density dots connected by faint lines, reacts to mouse movement. Only on hero, not other pages.
- **Left side:** Terminal-style typing animation:
  ```
  $ whoami
  > Abdul-Muizz
  $ role
  > Software Engineer · AI/ML · Full-Stack
  $ location
  > Islamabad, Pakistan
  ```
  - Typing speed: ~60ms per character
  - Each command types, pauses, then response appears
  - Uses Geist Mono font
  - Commands in `foreground-muted`, responses in `foreground` with `accent-cyan` for the `>` prefix
- **Right side:** Photo in a **code-editor frame**:
  - Tab bar at top: `avatar.jpg` with close/minimize dots
  - Line numbers running down the left side
  - Gradient border (subtle)
  - Image: `avatar.jpg`
- **CTAs:** Below terminal text
  - `View Projects` — gradient primary button, `radius-full`
  - `Download Resume` — ghost button
- **Scroll indicator:** `// scroll to continue` with pulsing chevron, `foreground-faint` color

#### Uses/Stack Section
Styled as a **`package.json`** code block:

```json
{
  "name": "abdul-muizz",
  "version": "2026.3",
  "skills": {
    "languages": ["Python", "TypeScript", "JavaScript"],
    "ai_ml": ["LangChain", "RAG", "NLP", "LangFlow"],
    "frontend": ["React", "Next.js", "Tailwind CSS"],
    "backend": ["FastAPI", "Node.js", "REST APIs"],
    "tools": ["Git", "Docker", "VS Code"]
  }
}
```

- Rendered as a styled code block with syntax highlighting colors
- Line numbers in gutter
- Each skill value is a hoverable badge — glows `accent-cyan` on hover
- Container: `surface` background, `radius-lg`, `border`

#### Featured Projects Section
- Section header: `~/featured-projects`
- 3 top/pinned repos from GitHub API
- **Code-editor cards:**
  - File tab at top: `repo-name.py` (based on primary language extension)
  - Description as code comment: `// financial RAG chatbot`
  - Language color dot + name, star count
  - Hover: lift (`translateY(-2px)`), gradient glow, "Open →" appears
- Below cards: `cd ./projects →` link to full projects page

#### Testimonials Section
Styled as **git commits**:

```
commit a3f8c2d
Author: Sarah Chen <TechVentures AI>
Date:   Feb 2026

    "Abdul-Muizz built a RAG pipeline that cut our research
     time by 60%. Exceptional understanding of LLM architectures."
```

Testimonials (crafted based on experience areas):

1. **AI/ML Client** — Sarah Chen, CTO @ TechVentures AI
   > "Abdul-Muizz built a RAG pipeline that cut our research time by 60%. Exceptional understanding of LLM architectures and practical AI solutions."

2. **Web Development Client** — Marcus Rivera, Founder @ Launchpad Digital
   > "Delivered a full-stack Next.js platform ahead of schedule. Clean code, great communication, and a keen eye for performance."

3. **Automation Client** — Priya Sharma, Operations Lead @ DataFlow Corp
   > "His Python automation scripts saved our team 20+ hours per week. Reliable, efficient, and always thinking about edge cases."

4. **Consulting Client** — James Okafor, Engineering Manager @ Nexus Systems
   > "Brought clarity to our AI strategy when we were drowning in options. Abdul-Muizz doesn't just code — he thinks architecturally."

- Horizontal scroll or carousel
- Each testimonial in a `surface` card with `border`, `radius-lg`
- Commit hash in `foreground-faint`, author in `accent-cyan`, date in `foreground-muted`
- Quote text in `foreground`

#### CTA Section
```
$ ping abdul-muizz --message "let's work together"
```
- Gradient primary button: `Get in Touch`
- Links to Contact page
- Centered, generous padding (`space-20`)

---

### 2.2 About Page

#### Header
- `$ cat about.md` with gradient underline
- 2-3 paragraph intro — who you are, what drives you, engineering philosophy

#### Experience Timeline
Styled as **git log**:

```
● commit 4a2b1f — present
│ Software Engineer @ Company
│ Built RAG pipelines, NLP systems, full-stack apps
│
● commit 2c8e3a — 2024
│ Previous Role @ Company
│ Description of work
```

- Timeline line: gradient (cyan→blue→purple, top to bottom)
- Each node: circle dot that glows on scroll-enter (Framer Motion `whileInView`)
- Content fades + slides in from left on scroll
- Data sourced from resume

#### Education
- Same git-log style
- `branch: education` label above
- Degree, university, dates, highlights

#### Values/Soft Skills
Styled as **environment variables**:

```
PROBLEM_SOLVING=true
COMMUNICATION=excellent
TEAMWORK=collaborative
LEARNING_RATE=constant
```

- Geist Mono font
- Keys in `foreground-muted`, values in `accent-cyan`
- Subtle, adds personality

---

### 2.3 Projects Page

#### Header
- `$ ls ~/projects`

#### Filter Bar
Terminal-style flags:
- `--all` `--python` `--typescript` `--ai-ml` `--web`
- Active filter: gradient background, pill shape
- Inactive: ghost style

#### Project Grid
- **Data source:** GitHub API — all public repos, fetched at build time (ISR) or client-side
- 3 columns desktop, 2 tablet, 1 mobile
- Gap: `space-6`

#### Project Cards
- **File tab:** `repo-name.py` / `.ts` based on primary language
- Description as code comment style
- Language color dot + name
- Star count, fork count
- Topics as `accent-cyan-soft` badges
- **Hover:** subtle 3D tilt (CSS transform perspective), gradient glow, `translateY(-2px)`

#### Project Detail Page (`/projects/[slug]`)
- README rendered as markdown, styled like a code file:
  - File tab: `README.md`
  - Line-number gutter aesthetic
- Sidebar: language breakdown bar (colored segments), repo link, live demo link, topics
- Fetched from GitHub API

---

### 2.4 Services Page

#### Header
- `$ cat services.md`

#### Service Cards

| Service | Description | Tech Tags |
|---|---|---|
| **AI & ML Solutions** | RAG pipelines, chatbots, NLP systems, LangChain/LangFlow integrations | Python, LangChain, LangFlow, RAG, NLP |
| **Full-Stack Web Development** | Modern web apps with Next.js, React frontends, FastAPI/Node.js backends | Next.js, React, TypeScript, FastAPI, Node.js |
| **Python Automation & Scraping** | Data extraction, web scraping, workflow automation, script development | Python, BeautifulSoup, Scrapy, Selenium |
| **Technical Consulting** | Architecture reviews, AI strategy, code audits, tech stack decisions | System Design, AI Strategy, Code Review |

Each card:
- Monoline icon at top
- Title (`text-h3`) + description (`text-body`)
- Tech tags as badges
- Hover: gradient border reveals (using `gradient-border` utility), subtle lift
- Bottom of card: `$ hire --service "ai-ml"` styled text

#### CTA
- `$ get-quote --project "your idea"` → links to Contact page
- No fixed prices listed

---

### 2.5 Blog Page

#### Header
- `$ ls ~/blog`

#### Data Sources
- **Dev.to:** Fetched via `dev.to/api/articles?username=abdulmuizz1310`
- **LinkedIn:** Manual links section with "Follow on LinkedIn" CTA (no public API)

#### Blog Cards
Styled as directory listing entries:

```
-rw-r--r--  1 muizz  Jul 2025  is-ai-ending-software-engineering.md
```

- Each row: file permissions, author, date, filename (derived from title)
- Hover: row expands to show description, tags, read time
- Click: opens article on dev.to / LinkedIn in new tab
- Container: `surface` background, `radius-lg`

#### LinkedIn Section
- Separate section: "LinkedIn Articles"
- Manual list of links with thumbnails
- Prominent "Follow on LinkedIn" gradient CTA

---

### 2.6 Playground/Lab Page

#### Header
- `$ cd ~/lab && ls`

#### Experiments

1. **Particle Playground**
   - Three.js particle system
   - Mouse interaction: attract/repel particles
   - Controls: particle count, color, gravity
   - Full-screen capable

2. **RAG Demo**
   - Input field where visitors type a question
   - Simulated (or real) RAG pipeline response
   - Shows the retrieval → generation flow visually
   - Educational + impressive

3. **Terminal Emulator**
   - Working terminal visitors can type commands in
   - Commands: `help`, `about`, `projects`, `skills`, `contact`, `sudo hire-me`, `clear`
   - Easter egg commands: `matrix`, `coffee`, `joke`
   - Geist Mono font, green-on-dark or cyan-on-dark

Each experiment:
- Card with animated preview thumbnail
- Title, description, tech used
- Click: opens full-screen experiment
- Back button to return to lab

---

### 2.7 Resume Page

The page IS the resume — styled as a **code file:**

- **File tab:** `resume.tsx`
- **Line numbers** in left gutter
- Content uses syntax-highlighting colors:
  - Role names: `accent-cyan`
  - Company names: `accent-purple`
  - Dates: `foreground-muted`
  - Descriptions: `foreground`
  - Section headers: code comments style (`// Experience`)
- **Sticky download button** top-right: `$ export resume.pdf` — downloads the actual PDF from `/docs/resume.docx.pdf`
- Content mirrors the About page experience data — single source of truth
- Responsive: on mobile, line numbers hide, layout simplifies

---

### 2.8 Contact Page

#### Header
- `$ ping abdul-muizz`

#### Contact Form
Styled as terminal input:

```
name: █
email: █
subject: █
message: █

$ send --message
```

- Each field: Geist Mono font, minimal border-bottom only, blinking cursor animation on focus
- Submit: gradient primary button, `$ send` label
- Success state: `✓ Message sent successfully. Response time: ~24h`
- Error state: `✗ Failed to send. Try again or email directly.`
- Backend: Server Action or a form service (Formspree / Resend)

#### Social Links
Terminal output style:

```
→ github.com/Abdul-Muizz1310
→ linkedin.com/in/abdulmuizz1310
→ dev.to/abdulmuizz1310
→ abdulmuizz1310@outlook.com
```

- Each link: `accent-cyan`, hover underline
- Monoline social icons next to each

---

## 3. Global Interactive Features

### Custom Cursor
- Small dot (6px) with a gradient glow ring (24px) that follows with ~50ms delay
- Scales up on hovering interactive elements
- Hidden on touch devices
- CSS: `pointer-events: none`, positioned via `requestAnimationFrame`

### Magnetic Hover
- Buttons and links subtly pull toward cursor within a 40px radius
- Uses `mousemove` listener with spring physics
- Subtle — 2-4px max displacement

### Scroll Animations
- Every section: fade in + slide up (20px) on scroll enter
- Staggered children: 50ms delay between items
- Framer Motion `whileInView` with `once: true`
- Threshold: 0.2

### Page Transitions
- Gradient line sweeps left-to-right across top (200ms)
- Content exit: fade out (150ms)
- Content enter: fade in + slight slide up (300ms)
- Framer Motion `AnimatePresence` in layout

### Easter Egg — Konami Code
- Sequence: ↑↑↓↓←→←→BA
- Triggers: Full-screen terminal overlay
- Terminal commands: `help`, `about`, `projects`, `matrix`, `hire-me`
- Dismissible with `Esc` or `exit` command

### 3D Particle Background (Home Hero Only)
- Three.js / R3F `<Canvas>`
- Low-density dot grid connected by faint lines
- Mouse interaction: dots gently repel/attract near cursor
- Colors: `accent-cyan` dots, `border` lines
- Performance: `<150` particles, no shadows, no post-processing
- Wrapped in `Suspense` with null fallback (hero text shows immediately)

### Status Bar
- Fixed bottom, 28px height
- Updates on route change: `~/about`, `~/projects`, etc.
- Theme indicator, clock, blinking cursor
- `surface` background, 1px `border` top

---

## 4. Data Architecture

### GitHub Integration (Projects)
- **Build time:** `fetch` GitHub API for repo list → generate static pages (ISR, revalidate every hour)
- **Endpoint:** `https://api.github.com/users/Abdul-Muizz1310/repos`
- **Detail pages:** Fetch individual repo README via API
- **Filtering:** Client-side filter by language/topic from pre-fetched data

### Dev.to Integration (Blog)
- **Build time or client-side:** `fetch` from `https://dev.to/api/articles?username=abdulmuizz1310`
- Articles open on dev.to in new tab (no content hosting needed)
- Cache and revalidate periodically

### LinkedIn (Blog)
- No API available — manual links array in a data file
- Update manually when new articles are published

### Contact Form
- Server Action → email service (Resend API recommended)
- Rate limiting on server side
- Client-side validation with proper error states

### Resume Data
- Single data source file (`src/lib/resume-data.ts`) used by both About and Resume pages
- PDF download: static file in `/public/`

---

## 5. Technical Decisions

### Dependencies to Add

| Package | Purpose |
|---|---|
| `framer-motion` | Page transitions, scroll animations, hover effects |
| `@react-three/fiber` | Three.js React renderer (hero particles) |
| `@react-three/drei` | R3F helpers |
| `three` | 3D engine |
| `shadcn/ui` | Component primitives (button, input, card, etc.) |
| `zustand` | Global state (theme, navigation state) |
| `react-markdown` | Render GitHub READMEs |
| `resend` | Contact form email delivery |

### State Management
- **Theme:** Zustand store + `prefers-color-scheme` media query
- **Navigation:** Next.js App Router (no client state needed)
- **Projects data:** Server Components with `fetch` + ISR
- **Blog data:** Server Components with `fetch` + ISR
- **Contact form:** Local `useState` + Server Action
- **Cursor position:** `useRef` + `requestAnimationFrame` (no state, no re-renders)

### Performance Considerations
- Three.js canvas: lazy-loaded, only on Home page
- Particle count: capped at 150
- All images: `next/image` with proper sizing
- Fonts: already optimized via `next/font`
- Scroll animations: `once: true` — don't re-trigger
- Status bar clock: `requestAnimationFrame` or 1-minute interval, not per-second

### Accessibility
- All terminal-styled text: proper semantic HTML underneath (headings, paragraphs, lists)
- Custom cursor: purely decorative, default cursor still functional
- Keyboard navigation: visible focus rings using design system focus style
- Reduced motion: respect `prefers-reduced-motion` — disable particle animation, simplify transitions
- Screen reader: ARIA labels on decorative elements, skip-nav link
- Color contrast: all text passes WCAG AA against backgrounds

---

## 6. File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + fonts + status bar
│   ├── page.tsx                # Home page
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx            # Projects grid
│   │   └── [slug]/page.tsx     # Project detail
│   ├── services/page.tsx
│   ├── blog/page.tsx
│   ├── lab/page.tsx
│   ├── resume/page.tsx
│   ├── contact/page.tsx
│   └── globals.css
├── components/
│   ├── ui/                     # ShadCN primitives
│   ├── sections/               # Page sections (hero, testimonials, etc.)
│   ├── three/                  # Three.js components (particles)
│   ├── navigation.tsx          # Tab bar nav
│   ├── status-bar.tsx          # Bottom status bar
│   ├── custom-cursor.tsx       # Cursor effect
│   ├── page-transition.tsx     # Framer Motion page wrapper
│   ├── terminal-typer.tsx      # Typing animation component
│   ├── code-block.tsx          # Styled code block component
│   ├── project-card.tsx        # Code-editor style project card
│   └── git-commit-card.tsx     # Testimonial/timeline card
├── lib/
│   ├── github.ts               # GitHub API fetchers
│   ├── devto.ts                # Dev.to API fetchers
│   ├── resume-data.ts          # Shared resume/experience data
│   ├── testimonials.ts         # Testimonial data
│   ├── services.ts             # Services data
│   └── constants.ts            # Site metadata, nav links, etc.
├── hooks/
│   ├── use-cursor.ts           # Custom cursor hook
│   ├── use-magnetic.ts         # Magnetic hover hook
│   └── use-konami.ts           # Konami code detection
├── stores/
│   └── theme-store.ts          # Theme state (Zustand)
├── types/
│   ├── github.ts               # GitHub API types
│   ├── blog.ts                 # Blog post types
│   └── services.ts             # Service types
└── remotion/                   # Future: video generation
```

---

## 7. Responsive Breakpoints

| Breakpoint | Navigation | Grid | Hero | Status Bar |
|---|---|---|---|---|
| Mobile `<640px` | Hamburger menu | 1 column | Stacked (terminal above, photo below) | Simplified (path + theme only) |
| Tablet `640-1024px` | Full tab bar | 2 columns | Side by side, smaller | Full |
| Desktop `>1024px` | Full tab bar | 3 columns | Full layout | Full |

---

## 8. Testimonials Data

```typescript
const testimonials = [
  {
    hash: "a3f8c2d",
    author: "Sarah Chen",
    company: "TechVentures AI",
    role: "CTO",
    date: "Feb 2026",
    quote: "Abdul-Muizz built a RAG pipeline that cut our research time by 60%. Exceptional understanding of LLM architectures and practical AI solutions."
  },
  {
    hash: "b7e1d4a",
    author: "Marcus Rivera",
    company: "Launchpad Digital",
    role: "Founder",
    date: "Jan 2026",
    quote: "Delivered a full-stack Next.js platform ahead of schedule. Clean code, great communication, and a keen eye for performance."
  },
  {
    hash: "c9f2e8b",
    author: "Priya Sharma",
    company: "DataFlow Corp",
    role: "Operations Lead",
    date: "Nov 2025",
    quote: "His Python automation scripts saved our team 20+ hours per week. Reliable, efficient, and always thinking about edge cases."
  },
  {
    hash: "d4a6f1c",
    author: "James Okafor",
    company: "Nexus Systems",
    role: "Engineering Manager",
    date: "Sep 2025",
    quote: "Brought clarity to our AI strategy when we were drowning in options. Abdul-Muizz doesn't just code — he thinks architecturally."
  }
];
```

---

## 9. Services Data

```typescript
const services = [
  {
    id: "ai-ml",
    title: "AI & ML Solutions",
    description: "Custom RAG pipelines, intelligent chatbots, NLP systems, and LangChain/LangFlow integrations tailored to your business needs.",
    tags: ["Python", "LangChain", "LangFlow", "RAG", "NLP"],
    command: '$ hire --service "ai-ml"'
  },
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    description: "Modern, performant web applications with Next.js and React frontends, FastAPI or Node.js backends, and clean architecture.",
    tags: ["Next.js", "React", "TypeScript", "FastAPI", "Node.js"],
    command: '$ hire --service "fullstack"'
  },
  {
    id: "automation",
    title: "Python Automation & Scraping",
    description: "Data extraction pipelines, web scraping solutions, workflow automation, and custom scripting to eliminate manual work.",
    tags: ["Python", "BeautifulSoup", "Scrapy", "Selenium"],
    command: '$ hire --service "automation"'
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    description: "Architecture reviews, AI strategy sessions, code audits, and tech stack decisions to set your project on the right path.",
    tags: ["System Design", "AI Strategy", "Code Review"],
    command: '$ hire --service "consulting"'
  }
];
```
