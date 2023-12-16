const THEBYTE = "the-byte-v1";

var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-v' + THEBYTE
};


const assets = [
    "/",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(THEBYTE).then(cache => {
      return cache.addAll(assets)
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
});

