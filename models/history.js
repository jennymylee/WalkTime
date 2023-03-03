import { db } from "../firebase";
import * as firebase from "firebase";

export function addNewHistory(userId, startTime, endTime, stepCount){
    db.collection("history").add({
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      stepCount: stepCount,
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export async function getHistory(userId) {
    let history = [];

    let promise = db.collection("history").where("userId", "==", userId).get();
    let appendingToHistory = promise
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          history.push({
            startTime: doc.data().startTime.toDate(),
            endTime: doc.data().endTime.toDate(),
            steps: doc.data().stepCount,
          });
        });
        return history;
      })
      .catch((error) => {
        return;
      });
    await appendingToHistory;
    return history;
  }
  