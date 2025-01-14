const cache_offline = "offline_1";
const cache_images = "images_1";
const cache_assests = [
    "/css/main.css",
    "/offline.html",
    "/images/offline.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cache_offline).then(cache => {
            return cache.addAll(cache_assests);
        })
            .catch(e => {
                console.log(e);
            })
    );
    self.skipWaiting();
});
self.addEventListener("activate", function (event) {
    var cachesToKeep = [cache_offline, cache_images];
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cachesToKeep.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
self.addEventListener("fetch", function (event) {
    const request = event.request;
    if (request.url.toLowerCase().includes("/images/")) {
        event.respondWith(
            caches.match(request)
                .then((response) => {
                    return response || fetch(request)
                        .then((res) => {
                            caches.open(cache_images)
                                .then((cache) => {
                                    cache.put(request, res);
                                });
                            return res.clone();
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch(console.error)
        )
    }
    if (event.request.mode === 'navigate') {
        return event.respondWith(
            fetch(event.request).catch(() => caches.match("/offline.html"))
        );
    }

});
self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
