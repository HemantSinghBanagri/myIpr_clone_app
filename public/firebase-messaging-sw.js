// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//     apiKey: "AIzaSyCcojRc2JU8T_YtEIkoNH3ea825y-BVicE",
//     authDomain: "myipr-da511.firebaseapp.com",
//     databaseURL: "https://myipr-da511-default-rtdb.firebaseio.com",
//     projectId: "myipr-da511",
//     storageBucket: "myipr-da511.appspot.com",
//     messagingSenderId: "514538298997",
//     appId: "1:514538298997:web:c9f5fd04d14320435ca23c",
//     measurementId: "G-78WPLEHLY0"
//   };
// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);
//  // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });