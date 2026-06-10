const CACHE_OFFLINE = "offline";
const CACHE_IMAGES = "images";

const CACHE_ASSETS = [
    "/css/main.css",
    "/offline.html",
    "/images/offline.jpg",
    "/images/box.png",
    "/images/icons/icon-16x16.png",
    "/images/icons/icon-32x32.png",
    "/images/icons/icon-36x36.png",
    "/images/icons/icon-48x48.png",
    "/images/icons/icon-57x57.png",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
    "/images/icons/icon-114x114.png",
    "/images/icons/icon-120x120.png",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-180x180.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-512x512.png",
];

const APP_VERSION = "0.0.3";

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(keys.map((key) => caches.delete(key)));

            const cache = await caches.open(CACHE_OFFLINE);
            await cache.addAll(CACHE_ASSETS);

            await self.skipWaiting();
        })()
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            await self.clients.claim();

            const clients = await self.clients.matchAll({ includeUncontrolled: true });
            for (const client of clients) {
                client.postMessage({
                    type: "SW_UPDATED",
                    version: APP_VERSION,
                });
            }
        })()
    );
});


self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);

    if (url.pathname.toLowerCase().startsWith("/images/")) {
        event.respondWith(
            (async () => {
                const cached = await caches.match(request);
                if (cached) return cached;

                const res = await fetch(request);
                const cache = await caches.open(CACHE_IMAGES);
                await cache.put(request, res.clone());
                return res;
            })()
        );
        return;
    }

    if (request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    return await fetch(request);
                } catch {
                    return (await caches.match("/offline.html")) || Response.error();
                }
            })()
        );
        return;
    }
});

self.addEventListener("message", (event) => {
    if (event.data?.action === "skipWaiting") {
        self.skipWaiting();
    }
});
