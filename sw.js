/* Minimálny service worker — VÝHRADNE pre Chrome PWA installability (Android „Inštalovať aplikáciu").
   Žiadny offline cache, žiadna caching stratégia, žiadne push notifikácie. Fetch je passthrough
   (necachujeme nič — necháme prehliadač spraviť normálny sieťový request).
   Súbor MUSÍ ležať na úrovni base path (/smecka-launcher/sw.js), aby scope sedel s manifestom. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) { event.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () { /* passthrough — žiadny zásah, žiadny cache */ });
