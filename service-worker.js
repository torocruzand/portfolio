/**
 * torocruzand.com service worker.
 *
 * Strategies:
 *   navigations   network-first, revalidated with the server → cached page → cached "/" → offline.html
 *   css / js      stale-while-revalidate, keyed by the ?v= content stamp
 *   images        cache-first, filled on demand
 *   cv/*.pdf      cache-first after first download
 *   cross-origin  untouched (never cached)
 */

// ASSET_V is stamped by tools/prerender.mjs from the CSS/JS content hash.
const ASSET_V = '415aad230d';
const VERSION = `v10-${ASSET_V}`;
const CACHE_NAME = `portfolio-core-${VERSION}`;
const IMAGE_CACHE = `portfolio-images-${VERSION}`;

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/es/',
  '/pt/',
  '/offline.html',
  `/styles.css?v=${ASSET_V}`,
  `/main.js?v=${ASSET_V}`,
  `/i18n.js?v=${ASSET_V}`,
  '/manifest.webmanifest',
  '/images/favicon.ico',
  '/images/favicon.svg',
  '/images/favicon.png',
  '/images/apple-touch-icon.png',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/icon-maskable-512.png',
  '/images/profile.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => ![CACHE_NAME, IMAGE_CACHE].includes(key))
          .map((key) => caches.delete(key))
      ))
      .then(() => (self.registration.navigationPreload ? self.registration.navigationPreload.disable() : null))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: always try the network for fresh content.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // no-cache: always revalidate (cheap 304) so the HTTP cache can never hand
        // back an old page whose markup no longer matches the current stylesheet.
        const response = await fetch(request, { cache: 'no-cache' });
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(url.pathname, copy));
        }
        return response;
      } catch {
        return (await caches.match(url.pathname))
          || (await caches.match('/'))
          || caches.match('/offline.html');
      }
    })());
    return;
  }

  // CV PDFs: cache-first once downloaded, so they open offline too.
  if (url.pathname.startsWith('/cv/') && url.pathname.endsWith('.pdf')) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(request).then((cached) => cached || fetch(request).then((response) => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        })))
    );
    return;
  }

  // Images: cache-first.
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(request).then((cached) => cached || fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => caches.match('/images/icon-192.png')))
      )
    );
    return;
  }

  // Scripts, styles, manifest: stale-while-revalidate.
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cached || Response.error());
        return cached || network;
      })
    )
  );
});
