import { db } from "../firebase";
import * as firebase from "firebase";

export async function getHistory(userId) {
  const history = [];

  // get all time blocks given a userId
  let promise = db.collection("history").where("userId", "==", userId).get();
  let dateMap = {};
  let appendingToHistory = promise
    .then((querySnapshot) => {
      // hashmap where key = formatted date str and value = metadata

      querySnapshot.forEach((doc) => {
        // format date string
        let date = doc.data().startTime.toDate();
        let dateString =
          date.toLocaleDateString("en-us", { weekday: "long" }) +
          ", " +
          date.toLocaleDateString();

        if (dateString in dateMap) {
          dateMap[dateString].push({
            startTime: date.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            stepCount: doc.data().stepCount,
            timeElapsed: (
              parseFloat(
                Math.abs(date - doc.data().endTime.toDate()).toString()
              ) / 1000
            ).toFixed(0),
          });
        } else {
          dateMap[dateString] = [
            {
              startTime: date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }),
              stepCount: doc.data().stepCount,
              timeElapsed: (
                parseFloat(
                  Math.abs(date - doc.data().endTime.toDate()).toString()
                ) / 1000
              ).toFixed(0),
            },
          ];
        }
      });

      return dateMap;
    })
    .catch((error) => {
      return;
    });
  await appendingToHistory;

  return dateMap;
}

export async function logWalk(userId, startTime, endTime, stepCount) {
  var newHistoryRef = db.collection("history").doc();

  newHistoryRef.set({
    userId: userId,
    startTime: firebase.firestore.Timestamp.fromDate(startTime),
    endTime: firebase.firestore.Timestamp.fromDate(endTime),
    stepCount: stepCount,
  });
}
