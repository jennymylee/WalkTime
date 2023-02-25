// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { getDatabase, ref, set } from "firebase/database";

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
  appId: "1:27807163134:web:192696828b558d4f053baf",
  databaseURL: "https://walktime-125.us-east1.firebasedatabase.app"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = getDatabase(app);
// const dbRef = firebase.database().ref();
const historyRef = ref(db, "history");
const scheduleRef = ref(db, "schedule");


export function addNewHistory(userId, startTime, endTime, date){
  set(historyRef, {
    userId: userId,
    startTime: startTime,
    endTime: endTime,
    date: date
  })
}

export function readHistory(userId) {

}

export function addNewSchedule(userId, startTime, endTime, dayOfWeek){
  set(scheduleRef, {
    userId: userId,
    startTime: startTime,
    endTime: endTime,
    dayOfWeek: dayOfWeek
  })
}

export function readSchedule(userId) {

}
export { auth };