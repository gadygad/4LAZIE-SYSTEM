// push-subscription.js
let vapidPublicKey = null;

async function checkAndPromptPush() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return; // Push not supported
    }

    // Check existing permission
    if (Notification.permission === 'granted') {
        subscribeUserToPush();
        return;
    }

    if (Notification.permission === 'denied') {
        return;
    }

    // Check if we already showed the prompt recently (e.g. stored in localStorage)
    if (localStorage.getItem('pushPromptDismissed') === 'true') {
        return;
    }

    // Show custom prompt ("uchawi wa kiwango cha juu")
    const promptModal = new bootstrap.Modal(document.getElementById('pushNotificationPrompt'));
    promptModal.show();
    
    document.getElementById('btnAllowPush').addEventListener('click', async () => {
        promptModal.hide();
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            subscribeUserToPush();
        } else {
            localStorage.setItem('pushPromptDismissed', 'true');
        }
    });

    document.getElementById('btnDenyPush').addEventListener('click', () => {
        promptModal.hide();
        localStorage.setItem('pushPromptDismissed', 'true');
    });
}

async function subscribeUserToPush() {
    try {
        const registration = await navigator.serviceWorker.ready;
        let subscription = await registration.pushManager.getSubscription();
        
        if (!subscription) {
            // Fetch public key
            if (!vapidPublicKey) {
                const response = await fetch('/api/notifications/public-key');
                if(!response.ok) return;
                const data = await response.json();
                vapidPublicKey = data.publicKey;
            }

            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            });
        }
        
        // Send subscription to backend
        await fetch('/api/notifications/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
        });
        
    } catch (e) {
        console.error('Failed to subscribe to push notifications', e);
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Check after page load
window.addEventListener('load', () => {
    setTimeout(checkAndPromptPush, 3000); // Wait 3 seconds before showing the prompt
});
