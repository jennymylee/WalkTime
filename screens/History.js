import { StyleSheet, Text, View, FlatList } from "react-native";
import HistoryEntry from "../components/HistoryEntry";
import { getHistory } from "../models/history";
import { auth } from "../firebase";
import React from "react";

export default function History() {
  const [history, setHistory] = React.useState([]);
  React.useEffect(() => {
    const getUserHistory = async () => {
      const hist = [];
      const dateMap = await getHistory(auth.currentUser?.uid);

      let i = 1;
      for (let date in dateMap) {
        hist.push({
          key: i,
          date: date,
          data: dateMap[date],
        });
        i += 1;
      }
      setHistory(hist);
    };
    getUserHistory();
  }, []);

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
        keyExtractor={(item, index) => {
          return item.key;
        }}
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
