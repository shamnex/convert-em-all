//THIS SERVICE WORKER FILE IS IGNORED DURING WEBPACK"S BUNDLING
// IT'S COPIED DIRECTLY INTO THE 'dist' FOLDER ROOT

const CACHE_STATIC = "konvatam-skeleton-v64";
const CACHE_DYNAMIC = "konvatam-dynamic";
const APP_SHELL_URLS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/img/bg_pattern_white.svg',
    '/img/bg_pattern.svg',
    '/scripts/bundle.js',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwIYqWqZPANqczVs.woff2'
];


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
                    if (key !== CACHE_STATIC && key !== CACHE_DYNAMIC) {
                        console.log("Removing old cache");
                        return caches.delete(key);
                    }
                }))
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request) //check for match in cache
            .then((cacheResponse) => {
                if (cacheResponse) return cacheResponse; //if theres a match return it
                const requestClone = event.request.clone();
                return fetch(requestClone) //if not fetch from networl
                    .then((networkResponse) => {
                        return caches.open(CACHE_DYNAMIC)// store the res  in cache 
                            .then((cache) => {
                                cache.put(requestClone.url, networkResponse.clone());
                                return networkResponse; // restore clone 
                            });
                    }).catch((error) => {

                    })

            })
    );
});

self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

