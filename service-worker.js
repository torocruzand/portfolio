/**
 * torocruzand.com service worker.
 *
 * Strategies:
 *   navigations   network-first → cached page → cached "/" → offline.html
 *   css / js      stale-while-revalidate (instant, refreshed in background)
 *   images        cache-first, filled on demand
 *   cross-origin  untouched (never cached)
 */

const VERSION = 'v5';
const CACHE_NAME = `portfolio-core-${VERSION}`;
const IMAGE_CACHE = `portfolio-images-${VERSION}`;

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles.css',
  '/main.js',
  '/i18n.js',
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

// Project artwork is pre-cached too, so the whole portfolio works offline.
const PROJECT_IMAGES = [
  '/images/projects/photon-json.jpg',
  '/images/projects/drag-drop-ide.jpg',
  '/images/projects/tiny-color.jpg',
  '/images/projects/touch-gestures.jpg',
  '/images/projects/dev-guides.jpg',
  '/images/projects/accreditation-uho.jpg',
  '/images/projects/forum-uho.jpg',
  '/images/projects/DPM.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)),
      caches.open(IMAGE_CACHE).then((cache) => cache.addAll(PROJECT_IMAGES)),
    ]).then(() => self.skipWaiting())
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
      .then(() => (self.registration.navigationPreload ? self.registration.navigationPreload.enable() : null))
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
        const preload = await event.preloadResponse;
        const response = preload || await fetch(request);
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
      cache.match(request, { ignoreSearch: true }).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});
