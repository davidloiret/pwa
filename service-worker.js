const CACHE_NAME = 'pwa-cache-v4';
const urlsToCache = [
  '/pwa/',
  '/pwa/index.html',
  '/pwa/assets/style.css',
  '/pwa/assets/back-to-the-future-1920.jpeg',
  '/pwa/assets/index.js',
  '/pwa/manifest.json',
  '/pwa/favicon.ico',
  '/pwa/favicon-16x16.png',
  '/pwa/favicon-32x32.png',
  '/pwa/android-chrome-192x192.png',
  '/pwa/android-chrome-512x512.png',
  '/pwa/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Clean cache
self.addEventListener('activate', event => {
  console.log('Finally active. Ready to serve!');
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('Serving response from the cache');
        return response;
      }
      return (
        fetch(event.request)
          .then(response => caches.open(CACHE_NAME))
          .then(cache => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(response => {
            console.log('Fetch failed, sorry.');
          })
      );
    })
  );
});
