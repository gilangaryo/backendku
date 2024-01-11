const firebase = require("firebase");
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyAx_TjUwKVveiyLjlmKuQHayjLMNhyYaMw",
  authDomain: "belajarin-ac6fd.firebaseapp.com",
  projectId: "belajarin-ac6fd",
  storageBucket: "belajarin-ac6fd.appspot.com",
  messagingSenderId: "256761147201",
  appId: "1:256761147201:web:f360f4bb7b1d82ad0fbbc0",
  measurementId: "G-367E7RGK43"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();


// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.



initializeApp();


module.exports = db;


