# Portfolio Design System

**Date:** 2026-03-08
**Approach:** Controlled Boldness — dark canvas with gradient used sparingly as a signature element

## Design Philosophy

Bold & Expressive with restraint. The signature Cyan → Blue → Purple gradient punctuates key moments (CTAs, hero text, section dividers, hover glows) while the majority of the UI stays clean with neutral surfaces. System-preference theming supports both dark and light modes equally.

---

## 1. Color System

### Dark Theme

| Token              | Hex        | Usage                              |
| ------------------- | ---------- | ---------------------------------- |
| `background`        | `#0A0A0F`  | Page background (near-black, cool) |
| `surface`           | `#12121A`  | Cards, modals, elevated surfaces   |
| `surface-hover`     | `#1A1A25`  | Hovered interactive surfaces       |
| `border`            | `#1E1E2E`  | Subtle borders on cards/sections   |
| `border-bright`     | `#2A2A3D`  | Visible borders, dividers          |
| `foreground`        | `#EDEDED`  | Primary text                       |
| `foreground-muted`  | `#8A8AA3`  | Secondary/supporting text          |
| `foreground-faint`  | `#4A4A63`  | Placeholder text, disabled states  |

### Light Theme

| Token              | Hex        | Usage                    |
| ------------------- | ---------- | ------------------------ |
| `background`        | `#FAFAFA`  | Page background          |
| `surface`           | `#FFFFFF`  | Cards, elevated surfaces |
| `surface-hover`     | `#F0F0F5`  | Hovered surfaces         |
| `border`            | `#E2E2EA`  | Subtle borders           |
| `border-bright`     | `#C8C8D6`  | Visible borders          |
| `foreground`        | `#0A0A0F`  | Primary text             |
| `foreground-muted`  | `#5C5C72`  | Secondary text           |
| `foreground-faint`  | `#9A9AB0`  | Placeholders, disabled   |

### Accent Colors (shared across themes)

| Token              | Hex                    | Usage                          |
| ------------------- | ---------------------- | ------------------------------ |
| `accent-cyan`       | `#22D3EE`              | Primary accent, links          |
| `accent-blue`       | `#3B82F6`              | Gradient midpoint              |
| `accent-purple`     | `#8B5CF6`              | Gradient end, highlights       |
| `accent-cyan-soft`  | `#22D3EE1A` (10% opacity) | Accent backgrounds, glows  |

### Signature Gradient

```css
linear-gradient(135deg, #22D3EE, #3B82F6, #8B5CF6)
```

Used on: primary buttons, hero accent text, section dividers, hover glow effects, decorative elements.

### Semantic Colors

| Token     | Hex        | Usage         |
| --------- | ---------- | ------------- |
| `success` | `#10B981`  | Success states |
| `warning` | `#F59E0B`  | Warning states |
| `error`   | `#EF4444`  | Error states   |

---

## 2. Typography

### Font Stack

| Role        | Font          | Fallback             | Source                         |
| ----------- | ------------- | -------------------- | ------------------------------ |
| **Headings** | Space Grotesk | system-ui, sans-serif | Google Fonts (variable)        |
| **Body**     | Geist         | system-ui, sans-serif | Already in project (next/font) |
| **Code**     | Geist Mono    | monospace             | Already in project (next/font) |

### Type Scale

| Token      | Size              | Weight | Line Height | Font          | Usage               |
| ---------- | ----------------- | ------ | ----------- | ------------- | -------------------- |
| `display`  | 72px / 4.5rem     | 700    | 1.1         | Space Grotesk | Hero headline        |
| `h1`       | 48px / 3rem       | 700    | 1.15        | Space Grotesk | Page titles          |
| `h2`       | 36px / 2.25rem    | 600    | 1.2         | Space Grotesk | Section headings     |
| `h3`       | 24px / 1.5rem     | 600    | 1.3         | Space Grotesk | Sub-section headings |
| `h4`       | 20px / 1.25rem    | 600    | 1.4         | Space Grotesk | Card titles          |
| `body-lg`  | 18px / 1.125rem   | 400    | 1.7         | Geist         | Lead paragraphs      |
| `body`     | 16px / 1rem       | 400    | 1.7         | Geist         | Default body text    |
| `body-sm`  | 14px / 0.875rem   | 400    | 1.6         | Geist         | Captions, metadata   |
| `label`    | 12px / 0.75rem    | 500    | 1.5         | Geist         | Tags, badges         |
| `code`     | 14px / 0.875rem   | 400    | 1.6         | Geist Mono    | Code blocks          |

### Mobile Scaling (below 768px)

- `display` → 40px
- `h1` → 32px
- `h2` → 28px
- `h3` → 22px
- Everything else stays the same

### Letter Spacing

- `display`, `h1`, `h2`: `-0.02em` (tight, impactful)
- `h3`, `h4`: `-0.01em`
- Body text: `0` (default)
- `label` / overlines: `0.05em` (spaced out, uppercase)

---

## 3. Spacing

8px base unit.

| Token      | Value | Usage                          |
| ---------- | ----- | ------------------------------ |
| `space-1`  | 4px   | Tight gaps, icon padding       |
| `space-2`  | 8px   | Inline spacing, small gaps     |
| `space-3`  | 12px  | Button padding (vertical)      |
| `space-4`  | 16px  | Card inner padding, inputs     |
| `space-5`  | 20px  | Between related elements       |
| `space-6`  | 24px  | Card outer padding, grid gaps  |
| `space-8`  | 32px  | Between content blocks         |
| `space-10` | 40px  | Between sub-sections           |
| `space-12` | 48px  | Section padding (mobile)       |
| `space-16` | 64px  | Section padding (tablet)       |
| `space-20` | 80px  | Section padding (desktop)      |
| `space-24` | 96px  | Large section gaps             |

---

## 4. Border Radius

| Token         | Value   | Usage                        |
| ------------- | ------- | ---------------------------- |
| `radius-sm`   | 6px     | Tags, badges, small chips    |
| `radius-md`   | 8px     | Inputs, small cards          |
| `radius-lg`   | 12px    | Cards, modals, dropdowns     |
| `radius-xl`   | 16px    | Large cards, featured items  |
| `radius-full` | 9999px  | Pill buttons, avatars        |

---

## 5. Shadows

### Dark Theme

| Token            | Value                                  | Usage                  |
| ---------------- | -------------------------------------- | ---------------------- |
| `shadow-sm`      | `0 1px 2px rgba(0,0,0,0.4)`           | Subtle lift            |
| `shadow-md`      | `0 4px 12px rgba(0,0,0,0.5)`          | Cards, dropdowns       |
| `shadow-lg`      | `0 8px 30px rgba(0,0,0,0.6)`          | Modals, featured cards |
| `shadow-glow`    | `0 0 20px rgba(34,211,238,0.15)`      | Cyan glow on hover     |
| `shadow-glow-lg` | `0 0 40px rgba(34,211,238,0.2)`       | Hero elements, CTAs    |

### Light Theme

| Token            | Value                                  | Usage                  |
| ---------------- | -------------------------------------- | ---------------------- |
| `shadow-sm`      | `0 1px 2px rgba(0,0,0,0.05)`          | Subtle lift            |
| `shadow-md`      | `0 4px 12px rgba(0,0,0,0.08)`         | Cards                  |
| `shadow-lg`      | `0 8px 30px rgba(0,0,0,0.12)`         | Modals, featured       |
| `shadow-glow`    | `0 0 20px rgba(59,130,246,0.1)`       | Blue glow (softer)     |
| `shadow-glow-lg` | `0 0 40px rgba(59,130,246,0.15)`      | Hero elements          |

---

## 6. Component Patterns

### Buttons

| Variant       | Style                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------- |
| **Primary**   | Gradient bg (cyan→blue→purple), white text, `radius-full`, `shadow-glow` on hover, scale 1.02 |
| **Secondary** | Transparent bg, `border` border, `foreground` text, `surface-hover` bg on hover              |
| **Ghost**     | No border/bg, `accent-cyan` text, `accent-cyan-soft` bg on hover                            |
| **Icon**      | Square, `radius-md`, ghost style, `space-3` padding                                         |

### Cards

- Background: `surface`
- Border: 1px `border`
- Radius: `radius-lg` (12px)
- Padding: `space-6`
- Hover: border → `border-bright`, `shadow-glow`, `translateY(-2px)`
- Featured variant: gradient border (1px, `background-clip` technique)

### Glass Effect

```css
/* Dark */
background: rgba(18, 18, 26, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);

/* Light */
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(12px);
border: 1px solid rgba(0, 0, 0, 0.06);
```

### Gradient Text

```css
background: linear-gradient(135deg, #22D3EE, #3B82F6, #8B5CF6);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Links

- Default: `accent-cyan`
- Hover: underline, slight opacity shift
- No visited color change

### Tags / Badges

- Background: `accent-cyan-soft`
- Text: `accent-cyan`
- Radius: `radius-sm`
- Font: `label` size, weight 500
- Padding: `space-1` vertical, `space-2` horizontal

### Dividers

- Default: 1px `border` color
- Accent: 2px gradient (cyan→blue→purple), between major sections

### Focus States

```css
outline: none;
box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--accent-cyan);
```

Visible only on `:focus-visible`.

### Transitions

- Color/opacity: `150ms ease`
- Transforms (hover lifts): `200ms ease`
- Page transitions: `300ms ease` (Framer Motion)

---

## 7. Layout & Grid

### Container

| Breakpoint          | Max Width | Padding          |
| ------------------- | --------- | ---------------- |
| Mobile `<640px`     | 100%      | `space-4` (16px) |
| Tablet `640-1024px` | 100%      | `space-8` (32px) |
| Desktop `1024-1280` | 1120px    | `space-8` (32px) |
| Wide `>1280px`      | 1200px    | auto (centered)  |

### Grid

- Project grid: 3 cols desktop, 2 tablet, 1 mobile — `space-6` gap
- Content sections: max-width `720px` for text-heavy content
- Hero: full-width, minimum `100vh`
- Section spacing: `space-20` (80px) desktop, `space-12` (48px) mobile

### Z-Index

| Token     | Value | Usage             |
| --------- | ----- | ----------------- |
| `z-base`  | 0     | Default           |
| `z-raised`| 10    | Floating elements |
| `z-nav`   | 50    | Navigation bar    |
| `z-modal` | 100   | Modals, overlays  |
| `z-toast` | 150   | Toast notifications |

### Navigation

- Fixed top, glass effect background
- Logo left, nav links right
- Hamburger below 768px
- Height: 64px
- Blur + gradient border-bottom on scroll

---

## Research Sources

- [Best Color Palettes for Developer Portfolios](https://www.webportfolios.dev/blog/best-color-palettes-for-developer-portfolio)
- [19 Portfolio Design Trends 2026 — Colorlib](https://colorlib.com/wp/portfolio-design-trends/)
- [Best Fonts for Web Design — Shakuro](https://shakuro.com/blog/best-fonts-for-web-design)
- [Top 100 Creative Portfolio Websites — Muzli](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/)
- [Awwwards Portfolio Winners](https://www.awwwards.com/websites/portfolio/)
- [Border Radius Design Systems — Telerik](https://www.telerik.com/design-system/docs/foundation/border-radius/)
- [Dark Mode Design Best Practices 2025](https://muksalcreative.com/2025/07/26/dark-mode-design-best-practices-2025/)
