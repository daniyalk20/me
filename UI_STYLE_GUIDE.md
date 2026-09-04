# UI Style Guide — Portfolio Website

This document describes the design system, theme, and style patterns used across the portfolio website. It serves as a reference for maintaining visual consistency when making future changes.

---

## Color Scheme

The site uses a **pure grayscale** palette — no gold, yellow, or colored accents. The primary accent color is white (dark theme) or black (light theme) to maintain maximum contrast.

### Dark Theme (Default)
| Variable | Value | Usage |
|----------|-------|-------|
| `--primary-color` | `#ffffff` | Accent/emphasis, links, active states |
| `--bg-dark` | `#0a0a0a` | Page background |
| `--bg-card` | `#141414` | Card/elevated surfaces |
| `--bg-card-hover` | `#1c1c1c` | Card hover state |
| `--text-primary` | `#f0f0f0` | Headings, primary text |
| `--text-secondary` | `#a0a0a0` | Body text, descriptions |
| `--text-muted` | `#5a5a5a` | Captions, meta, subtle text |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Card borders, dividers |
| `--border-accent` | `rgba(255,255,255,0.12)` | Highlighted borders |
| `--header-bg` | `rgba(10,10,10,0.92)` | Sticky header background |

### Light Theme
| Variable | Value | Usage |
|----------|-------|-------|
| `--primary-color` | `#111111` | Accent/emphasis, links |
| `--bg-dark` | `#ffffff` | Page background |
| `--bg-card` | `#f8f8f8` | Card/elevated surfaces |
| `--bg-card-hover` | `#f0f0f0` | Card hover state |
| `--text-primary` | `#111111` | Headings, primary text |
| `--text-secondary` | `#555555` | Body text, descriptions |
| `--text-muted` | `#999999` | Captions, meta |
| `--border-subtle` | `rgba(0,0,0,0.06)` | Card borders, dividers |
| `--border-accent` | `rgba(0,0,0,0.1)` | Highlighted borders |
| `--header-bg` | `rgba(255,255,255,0.92)` | Sticky header background |

### Theme Toggle
- Stored in `localStorage` key: theme preference
- Falls back to `prefers-color-scheme` media query
- Applied via `data-theme` attribute on `<html>`
- Toggle in header (DarkMode/LightMode MUI icons)

---

## Typography

### Fonts
| Role | Font | Fallbacks |
|------|------|-----------|
| Headings | Space Grotesk | sans-serif |
| Body | Inter | -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif |
| Resume section | Calibri | Carlito, sans-serif |

### Type Scale (approximate)
- Section titles: `clamp(1.6rem, 3vw, 2rem)`, font-weight 700
- Card titles: `1.1rem`, font-weight 600
- Body text: `0.9rem–0.95rem`, font-weight 400
- Captions/meta: `0.8rem–0.85rem`, font-weight 500
- Resume name: `clamp(1.8rem, 4vw, 2.5rem)`, uppercase, letter-spacing 2px

---

## Spacing System

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 48px |
| `--space-2xl` | 80px |
| `--space-3xl` | 120px |

---

## Border Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Small elements, header buttons |
| `--radius-md` | 14px | Cards, gallery items |
| `--radius-lg` | 20px | Large containers |
| `--radius-pill` | 100px | Buttons, chips |

---

## Shadows

| Token | Dark Value | Light Value | Usage |
|-------|-----------|-------------|-------|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.2)` | `0 1px 4px rgba(0,0,0,0.05)` | Card resting state |
| `--shadow-card-hover` | `0 8px 24px rgba(0,0,0,0.3)` | `0 12px 32px rgba(0,0,0,0.08)` | Card hover state |

---

## Layout

- **Max width**: `1200px` (`--max-width`)
- **Header height**: `72px`, sticky, with backdrop blur
- **Sections**: Centered with `.section-inner`, max-width applied
- **Grid**: CSS Grid for projects (auto-fill, min 300px) and skills (2-column)
- **Responsive breakpoints**: 768px (tablet), 600px (mobile)

---

## Component Patterns

### Buttons
Two variants defined:
- `.btn-primary`: Solid background (`--primary-color`), inverted text color
- `.btn-outline`: Transparent background, accent border, highlights on hover

Base `.btn` class: `font-size: 0.9rem`, `padding: 14px 28px`, `border-radius: var(--radius-pill)`, `inline-flex` with gap. Both variants have `transition: all 0.2s ease` and `translateY(-1px)` on hover.

### Cards (`.card`, `.project-card`, `.writing-card`)
- Background: `var(--bg-card)`
- Border: `1px solid var(--border-subtle)`
- Border-radius: `var(--radius-md)` (14px)
- Box-shadow: `var(--shadow-card)` at rest
- Hover: shadow increases to `var(--shadow-card-hover)`, translateY(-2px to -3px)

### Chips (`.chip`)
- Inline-flex, small (`0.73rem`), pill-shaped (`border-radius: var(--radius-pill)`)
- Background: `rgba(128,128,128,0.06)`
- Border: `1px solid var(--border-subtle)`
- Text color: `var(--text-secondary)`

### Section Headers
- `.section-title`: heading font, `clamp(2rem, 3.5vw, 2.8rem)`, bold, letter-spacing -0.5px
- `.section-divider`: 40px wide, 3px tall, `var(--primary-color)`, opacity 0.4 (subtle accent bar)

---

## Resume Section (CV)

The resume section mimics a traditional PDF resume layout:

### Design Principles
- Uses **Calibri** font exclusively (with Carlito as free fallback)
- No card background or outer border — clean document style
- Only border: thin `1px solid var(--text-muted)` under section headings
- Tight, consistent spacing (24px between sections, 14px between items, 4px within)

### Structure
1. **Header**: Centered name (uppercase, large) + contact bar with bullet separators + download PDF button
2. **Summary**: Single paragraph
3. **Experience**: Company (bold uppercase) | Location, then Title + Date (right-aligned), bullet highlights
4. **Skills**: Two-column grid, bold label + comma-separated values
5. **Education**: Institution (bold uppercase) | Location, school (italic), degree (uppercase) + date
6. **Publications**: Bulleted list, title in italics

### Responsive (mobile < 600px)
- Contact bar stacks vertically (no bullet separators)
- Skills grid becomes single column
- Item rows stack (date below title)
- Reduced padding

---

## File Structure

| File | Purpose |
|------|---------|
| `src/App.css` | Complete design system: variables, layout, all component styles |
| `src/Components/blog.css` | Blog/writing article styles (uses theme variables) |
| `src/Components/SubComponents/AnimatedRobot.css` | Robot animation styles |
| `src/index.css` | Minimal body resets |

---

## Key Rules

1. **No color beyond grayscale** — all accents are white/black/gray. No gold (#FFC000), no blue, no colored highlights.
2. **Minimal borders** — prefer subtle borders only where needed for separation. Avoid double borders or heavy lines.
3. **Consistent spacing** — use the spacing tokens. Don't mix arbitrary pixel values with token values.
4. **Font discipline** — Space Grotesk for headings only, Inter for body, Calibri for resume section only.
5. **Theme-aware** — always use CSS custom properties for colors. Never hardcode light/dark values.
6. **Professional tone** — clean, minimal, no flashy effects or animations beyond subtle hover transitions.
