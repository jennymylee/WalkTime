import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import ScheduleEntry from "../components/ScheduleEntry";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Schedule() {
  const [currentDay, setCurrentDay] = React.useState("Sunday");
  const [editMode, setEditMode] = React.useState(false);

  // dummy schedule: {day : [ [startTime, endTime] ]}
  const schedule = {
    Sunday: [
      { startTime: "10:00 AM", endTime: "11:00 AM" },
      { startTime: "3:00 PM", endTime: "5:00 PM" },
      { startTime: "7:00 PM", endTime: "8:00 PM" },
    ],
    Monday: [
      { startTime: "8:00 AM", endTime: "8:30 AM" },
      { startTime: "10:00 AM", endTime: "11:00 AM" },
      { startTime: "3:00 PM", endTime: "5:00 PM" },
      { startTime: "7:00 PM", endTime: "8:00 PM" },
    ],
    Tuesday: [
      { startTime: "10:00 AM", endTime: "11:00 AM" },
      { startTime: "3:00 PM", endTime: "5:00 PM" },
      { startTime: "7:00 PM", endTime: "8:00 PM" },
    ],
    Wednesday: [
      { startTime: "10:00 AM", endTime: "11:00 AM" },
      { startTime: "3:00 PM", endTime: "5:00 PM" },
      { startTime: "7:00 PM", endTime: "8:00 PM" },
    ],
    Thursday: [
      { startTime: "10:00 AM", endTime: "11:00 AM" },
      { startTime: "3:00 PM", endTime: "5:00 PM" },
      { startTime: "7:00 PM", endTime: "8:00 PM" },
      { startTime: "9:00 PM", endTime: "10:00 PM" },
    ],
    Friday: [
      { startTime: "10:00 AM", endTime: "11:00 AM" },
      { startTime: "3:00 PM", endTime: "5:00 PM" },
      { startTime: "7:00 PM", endTime: "8:00 PM" },
    ],
    Saturday: [
      { startTime: "10:00 AM", endTime: "11:00 AM" },
      { startTime: "3:00 PM", endTime: "5:00 PM" },
      { startTime: "7:00 PM", endTime: "8:00 PM" },
    ],
  };

  function displayScheduleEntries() {
    return (
      <View>
        {schedule[currentDay].map((e) => {
          return (
            <ScheduleEntry
              startTime={e.startTime}
              endTime={e.endTime}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          );
        })}
      </View>
    );
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
        {/* edit/save button */}
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => {
              setEditMode(!editMode);
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
    borderRadius: "30",
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
});
