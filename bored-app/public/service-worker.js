const CACHE_NAME = "bored-app-cache-v1";
const urlsToCache = [
  "/",                 // index.html
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/src/assets/logo.png" // любые реальные статические файлы
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache).catch(err => console.error('Cache addAll failed:', err)))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
