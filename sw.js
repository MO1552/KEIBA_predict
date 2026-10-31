// 競馬 レース一括予想アプリ: オフライン用 Service Worker
// 更新するときは CACHE の番号を上げてください(例: v3 → v4)
const CACHE = 'keiba-race-app-v3';
const SHELL = ['./index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// キャッシュを先に返し(オフラインでも即起動)、通信できるときは裏で最新版に更新する
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const key = req.mode === 'navigate' ? './index.html' : req;
  const update = fetch(key).then(res => {
    if (res && res.status === 200) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(key, copy));
    }
    return res;
  }).catch(() => null);
  event.waitUntil(update);
  event.respondWith(
    caches.match(key, { ignoreSearch: true }).then(cached => cached || update.then(r => r || caches.match('./index.html')))
  );
});
