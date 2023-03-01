import { db } from "../firebase";

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
