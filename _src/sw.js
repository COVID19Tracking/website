(function() {
	"use strict";

	const version = "1";
	const cacheName = version + "::ctracker:";

	const staticCacheName = cacheName + "static";
	const pagesCacheName = cacheName + "pages";
	const imagesCacheName = cacheName + "images";

	const offlinePages = [
		"/"
	];
	const staticAssets = [
		'/_assets/css/fonts/Webfont.woff2'
	];

	function updateStaticCache() {
		// These items won't block the installation of the Service Worker
		caches.open( staticCacheName )
			.then( cache => {
				// These items must be cached for the Service Worker to complete installation
				return cache.addAll( offlinePages.map( url => new Request( url, { credentials: 'include' } ) ) );
			});

		// These items must be cached for the Service Worker to complete installation
		return caches.open( staticCacheName )
			.then( cache => {
				return cache.addAll( staticAssets.map( url => new Request( url, { credentials: 'include' } ) ) );
			});
	}

	function stashInCache( cacheName, request, response ) {
		caches.open( cacheName )
			.then( cache => cache.put(request, response ) );
	}

	// Limit the number of items in a specified cache.
	function trimCache( cacheName, maxItems ) {
		caches.open( cacheName )
			.then( cache => {
				cache.keys()
					.then( keys => {
						if ( keys.length > maxItems ) {
							cache.delete( keys[ 0 ] )
								.then( trimCache( cacheName, maxItems ) );
						}
					} );
			});
	}

	// Remove caches whose name is no longer valid
	function clearOldCaches() {
		return caches.keys()
			.then( keys => {
				return Promise.all( keys
					.filter( key => key.indexOf( version ) !== 0)
					.map( key => caches.delete( key ) )
				);
			});
	}

	// Events!
	self.addEventListener( "message", event => {
		if ( event.data.command == "trimCaches" ) {
			trimCache( pagesCacheName, 35 );
			trimCache( imagesCacheName, 20 );
		}

		if ( event.data == "getCached" ) {
			caches.open( pagesCacheName ).then(function(cache) {
				return cache.keys().then(function(requests) {
					var urls = requests.filter(function(request){
						return request.url.indexOf("/offline/") === -1;
					}).map(function(request) {
						return request.url;
					});
					return urls.sort();
				}).then(function(urls) {
					event.ports[0].postMessage({
						"offline" : true,
						"urls" : urls
					});
				});
			});
		}
	});

	self.addEventListener( "install", event => {
		event.waitUntil( updateStaticCache()
			.then( () => self.skipWaiting() )
		);
	});

	self.addEventListener( "activate", event => {
		event.waitUntil( clearOldCaches()
			.then( () => self.clients.claim() )
		);
	});

	self.addEventListener( "fetch", event => {
		let request = event.request;
		let client = event.clientId;
		let url = new URL( request.url );

		// Ignore non-GET requests
		if ( request.method !== "GET" ) {
			return;
		}

		// For HTML requests, try the network first, fall back to the cache, finally the offline page
		if ( request.headers.get( "Accept" ).indexOf( "text/html" ) !== -1 ) {

			// Ignore query-string’d requests
			if ( request.url.indexOf( "?" ) !== -1 ) {
				return;
			}

			event.respondWith(
				fetch( request )
					.then( response => {
						// NETWORK
						// Stash a copy of this page in the pages cache
						let copy = response.clone();
						if ( offlinePages.includes( url.pathname ) || offlinePages.includes( url.pathname + "/" ) ) {
							stashInCache( staticCacheName, request, copy );
						} else {
							stashInCache( pagesCacheName, request, copy );
						}
						return response;
					} )
					.catch( () => {
						// CACHE or FALLBACK
						return caches.match( request )
							.then( response => response || caches.match( "/offline/" ) );
					} )
			);
			return;

		}

		// For non-HTML requests, look in the cache first, fall back to the network
		event.respondWith(
			caches.match( request )
				.then( response => {
					// CACHE
					return response || fetch( request )
						.then( response => {
							// NETWORK
							// If the request is for an image, stash a copy of this image in the images cache
							if ( request.headers.get( "Accept" ).indexOf( "image" ) !== -1 ) {
								let copy = response.clone();
								stashInCache( imagesCacheName, request, copy );
							}
							return response;
						})
						.catch( () => {
							// OFFLINE
							// If the request is for an image, show an offline placeholder
							if ( request.headers.get( "Accept" ).indexOf( "image" ) !== -1 ) {
								//return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="75"></svg>', {headers: {"Content-Type": "image/svg+xml", "Cache-Control": "no-store"}});
							}
						});
				})
		);
	});
} )();