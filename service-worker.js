const CACHE_NAME = 'speech-app-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://i.postimg.cc/WzQrTJZ6/1755662190323.jpg',
  'https://i.postimg.cc/43Vmrynn/1755590954026.jpg',
  'https://i.postimg.cc/HnZxQ7vv/1755590954073.jpg',
  'https://i.postimg.cc/QdV6kGCf/1755590953971.jpg',
  'https://i.postimg.cc/c4zCCwnr/1755590953918.jpg',
  'https://i.postimg.cc/jd1XXbcg/Screenshot-2025-08-19-17-39-39-903-com-miui-gallery-edit.jpg',
  'https://i.postimg.cc/v8JHdbFV/file-00000000000061f7a3509f32dfcc86f5.png'
];

// ติดตั้ง Service Worker และ cache ไฟล์
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// activate SW และลบ cache เก่า
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// ดัก fetch request
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});