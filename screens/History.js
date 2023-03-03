import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import HistoryEntry from "../components/HistoryEntry";
import { getHistory, addNewHistory } from "../models/history";
import { auth } from "../firebase";

export default function History() {
  const [rawHistory, setHistory] = React.useState({});
  React.useEffect(()=> {
    const getUserHistory = async () => {
      const hist = await getHistory(auth.currentUser?.uid);
      setHistory(hist);
    };
    getUserHistory();
  }, []);
  history = [];
  // curr data to convert  LOG  history [{"endTime": 2023-02-24T19:19:24.535Z, "startTime": 2023-02-24T19:02:35.043Z, "steps": 4300}]
  // for (var i = 0; i < rawHistory.length; i++) {
  //   let  
  // }

  /*
  datekey = defaultdict(list)
  for entry in history:
    datekey[entry.date].append(entry)

  for item in sorted(datekey.keys()):
    currDict = {date:item, data:[datekey[item]]}
    history.append(currDict)
  */


  // dummy history log
  // const history = 
  // [
  //   {
  //     date: "Monday, 1/30/2023",
  //     data: [
  //       { startTime: "12:56 PM", distance: 1.34, timeElapsed: 3400 },
  //       { startTime: "3:00 PM", distance: 2.03, timeElapsed: 3600 },
  //       { startTime: "5:00 PM", distance: 0.8, timeElapsed: 3500 },
  //     ],
  //   },
  //   {
  //     date: "Tuesday, 1/31/2023",
  //     data: [
  //       { startTime: "12:56 PM", distance: 1.34, timeElapsed: 3400 },
  //       { startTime: "3:00 PM", distance: 2.03, timeElapsed: 3600 },
  //       { startTime: "5:00 PM", distance: 0.8, timeElapsed: 3500 },
  //       { startTime: "8:00 PM", distance: 0.98, timeElapsed: 3550 },
  //     ],
  //   },
  //   {
  //     date: "Wednesday, 2/1/2023",
  //     data: [
  //       { startTime: "12:56 PM", distance: 1.34, timeElapsed: 3400 },
  //       { startTime: "3:00 PM", distance: 2.03, timeElapsed: 3600 },
  //       { startTime: "5:00 PM", distance: 0.8, timeElapsed: 3500 },
  //       { startTime: "8:00 PM", distance: 0.98, timeElapsed: 3550 },
  //       { startTime: "8:00 PM", distance: 1.2, timeElapsed: 3850 },
  //     ],
  //   },
  // ];
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
        keyExtractor={(item, index) => index.toString()}
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
