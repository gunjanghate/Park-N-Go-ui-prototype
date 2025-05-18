self.addEventListener('install', (event) => {
    console.log('Service Worker installed.');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activated.');
  });
  
  self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Background Notification';
    const options = {
      body: data.body || 'This is a notification from the background.',
      icon: '/icon.png', // Ensure this icon exists in the public folder
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/about') // Replace with your desired route
    );
  });
  