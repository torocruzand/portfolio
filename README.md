# torocruzand.com — The Living Compiler & Telemetry HUD

Personal portfolio of **Andrés del Toro Cruz** (`@TOROCRUZAND`). Zero dependencies: hand-written HTML5, CSS and ES modules. No build step, no runtime packages.

## Architecture

| File | Role |
| --- | --- |
| `index.html` | Semantic document: HUD header and footer, six `<section aria-labelledby>` regions (hello, about, projects, experience, skills, contact), JSON-LD (`Person`, `ProfilePage` listing each public project), `<dialog>` terminal |
| `styles.css` | `@layer reset, tokens, layout, components, utilities, animations`; carbon and paper-blueprint themes; exposed 12-column grid; scroll-driven animations; print stylesheet |
| `main.js` | Single `requestAnimationFrame` engine driving the canvas lattice, telemetry, kinetic headline, reticle cursor and magnetic springs. Also contains the X-ray state machine, CLI and vim navigation, Web Audio synth and theme switching |
| `i18n.js` | EN / ES / PT-BR dictionary (mirrors the live-site copy), language detection and `applyLang()` |
| `service-worker.js` | PWA caching: network-first pages, stale-while-revalidate CSS/JS, pre-cached images, `offline.html` fallback |
| `manifest.webmanifest` | Installable PWA: id, standalone display, PNG + maskable icons, shortcuts |

### Runtime layers

1. **Canvas lattice** (`#lattice`, decorative, `aria-hidden`): a spring mesh with animated blocks and data packets. It reacts to cursor velocity and scroll momentum.
2. **Semantic DOM**: every word and link is real HTML, readable by screen readers and crawlers.

### Interactions

- `⌘/Ctrl + K` or `~` opens the terminal. Commands: `help`, `ls`, `inspect <module>`, `xray on|off`, `goto <section>`, `theme blueprint|carbon`, `lang en|es|pt`, `install`, `sound on|off`, `run benchmark`, `whoami`, `contact`, `stats`, `clear`, `exit`.
- `j` / `k` step through sections and modules. `x` toggles the X-ray on the focused module. `gg` jumps to the top and `G` to the bottom. `?` opens help.
- Each project has a **Preview ⇄ Spec** switch. The spec face shows its technologies, categories and download/source links.

### Performance & accessibility

- All loops pause when `document.hidden` is true. The canvas also pauses when an `IntersectionObserver` reports it off screen. Visual systems start in `requestIdleCallback`.
- `prefers-reduced-motion: reduce` switches to **Static Schematic** mode: one frame is drawn, there is no loop, no reticle and no transitions. The switch happens live.
- The theme is set before first paint, so there is no flash and no layout shift. System fonts only, so no font requests.

### Languages & PWA

- The EN / ES / PT switch in the header translates every `data-i18n` node, updates `<html lang>` and the title, and keeps `?lang=es|pt` in the URL. The choice is saved per visitor.
- The site installs as an app (Install button or browser menu) and works fully offline once visited.

### SEO

- `/`, `/es/` and `/pt/` are real pages. `es/` and `pt/` are pre-rendered from `index.html` + `i18n.js` with translated text, `<html lang>`, title, description, a self-referencing canonical, and `og:locale` already in the HTML, so crawlers and link previews never depend on JavaScript.
- `hreflang` alternates (plus `x-default`) are declared in every page and in `sitemap.xml`; `robots.txt` points to the sitemap.
- Social cards use `images/og-image.png` (1200×630, `summary_large_image`). JSON-LD declares `Person`, `WebSite` and `ProfilePage`, with each public project.

**After editing `index.html`, `i18n.js`, `styles.css` or `main.js`, run:**

```bash
node tools/prerender.mjs
```

It regenerates `es/` and `pt/`, and stamps a content hash on every asset URL (`/styles.css?v=…`, `/main.js?v=…`, `i18n.js`) and on the service worker's cache. A changed file therefore always gets a new URL, so no browser, service worker or CDN can serve new HTML with an old stylesheet, and deploys need no cache purge. The script fails if any `data-i18n` hook can't be translated (every hook must wrap plain text only).

## Local development

```bash
node tools/serve.mjs
```

Open `http://localhost:8000`. ES modules need a server; `file://` will not work. Prefer this over `python3 -m http.server`: it sends `Cache-Control: no-cache` (Python sends no cache headers, so browsers reuse old copies of pages and styles) and serves `404.html` for missing paths.

## Editing content

- Projects: the `<article class="module">` blocks in `index.html`. Keep the matching JSON-LD entry in sync.
- Content mirrors the public copy of torocruzand.com. Only list projects that are already public.
- Terminal commands: `Terminal.defineCommands()` in `main.js`.
