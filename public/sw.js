const CACHE_NAME = 'cms-v1';
const OFFLINE_URLS = [
  '/',                    // Startseite
  '/tracker',             // Übersicht
  '/tracker/last-days',   // Dein Last-Days-Tracker
  '/hero.jpg',
  '/logo-banner.png',
  '/logo-128.png',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon-192.png',
  '/favicon-512.png',
  '/favicon-512-maskable.png',
  '/site.webmanifest',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Nur GET cachen
  if (req.method !== 'GET') return;

  // Strategie: Try cache first, then network fallback
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // Dynamisches Caching für statische Dateien
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            // Nur erfolgreiche Antworten cachen
            if (res.status === 200 && res.type === 'basic') cache.put(req, resClone);
          });
          return res;
        })
        .catch(() => {
          // Offline-Fallback: Startseite
          return caches.match('/');
        });
    })
  );
});
