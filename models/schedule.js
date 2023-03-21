import { db } from "../firebase";
import * as firebase from "firebase";

export async function getSchedule(userId) {
  const schedule = {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };

  // get all time blocks given a userId
  let promise = db.collection("schedule").where("userId", "==", userId).get();

  let appendingToSchedule = promise
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // append to schedule
        schedule[doc.data().dayOfWeek].push({
          startTime: doc.data().startTime.toDate(),
          endTime: doc.data().endTime.toDate(),
        });
      });
      return schedule;
    })
    .catch((error) => {
      return;
    });
  await appendingToSchedule;

  return schedule;
}

export function saveNewScheduleToDB(userId, currentDayTimes, currentDay) {
  // possible solution: remove all user's schedule rows on currentDay
  // and add new rows

  // deleting doesnt work right now
  let bat = db.batch();
  // get all rows with matching userId and currentDay
  let scheduleQuery = db
    .collection("schedule")
    .where("userId", "==", userId)
    .where("dayOfWeek", "==", currentDay);
  // delete selected rows

  scheduleQuery.get().then((querySnapshot) => {
    querySnapshot.docs.forEach(function (doc) {
      bat.delete(doc);
    });
  });

  bat
    .commit()
    .then(() => {
      console.log("Batch delete successful");
    })
    .catch((error) => {
      console.error("Batch delete error:", error);
    });

  // scheduleQuery.get().then((querySnapshot) => {
  //   querySnapshot.docs.forEach(function (doc) {
  //     doc.ref.delete();
  //   });
  // });
  // console.log(schedule[currentDay]);

  let batch = db.batch();
  for (let timeBlock of currentDayTimes) {
    // Create a ref with auto-generated ID
    var newScheduleRef = db.collection("schedule").doc();
    batch.set(newScheduleRef, {
      dayOfWeek: currentDay,
      startTime: firebase.firestore.Timestamp.fromDate(timeBlock.startTime),
      endTime: firebase.firestore.Timestamp.fromDate(timeBlock.endTime),
      userId: userId,
    });
  }
  batch
    .commit()
    .then(() => {
      console.log("batch committed");
    })
    .catch((error) => {
      console.error("Batch delete error:", error);
    });
  return;
}
