import { StyleSheet, Text, View, FlatList } from "react-native";
import HistoryEntry from "../components/HistoryEntry";

export default function History() {
  // dummy history log
  const history = [
    {
      key: 1,
      date: "Monday, 1/30/2023",
      data: [
        { startTime: "12:56 PM", distance: 1.34, timeElapsed: 3400 },
        { startTime: "3:00 PM", distance: 2.03, timeElapsed: 3600 },
        { startTime: "5:00 PM", distance: 0.8, timeElapsed: 3500 },
      ],
    },
    {
      key: 2,
      date: "Tuesday, 1/31/2023",
      data: [
        { startTime: "12:56 PM", distance: 1.34, timeElapsed: 3400 },
        { startTime: "3:00 PM", distance: 2.03, timeElapsed: 3600 },
        { startTime: "5:00 PM", distance: 0.8, timeElapsed: 3500 },
        { startTime: "8:00 PM", distance: 0.98, timeElapsed: 3550 },
      ],
    },
    {
      key: 3,
      date: "Wednesday, 2/1/2023",
      data: [
        { startTime: "12:56 PM", distance: 1.34, timeElapsed: 3400 },
        { startTime: "3:00 PM", distance: 2.03, timeElapsed: 3600 },
        { startTime: "5:00 PM", distance: 0.8, timeElapsed: 3500 },
        { startTime: "8:00 PM", distance: 0.98, timeElapsed: 3550 },
        { startTime: "8:00 PM", distance: 1.2, timeElapsed: 3850 },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.walkText}>
          Walk
          <Text style={styles.historyText}>History</Text>
        </Text>
        <Text style={styles.subheading}>A log of your most recent walks.</Text>
      </View>
      <FlatList
        style={styles.log}
        data={history}
        renderItem={HistoryEntry}
        keyExtractor={(item, index) => { return item.key; }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  walkText: {
    fontWeight: "bold",
    fontSize: 38,
    marginBottom: 15,
  },
  historyText: {
    color: "#fff",
  },
  top: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#28D8A1",
  },
  subheading: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 5,
    marginBottom: 20,
    color: "#fff",
  },
  log: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
  },
});
