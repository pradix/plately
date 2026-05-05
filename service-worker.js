// Self-destructing service worker.
// Previous versions intercepted and cached same-origin GET requests including
// /api/session, which caused stale auth state to be served after login.
// This SW unregisters itself, deletes all caches, and reloads any open clients
// so the page reverts to direct network fetches with no SW in between.

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) {
        client.navigate(client.url).catch(() => {});
      }
    })()
  );
});
