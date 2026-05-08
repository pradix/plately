// Push-only service worker.
//
// Important: do NOT intercept fetches or cache /api/*.
// Previous SW versions caused stale auth state.

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event?.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
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
