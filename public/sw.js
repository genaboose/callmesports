const CACHE_NAME = 'cms-v1';
const OFFLINE_URLS = [
  '/',
  '/tracker',
  '/tracker/last-days',
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
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if (res.status === 200 && res.type === 'basic') cache.put(req, resClone);
          });
          return res;
        })
        .catch(() => caches.match('/'))
    })
  );
});