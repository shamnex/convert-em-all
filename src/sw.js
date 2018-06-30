const CACHE_STATIC = "konvatam-skeleton-v36";
const CACHE_DYNAMIC = "konvatam-dynamic";
const APP_SHELL_URLS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/img/bg_pattern_white.svg',
    '/img/bg_pattern.svg',
    '/scripts/bundle.js',
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_STATIC)
            .then((cache) => cache.addAll(APP_SHELL_URLS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(keysArray => {
                return Promise.all(keysArray.map((key) => {
                    if (key !== CACHE_STATIC && key !== CACHE_DYNAMIC ) {
                        console.log("Removing old cache");
                        return caches.delete(key);
                    }
                }))
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then((res) => {
                            return caches.open(CACHE_DYNAMIC)
                                .then((cache) => {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        }).catch((error) => {

                        })
                }
            })
    );
});
