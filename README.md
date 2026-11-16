# torocruzand.com — The Living Compiler & Telemetry HUD

Personal portfolio of **Andrés del Toro Cruz** (`@TOROCRUZAND`). Zero dependencies: hand-written HTML5, CSS and ES modules. No build step, no runtime packages.

## Architecture

| File | Role |
| --- | --- |
| `index.html` | Semantic document: HUD header and footer, six `<section aria-labelledby>` regions (hello, about, projects, experience, skills, contact), JSON-LD (`Person`, `ProfilePage` listing each public project), `<dialog>` terminal |
| `styles.css` | `@layer reset, tokens, layout, components, utilities, animations`; carbon and paper-blueprint themes; exposed 12-column grid; scroll-driven animations; print stylesheet |
| `main.js` | Single `requestAnimationFrame` engine driving the canvas lattice, telemetry, kinetic headline, reticle cursor and magnetic springs. Also contains the X-ray state machine, CLI and vim navigation, Web Audio synth and theme switching |
| `service-worker.js` | Offline shell (`offline.html`) |

### Runtime layers

1. **Canvas lattice** (`#lattice`, decorative, `aria-hidden`): a spring mesh with animated blocks and data packets. It reacts to cursor velocity and scroll momentum.
2. **Semantic DOM**: every word and link is real HTML, readable by screen readers and crawlers.

### Interactions

- `⌘/Ctrl + K` or `~` opens the terminal. Commands: `help`, `ls`, `inspect <module>`, `xray on|off`, `goto <section>`, `theme blueprint|carbon`, `sound on|off`, `run benchmark`, `whoami`, `contact`, `stats`, `clear`, `exit`.
- `j` / `k` step through sections and modules. `x` toggles the X-ray on the focused module. `gg` jumps to the top and `G` to the bottom. `?` opens help.
- Each project has a **Preview ⇄ Spec** switch. The spec face shows its technologies, categories and download/source links.

### Performance & accessibility

- All loops pause when `document.hidden` is true. The canvas also pauses when an `IntersectionObserver` reports it off screen. Visual systems start in `requestIdleCallback`.
- `prefers-reduced-motion: reduce` switches to **Static Schematic** mode: one frame is drawn, there is no loop, no reticle and no transitions. The switch happens live.
- The theme is set before first paint, so there is no flash and no layout shift. System fonts only, so no font requests.

## Local development

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. ES modules need a server; `file://` will not work.

## Editing content

- Projects: the `<article class="module">` blocks in `index.html`. Keep the matching JSON-LD entry in sync.
- Content mirrors the public copy of torocruzand.com. Only list projects that are already public.
- Terminal commands: `Terminal.defineCommands()` in `main.js`.
