/* Itinéraire Saxo — cache minimal : la fiche reste consultable sans réseau.
   Les tuiles de carte et la météo, elles, exigent une connexion. */
const CACHE = "itineraire-v1";
const SHELL = ["./","./index.html","./manifest.json","./favicon.svg","./favicon-32.png",
               "./apple-touch-icon.png","./icon-192.png","./icon-512.png","./icon-512-maskable.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;  // tuiles, météo, géocodage : réseau direct
  e.respondWith(
    caches.match(e.request).then(hit => {
      const net = fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;          // cache d'abord, mise à jour en arrière-plan
    })
  );
});
