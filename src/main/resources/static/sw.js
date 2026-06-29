self.addEventListener('push', function(event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/images/icon-192x192.png',
            badge: '/images/badge-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2',
                url: data.url || '/'
            },
            actions: [
                {action: 'explore', title: 'Open Now', icon: '/images/checkmark.png'},
                {action: 'close', title: 'Close', icon: '/images/xmark.png'},
            ]
        };
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    if (event.action !== 'close') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});
