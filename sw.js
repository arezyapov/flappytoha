const CACHE_NAME = 'flappytoha-v20';
const ASSETS = [
  './',
  './index.html',
  './flappy.html',
  './runner.html',
  './bird.png',
  './hurt.png',
  './pipe.png',
  './bonus1.png',
  './bonus2.png',
  './bonus3.png',
  './life.png',
  './heart.png',
  './cover.png',
  './zombie.png',
  './runner_char.png',
  './music.mp3',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
