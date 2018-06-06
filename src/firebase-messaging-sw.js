importScripts('./build/sw-toolbox.js');

importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '518923687161',
});
const messaging = firebase.messaging();

self.toolbox.options.cache = {
  name: 'budgetify-cache',
};

//pre cace our key assets
self.toolbox.precache([
  './build/main.js',
  './build/main.css',
  './build/polyfills.js',
  './build/vendor.js',
  'index.html',
  'manifest.json',
]);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
