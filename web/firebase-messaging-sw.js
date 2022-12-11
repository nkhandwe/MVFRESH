importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCrs6-uoizswlxnBW3L67gFvg3WewQKdkA",
    authDomain: "mvfresh-26bbc.firebaseapp.com",
    projectId: "mvfresh-26bbc",
    storageBucket: "mvfresh-26bbc.appspot.com",
    messagingSenderId: "386085138963",
    appId: "1:386085138963:web:2f999768bf471a894185e6",
    databaseURL: "...",
});


const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
            };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});