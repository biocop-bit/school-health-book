const CACHE_NAME = 'my-book-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/chapter1.html',
  '/images/cover.png',
  '/videos/intro.mp4'
];

// هذا الجزء يحدد ما يجب تخزينه
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// هذا الجزء يسمح للمتصفح باستخدام الملفات المخزنة بدلاً من الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});