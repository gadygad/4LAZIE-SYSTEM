// Push Notifications Manager

const applicationServerPublicKey = 'BJxSjkOOME9Ly9w1sHMfm4n8pHSTcz1Uj2exMpWz_Pag-hVrc1PTuECHfLmy0RkuMnmW_34kXhj7GyNhha139Zo';

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function subscribeUserToPush() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('Push messaging is not supported');
        return;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        const permission = await window.Notification.requestPermission();
        
        if (permission !== 'granted') {
            console.warn('Permission for notifications not granted');
            return;
        }

        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)
        };

        const pushSubscription = await registration.pushManager.subscribe(subscribeOptions);
        
        // Send subscription to server
        await sendSubscriptionToServer(pushSubscription);
        console.log('Successfully subscribed to push notifications');
        
    } catch (err) {
        console.error('Failed to subscribe the user: ', err);
    }
}

async function sendSubscriptionToServer(subscription) {
    return fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
    });
}

// Automatically try to subscribe when page loads
window.addEventListener('load', () => {
    // Adding a slight delay so it doesn't block page rendering
    setTimeout(() => {
        subscribeUserToPush();
    }, 3000);
});
