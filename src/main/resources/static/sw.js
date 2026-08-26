// Service Worker v10 - Network-First for all dynamic content
const CACHE_NAME = '4lazie-cache-v10';
const OFFLINE_URL = '/offline.html';

// Only cache truly static rarely-changing assets
const urlsToPreCache = [
  OFFLINE_URL,
  '/images/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToPreCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete ALL old caches
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // For Cloudinary files, PDFs, or /download endpoint, use Cache-First
  if (
    requestUrl.pathname.includes('/download/') ||
    requestUrl.hostname.includes('res.cloudinary.com') ||
    requestUrl.pathname.endsWith('.pdf')
  ) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        }).catch(() => {
          return new Response('Offline: Resource not cached.', { status: 503, statusText: 'Service Unavailable' });
        });
      })
    );
    return;
  }

  // For JS, CSS, HTML (application pages), and API calls - ALWAYS Network First
  // This ensures users always get the latest code updates
  if (
    requestUrl.pathname.endsWith('.js') ||
    requestUrl.pathname.endsWith('.css') ||
    event.request.mode === 'navigate' ||
    requestUrl.pathname.startsWith('/api/')
  ) {
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        return networkResponse;
      }).catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('', { status: 503 });
        });
      })
    );
    return;
  }

  // For images - Cache First with network fallback
  if (
    requestUrl.pathname.endsWith('.png') ||
    requestUrl.pathname.endsWith('.jpg') ||
    requestUrl.pathname.endsWith('.jpeg') ||
    requestUrl.pathname.endsWith('.svg') ||
    requestUrl.pathname.endsWith('.webp') ||
    requestUrl.pathname.endsWith('.ico')
  ) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default: Network First, fallback to cache
  event.respondWith(
    fetch(event.request).then(networkResponse => {
      return networkResponse;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('push', event => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'New Notification', body: event.data.text() };
    }
  }
  const title = data.title || 'New Update';
  const options = {
    body: data.body || 'You have new content to check out.',
    icon: '/images/logo.png',
    badge: '/images/logo.png',
    data: { url: data.url || '/', connectUserId: data.connectUserId || null }
  };
  // "New Connection" pushes carry a connectUserId — offer a one-tap
  // "Connect Back" action so the recipient doesn't have to open the app
  // and find the person's profile just to follow back.
  if (data.connectUserId) {
    options.actions = [{ action: 'connect_back', title: 'Connect Back' }];
  }
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const urlToOpen = event.notification.data.url || '/';

  if (event.action === 'connect_back' && event.notification.data.connectUserId) {
    event.waitUntil(
      fetch('/api/connections/' + event.notification.data.connectUserId + '/toggle', {
        method: 'POST', credentials: 'include'
      }).then(() => {
        return self.registration.showNotification('Connected!', {
          body: 'You are now connected.',
          icon: '/images/logo.png',
          badge: '/images/logo.png',
          data: { url: urlToOpen }
        });
      }).catch(() => {})
    );
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
