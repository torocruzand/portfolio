#!/usr/bin/env node
/**
 * Pre-renders the Spanish and Portuguese pages from index.html + i18n.js.
 *
 *   node tools/prerender.mjs        → es/index.html, pt/index.html
 *
 * index.html (English) stays the single hand-edited source. Every element
 * with data-i18n="key" must be a leaf (text only); its text is replaced with
 * the translation, data-i18n-aria values become translated aria-labels, and
 * the <head> gets per-language lang, title, description, canonical, og:url
 * and og:locale. The run fails if any hook is left untranslated.
 *
 * index.html (and so es/, pt/) gets styles.css inlined and minified in a
 * <style data-inline="styles.css"> block, refreshed on every run — edit
 * styles.css, never that block.
 *
 * It also stamps cache-busting versions: a short content hash of styles.css,
 * main.js and i18n.js is written as ?v=<hash> on every page that loads them
 * (index.html, es/, pt/, 404, 500, offline) and as ASSET_V in service-worker.js,
 * so browsers, the service worker and any CDN never pair new HTML with an
 * old stylesheet. Run it after every change to those files.
 * Zero dependencies — Node 18+.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { dict } = await import(join(ROOT, 'i18n.js'));
const SITE = 'https://torocruzand.com';

// ---- Cache-busting stamp -------------------------------------------------
const hash = createHash('sha256');
// Icons and the manifest are in the hash too, so a new logo rotates the service worker's caches.
for (const f of ['styles.css', 'main.js', 'i18n.js', 'manifest.webmanifest', 'images/favicon.svg', 'images/favicon.ico',
  'images/apple-touch-icon.png', 'images/icon-192.png', 'images/icon-512.png', 'images/icon-maskable-512.png']) {
  hash.update(readFileSync(join(ROOT, f)));
}
const V = hash.digest('hex').slice(0, 10);
const stamp = (html) => html.replace(/(["'])\/(styles\.css|main\.js|i18n\.js)(?:\?v=[\w-]+)?\1/g, `$1/$2?v=${V}$1`);

// ---- Inline, minified CSS for the main pages ------------------------------
// The one-page site ships its stylesheet inside the HTML: no render-blocking
// request, so the first paint needs a single round trip. 404/500/offline keep
// the versioned /styles.css link (the service worker precaches it).
function minifyCss(css) {
  // Split into [code, string, code, string, …] so strings stay byte-for-byte.
  const parts = [];
  let code = '';
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < css.length && css[j] !== c) j += css[j] === '\\' ? 2 : 1;
      parts.push(code, css.slice(i, j + 1));
      code = '';
      i = j;
    } else if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end === -1 ? css.length : end + 1;
    } else {
      code += c;
    }
  }
  parts.push(code);
  return parts.map((part, k) => (k % 2 ? part : part
    .replace(/\s+/g, ' ')
    .replace(/ ?([{};,>]) ?/g, '$1')               // never touches + or - (calc needs them spaced)
    .replace(/: /g, ':')
    .replace(/;}/g, '}'))).join('').trim();
}
const inlineCss = `<style data-inline="styles.css">${minifyCss(readFileSync(join(ROOT, 'styles.css'), 'utf8'))}</style>`;
const inlineStyles = (html) => html.replace(
  /<link rel="stylesheet" href="\/styles\.css(?:\?v=[\w-]+)?">|<style data-inline="styles\.css">[^<]*<\/style>/,
  () => inlineCss);

for (const f of ['index.html', '404.html', '500.html', 'offline.html']) {
  const p = join(ROOT, f);
  let html = stamp(readFileSync(p, 'utf8'));
  if (f === 'index.html') html = inlineStyles(html);
  writeFileSync(p, html);
}
{
  const p = join(ROOT, 'service-worker.js');
  const sw = readFileSync(p, 'utf8');
  if (!/const ASSET_V = '[\w-]+';/.test(sw)) throw new Error('service-worker.js: ASSET_V line not found');
  writeFileSync(p, sw.replace(/const ASSET_V = '[\w-]+';/, `const ASSET_V = '${V}';`));
}
console.log(`asset version ${V}`);

const source = readFileSync(join(ROOT, 'index.html'), 'utf8');

const LOCALES = {
  es: { html: 'es', og: 'es_ES', alt: ['en_US', 'pt_BR'] },
  pt: { html: 'pt-BR', og: 'pt_BR', alt: ['en_US', 'es_ES'] },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

function render(code) {
  const t = (key) => {
    const value = dict[code][key] ?? dict.en[key];
    if (value === undefined) throw new Error(`[${code}] missing key: ${key}`);
    return value;
  };
  const meta = LOCALES[code];
  let html = source;
  const total = (html.match(/\sdata-i18n="/g) || []).length;
  let done = 0;

  // Leaf text nodes: <tag ... data-i18n="key" ...>text</tag>
  html = html.replace(/<([a-z0-9]+)(\s(?:[^>]*?\s)?data-i18n="([^"]+)"[^>]*)>([^<]*)<\/\1>/g,
    (_, tag, attrs, key) => { done++; return `<${tag}${attrs}>${esc(t(key))}</${tag}>`; });
  if (done !== total) throw new Error(`[${code}] translated ${done}/${total} data-i18n hooks — a hook wraps markup`);

  // aria-labels: "Literal|key" or "key"
  html = html.replace(/aria-label="[^"]*"((?:\s[^>]*?)?)\sdata-i18n-aria="([^"]+)"/g, (_, between, spec) => {
    const parts = spec.split('|');
    const label = parts.length > 1 ? `${parts[0]}: ${t(parts[1])}` : t(parts[0]);
    return `aria-label="${escAttr(label)}"${between} data-i18n-aria="${spec}"`;
  });
  html = html.replace(/(<[^>]*\sdata-i18n-aria="([^"|]+)"[^>]*?)(\/?>)/g, (m, open, key, end) =>
    /aria-label=/.test(open) ? m : `${open} aria-label="${escAttr(t(key))}"${end}`);

  // <head>
  const url = `${SITE}/${code}/`;
  html = html
    .replace('<html lang="en"', `<html lang="${meta.html}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(t('meta.title'))}</title>`)
    .replace(/(<meta name="description"\s+content=")[^"]*(")/, `$1${escAttr(t('meta.description'))}$2`)
    .replace(/(<meta property="og:description"\s+content=")[^"]*(")/, `$1${escAttr(t('meta.description'))}$2`)
    .replace(/(<meta name="twitter:description"\s+content=")[^"]*(")/, `$1${escAttr(t('meta.description'))}$2`)
    .replace('<link rel="canonical" href="https://torocruzand.com/">', `<link rel="canonical" href="${url}">`)
    .replace('<meta property="og:url" content="https://torocruzand.com/">', `<meta property="og:url" content="${url}">`)
    .replace(/<meta property="og:locale" content="en_US">\n\s*<meta property="og:locale:alternate" content="es_ES">\n\s*<meta property="og:locale:alternate" content="pt_BR">/,
      [`<meta property="og:locale" content="${meta.og}">`, ...meta.alt.map((a) => `<meta property="og:locale:alternate" content="${a}">`)].join('\n  '))
    .replace('"url": "https://torocruzand.com/",\n        "name": "Torocruzand\'s Portfolio",',
      `"url": "${url}",\n        "name": "Torocruzand's Portfolio",`)
    .replace(/(<a [^>]*href=")\/cv\/Andres-del-Toro-Cruz-CV-EN\.pdf"/g, `$1/cv/Andres-del-Toro-Cruz-CV-${code.toUpperCase()}.pdf"`);

  const banner = `<!-- Generated by tools/prerender.mjs from index.html + i18n.js — do not edit by hand. -->\n`;
  return html.replace('<!DOCTYPE html>\n', `<!DOCTYPE html>\n${banner}`);
}

for (const code of Object.keys(LOCALES)) {
  const out = join(ROOT, code, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(code));
  console.log(`wrote ${code}/index.html`);
}
