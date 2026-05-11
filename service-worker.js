// Push-only service worker.
//
// Important: do NOT intercept fetches or cache /api/*.
// Previous SW versions caused stale auth state.

// Update this string whenever you want to invalidate caches.
self.__PLATELY_SW_VERSION__ = "1.0.19.29";
const CACHE_VERSION = self.__PLATELY_SW_VERSION__;
const STATIC_CACHE = `plately-static-${CACHE_VERSION}`;
const HTML_CACHE = `plately-html-${CACHE_VERSION}`;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // Cleanup old caches
    try {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => (k.startsWith("plately-static-") && k !== STATIC_CACHE) || (k.startsWith("plately-html-") && k !== HTML_CACHE))
          .map((k) => caches.delete(k))
      );
    } catch {
      // ignore
    }
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event?.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (!req || req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }

  // Only same-origin.
  if (url.origin !== self.location.origin) return;

  // NEVER cache API or auth endpoints.
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname.startsWith("/auth/")) return;

  const accept = req.headers.get("accept") || "";
  const isHtmlNav = req.mode === "navigate" || accept.includes("text/html");
  const cacheName = isHtmlNav ? HTML_CACHE : STATIC_CACHE;

  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);

    // HTML must prefer the network so deployed UI changes are visible quickly.
    if (isHtmlNav) {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          await cache.put(req, fresh.clone());
          return fresh;
        }
      } catch {
        // fall back to cached shell below
      }
      return cached || Response.error();
    }

    const fetchAndUpdate = (async () => {
      try {
        const resp = await fetch(req);
        if (!resp || !resp.ok) return resp;
        const cc = resp.headers.get("cache-control") || "";
        if (/\bno-store\b/i.test(cc)) return resp;
        await cache.put(req, resp.clone());
        return resp;
      } catch {
        return null;
      }
    })();

    if (cached) {
      // Stale-while-revalidate
      event.waitUntil(fetchAndUpdate);
      return cached;
    }

    const fresh = await fetchAndUpdate;
    if (fresh) return fresh;
    return cached || Response.error();
  })());
});

self.addEventListener("push", (event) => {
  const fallback = { title: "Plately", body: "", url: "/", imageUrl: "" };
  let data = fallback;
  try {
    if (event?.data) {
      data = { ...fallback, ...(event.data.json() || {}) };
    }
  } catch {
    data = fallback;
  }

  const title = String(data.title || fallback.title);
  const body = String(data.body || "");
  const url = String(data.url || "/");
  const imageUrl = String(data.imageUrl || "");

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/assets/icon-192.png",
      badge: "/assets/icon-192.png",
      image: imageUrl || undefined,
      actions: [
        { action: "open", title: "Open" },
        { action: "view", title: "Bekijk nieuw" },
      ],
      data: { url },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification?.close?.();
  const url = event?.notification?.data?.url || "/";
  const action = String(event?.action || "");

  event.waitUntil(
    (async () => {
      const windowClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of windowClients) {
        try {
          if ("focus" in client) {
            await client.focus();
          }
          if ("navigate" in client) {
            await client.navigate(url);
          }
          return;
        } catch {
          // keep searching
        }
      }
      if (action === "open" || action === "view" || !action) {
        await self.clients.openWindow(url);
      }
    })()
  );
});
