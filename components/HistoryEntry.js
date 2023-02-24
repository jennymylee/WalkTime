import React from "react";
import { View, StyleSheet, Text } from "react-native";

const HistoryEntry = ({ item }) => {
  const SubEntry = ({ startTime, distance, timeElapsed }) => {
    // converts seconds to houra minutes seconds string
    const hours = Math.floor(timeElapsed / 3600);
    timeElapsed %= 3600;
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    let hoursStr = "";
    if (hours) {
      hoursStr = hours.toString() + " hrs ";
    }
    const timeElapsedStr =
      hoursStr + minutes.toString() + " mins " + seconds.toString() + " secs";

    return (
      <View style={styles.subEntry}>
        <Text style={styles.startTime}>{startTime}</Text>
        <View style={styles.data}>
          <Text style={styles.dataText}>{distance} miles</Text>
          <Text style={styles.dataText}>{timeElapsedStr}</Text>
        </View>
      </View>
    );
  };

  function renderSubEntries() {
    return (
      <View>
        {item.data.map((walk, i) => {
          return (
            <SubEntry
              startTime={walk.startTime}
              distance={walk.distance}
              timeElapsed={walk.timeElapsed}
            />
          );
        })}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      {renderSubEntries()}
    </View>
  );
};

export default HistoryEntry;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#fff",
    shadowColor: "#DFDFDF", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 10, // IOS
    shadowRadius: 10,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  date: {
    fontSize: 20,
  },
  subEntry: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  data: {
    backgroundColor: "#B1E8D9",
    borderRadius: 15,
    padding: 15,
    minWidth: 160,
  },
  startTime: {
    fontWeight: "500",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
