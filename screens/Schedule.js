import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ScheduleEntry from "../components/ScheduleEntry";
import * as Notifications from "expo-notifications";
import { getSchedule, saveNewScheduleToDB } from "../models/schedule";
import { auth } from "../firebase";

export default function Schedule() {
  const [currentDay, setCurrentDay] = React.useState("Sunday");
  const [editMode, setEditMode] = React.useState(false);
  const [schedule, setSchedule] = React.useState({});
  const [scheduleChanged, setScheduleChanged] = React.useState(false);

  React.useEffect(() => {
    const getUserSchedule = async () => {
      const sched = await getSchedule(auth.currentUser?.uid);
      setSchedule(sched);
    };
    getUserSchedule();
  }, []);

  // reload schedules on a current day when the tab changes or when schedule is saved
  React.useEffect(() => {
    displayScheduleEntries();
  }, [scheduleChanged, currentDay]);

  function displayScheduleEntries() {
    return (
      <View>
        {schedule[currentDay] ? (
          schedule[currentDay].map((e) => {
            return (
              <ScheduleEntry
                startTime={e.startTime.toString()}
                endTime={e.endTime.toString()}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            );
          })
        ) : (
          <></>
        )}
      </View>
    );
  }

  // save new edits to schedule on db
  function saveNewSchedule() {
    saveNewScheduleToDB(
      auth.currentUser?.uid,
      schedule[currentDay],
      currentDay
    );
    return;
  }

  async function calcPushNotification() {
    Notifications.cancelAllScheduledNotificationsAsync();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    for (let i = 0; i < 7; i++) {
      let min_time = Infinity;
      let k = 0;
      let should_schedule = false;
      for (let j = 0; j < schedule[days[i]].length; j++) {
        k =
          60 * schedule[days[i]][j]["startTime"].getHours() +
          schedule[days[i]][j]["startTime"].getMinutes();

        do {
          let min_for_current = Math.min(Math.abs(480 - k), Math.abs(960 - k));

          if (min_for_current <= min_time) {
            min_time = k;
            should_schedule = true;
          }

          k += 10;
        } while (
          k <
          60 * schedule[days[i]][j]["endTime"].getHours() +
            schedule[days[i]][j]["endTime"].getMinutes()
        );
      }

      if (should_schedule) {
        schedulePushNotification(
          days[i],
          Math.floor(min_time / 60),
          min_time % 60
        );
      }
    }
  }

  async function schedulePushNotification(day, hours, minutes) {
    console.log(
      "Notif scheduled on ",
      day,
      hours,
      " hours",
      minutes,
      " minutes"
    );
    // time = new Date(time.getTime() - 5 * 60000);
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = days.indexOf(day) + 1;
    // const hours = time.getHours();
    // const minutes = time.getMinutes();
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time for a walk!",
        body: "Let's recharge with some exercise!",
        // sound: 'default',
      },
      trigger: {
        weekday: weekday,
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });
    console.log("notif id on scheduling", id);
    return id;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.walkText}>
        Walk
        <Text style={styles.scheduleText}>Schedule</Text>
      </Text>
      <Text style={styles.subHeading}>Mark your availability.</Text>
      {/* row of days */}
      <View style={styles.days}>
        <TouchableOpacity
          style={currentDay == "Sunday" ? styles.currentDay : styles.day}
          onPress={() => setCurrentDay("Sunday")}
        >
          <Text style={styles.dayText}>Sun</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={currentDay == "Monday" ? styles.currentDay : styles.day}
          onPress={() => setCurrentDay("Monday")}
        >
          <Text style={styles.dayText}>Mon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={currentDay == "Tuesday" ? styles.currentDay : styles.day}
          onPress={() => setCurrentDay("Tuesday")}
        >
          <Text style={styles.dayText}>Tue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={currentDay == "Wednesday" ? styles.currentDay : styles.day}
          onPress={() => setCurrentDay("Wednesday")}
        >
          <Text style={styles.dayText}>Wed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={currentDay == "Thursday" ? styles.currentDay : styles.day}
          onPress={() => setCurrentDay("Thursday")}
        >
          <Text style={styles.dayText}>Thu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={currentDay == "Friday" ? styles.currentDay : styles.day}
          onPress={() => setCurrentDay("Friday")}
        >
          <Text style={styles.dayText}>Fri</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={currentDay == "Saturday" ? styles.currentDay : styles.day}
          onPress={() => setCurrentDay("Saturday")}
        >
          <Text style={styles.dayText}>Sat</Text>
        </TouchableOpacity>
      </View>
      {/* schedule on a day */}
      <View style={styles.schedule}>
        <Text style={styles.currentDayText}>{currentDay}</Text>
        {/* schedule entries */}
        {displayScheduleEntries()}
        {/* "add another time" text */}
        {editMode ? (
          <TouchableOpacity
            style={styles.addLine}
            onPress={() => {
              schedule[currentDay].push({
                startTime: new Date(),
                endTime: new Date(),
              });
              setScheduleChanged(!scheduleChanged);
            }}
          >
            <TouchableOpacity>
              <Feather name="plus-circle" size={24} color="#28D8A1" />
            </TouchableOpacity>
            <Text style={styles.addText}> Add another time</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        {/* edit/save button */}
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => {
              setEditMode(!editMode);
              if (editMode) {
                saveNewSchedule();
                calcPushNotification();
              }
              //schedulePushNotification("Friday");
            }}
            style={editMode ? styles.saveButton : styles.editButton}
          >
            {editMode ? (
              <MaterialCommunityIcons
                name="checkbox-marked-outline"
                size={30}
                color="white"
              />
            ) : (
              <Feather name="edit" size={30} color="grey" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#28D8A1",
    paddingTop: 50,
  },
  walkText: {
    fontWeight: "bold",
    fontSize: 38,
    marginBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  scheduleText: {
    color: "#fff",
  },
  subHeading: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 5,
    marginBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  days: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,
  },
  day: {
    backgroundColor: "#B1E8D9",
    width: 38,
    height: 70,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 16,
    transform: [{ rotate: "270deg" }],
  },
  currentDay: {
    backgroundColor: "#fff",
    width: 38,
    height: 70,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  schedule: {
    backgroundColor: "#fff",
    padding: 30,
    height: "100%",
    borderRadius: 30,
  },
  currentDayText: {
    fontSize: 25,
    marginBottom: 20,
  },
  saveButton: {
    width: 60,
    height: 60,
    backgroundColor: "#28D8A1",
    borderRadius: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DFDFDF", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 10, // IOS
    shadowRadius: 10,
  },
  buttonView: {
    display: "flex",
    flexDirection: "row-reverse",
    height: "100%",
    alignItems: "flex-start",
  },
  addText: {
    color: "#28D8A1",
    marginLeft: 8,
    fontWeight: "600",
  },
  addLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
