// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs5wD5Ra6OQQz3WUm8ST9GQ6O0tdgZIj4",
  authDomain: "walktime-125.firebaseapp.com",
  projectId: "walktime-125",
  storageBucket: "walktime-125.appspot.com",
  messagingSenderId: "27807163134",
  appId: "1:27807163134:web:192696828b558d4f053baf"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
