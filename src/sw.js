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
        caches.open("konvatam-skeleton-1")
            .then((cache) => cache.addAll(APP_SHELL_URLS))
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
                            return caches.open("konvatam-dynamic")
                                .then((cache) => {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        }).catch((error)=> {
                            
                        })
                }
            })
    );
});
