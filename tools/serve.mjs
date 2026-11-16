#!/usr/bin/env node
/**
 * Local dev server — zero dependencies, Node 18+.
 *
 *   node tools/serve.mjs [port]      → http://localhost:8000
 *
 * Unlike `python3 -m http.server`, every response carries
 * `Cache-Control: no-cache`, so the browser always revalidates and never
 * pairs a fresh page with a stylesheet it cached from an older version.
 * Missing paths get 404.html with a real 404 status, like production.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.argv[2]) || 8000;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolve(pathname) {
  const file = normalize(join(ROOT, decodeURIComponent(pathname)));
  if (file !== ROOT && !file.startsWith(ROOT + sep)) return null; // no path traversal
  try {
    const info = await stat(file);
    if (info.isDirectory()) return resolve(join(pathname, 'index.html'));
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  let file = null;
  try { file = await resolve(pathname); } catch { /* malformed URI */ }
  const status = file ? 200 : 404;
  file ??= join(ROOT, '404.html');
  res.writeHead(status, {
    'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
    'Cache-Control': 'no-cache',
  });
  res.end(req.method === 'HEAD' ? undefined : await readFile(file));
  console.log(status, req.method, req.url);
}).listen(PORT, () => console.log(`Serving ${ROOT} at http://localhost:${PORT}`));
