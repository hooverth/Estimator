const CACHE_NAME = 'concrete-estimator-v1';
const urlsToCache = [
    'Estimator.html',
    'style.css', // If you move your styles to a separate CSS file
    'script.js', // If you move your scripts to a separate JS file
    'icon-192x192.png',
    'icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Serve from cache if available
                }
                return fetch(event.request); // Otherwise, fetch from network
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Clean up old caches
                    }
                })
            );
        })
    );
});