const cacheName = 'speech-app-cache-v1';
const assetsToCache = [
  './index.html',
  './manifest.json',
  './service-worker.js',
  'https://i.postimg.cc/43Vmrynn/1755590954026.jpg',
  'https://i.postimg.cc/HnZxQ7vv/1755590954073.jpg',
  'https://i.postimg.cc/QdV6kGCf/1755590953971.jpg',
  'https://i.postimg.cc/c4zCCwnr/1755590953918.jpg',
  'https://i.postimg.cc/KzWrJ4Wj/1755590953378.jpg',
  'https://i.postimg.cc/v8JHdbFV/file-00000000000061f7a3509f32dfcc86f5.png',
  'https://i.postimg.cc/26Mr2gBQ/1755595619395.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
