// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-8-starter';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/styles/main.css',
  '/assets/scripts/main.js',
  '/assets/scripts/RecipeCard.js',
  '/recipes/1_50-thanksgiving-side-dishes.json',
  '/recipes/2_roasting-turkey-breast-with-stuffing.json',
  '/recipes/3_moms-cornbread-stuffing.json',
  '/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
  '/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
  '/recipes/6_one-pot-thanksgiving-dinner.json',
];

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // B6. TODO - Add all of the URLs from RECIPE_URLs here so that they are
      //            added to the cache when the ServiceWorker is installed
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      // B8. Return cached version if found, otherwise fetch and cache it
      return cache.match(event.request).then(function (cachedResponse) {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then(function (networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});