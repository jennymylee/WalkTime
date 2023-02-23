import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const ScheduleEntry = ({ startTime, endTime, editMode, setEditMode }) => {
  // TODO: convert startTime and endTime to be date strings
  const [sTime, setSTime] = React.useState(new Date());
  const [eTime, setETime] = React.useState(new Date());

  function onStartTimeSelected(event, value) {
    setSTime(value);
  }

  function onEndTimeSelected(event, value) {
    setETime(value);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>From</Text>
      {editMode ? (
        <DateTimePicker
          mode="time"
          value={sTime}
          style={styles.timeBoxEditMode}
          onChange={onStartTimeSelected}
        />
      ) : (
        <View style={editMode ? styles.timeBoxEditMode : styles.timeBox}>
          <Text style={styles.text}>
            {sTime.toLocaleTimeString([], { timeStyle: "short" })}
          </Text>
        </View>
      )}
      <Text style={styles.text}>To</Text>
      {editMode ? (
        <DateTimePicker
          mode="time"
          value={eTime}
          style={styles.timeBoxEditMode}
          onChange={onEndTimeSelected}
        />
      ) : (
        <View style={editMode ? styles.timeBoxEditMode : styles.timeBox}>
          <Text style={styles.text}>
            {eTime.toLocaleTimeString([], { timeStyle: "short" })}
          </Text>
        </View>
      )}
      {editMode ? (
        // TODO: onPress removes this schedule entry
        <TouchableOpacity onPress={() => {}}>
          <Feather name="minus-circle" size={24} color="#9E9E9E" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ScheduleEntry;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 15,
  },
  timeBoxEditMode: {
    width: 90,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  timeBox: {
    width: 90,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#B1E8D9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
});
