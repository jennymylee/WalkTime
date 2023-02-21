// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfM3zwQ8iC5jRtCVzc9kgCakiT5TLBNW0",
  authDomain: "walktime-ca93a.firebaseapp.com",
  projectId: "walktime-ca93a",
  storageBucket: "walktime-ca93a.appspot.com",
  messagingSenderId: "285601556054",
  appId: "1:285601556054:web:85b3c10f06c06697a4bdf7",
  measurementId: "G-87KZVVWNLK",
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
