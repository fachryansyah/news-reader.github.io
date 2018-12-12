const CACHE_NAME = "firstpwa-v3.1";
var urlsToCache = [
	'/',
	'/icon.png',
	'/nav.html',
	'/index.html',
	'/article.html',
	'/pages/home.html',
	'/pages/about.html',
	'/pages/contact.html',
	'/css/materialize.min.css',
	'/js/materialize.min.js',
	"/js/api.js",
	'/js/nav.js'
]

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache){
			return cache.addAll(urlsToCache)
		})
	)
})

self.addEventListener('fetch', function(event){
	var base_url = "https://readerapi.codepolitan.com/"

	if (event.request.url.indexOf(base_url) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function(cache){
				return fetch(event.request).then(function(response){
					cache.put(event.request.url, response.clone())
					return response
				})
			})
		)
	}else{
		event.respondWith(
			caches.match(event.request).then(function(response){
				return response || fetch (event.request)
			})
		)
	}

})

self.addEventListener("activate", function(event){
	event.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(
				cacheNames.map(function(cacheName){
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus")
						return caches.delete(cacheName)
					}
				})
			)
		})
	)
})


self.addEventListener('notificationclick', function (event) {
	if (!event.action) {
	    // Penguna menyentuh area notifikasi diluar action
	    console.log('Notification Click.');
	    return;
	}
  	switch (event.action) {
	    case 'yes-action':
	      console.log('Pengguna memilih action yes.');
	      // buka tab baru
	      clients.openWindow('https://google.com');
	      break;
	    case 'no-action':
	      console.log('Pengguna memilih action no');
	      break;
	    default:
	      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
	      break;
  	}
});

self.addEventListener('push', function(event){
	var body

	if (event.data) {
		body = event.data.text()
	}else{
		body = "PUsh message no payload"
	}

	var options = {
		body: body,
		icon: 'icon.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	}

	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	)
})