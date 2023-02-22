import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const ScheduleEntry = ({ startTime, endTime, editMode, setEditMode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>From</Text>
      <View style={editMode ? styles.timeBoxEditMode : styles.timeBox}>
        <Text style={styles.text}>{startTime}</Text>
      </View>
      <Text style={styles.text}>To</Text>
      <View style={editMode ? styles.timeBoxEditMode : styles.timeBox}>
        <Text style={styles.text}>{endTime}</Text>
      </View>
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
    borderRadius: 15,
    backgroundColor: "#DFDFDF",
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
