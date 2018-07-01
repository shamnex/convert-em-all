//THIS SERVICE WORKER FILE IS IGNORED DURING WEBPACK"S BUNDLING
// IT'S COPIED DIRECTLY INTO THE 'dist' FOLDER ROOT

const CACHE_STATIC = "konvatam-skeleton-v79";
// const CACHE_DYNAMIC = "konvatam-dynamic";
const APP_SHELL_URLS = [
    '',
    'index.html',
    'css/style.css',
    'img/bg_pattern_white.svg',
    'img/bg_pattern.svg',
    'scripts/bundle.js',
].map(url => self.registration.scope+url).concat([
    'https://fonts.gstatic.com/s/raleway/v12/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwIYqWqZPANqczVs.woff2'
])

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
                    if (key !== CACHE_STATIC) {
                        console.log("Removing old cache");
                        return caches.delete(key);
                    }
                }))
            })
    );
});
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});


self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

