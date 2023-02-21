import { StyleSheet, Text, View, Button } from "react-native";
import { auth } from "../firebase";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.walkText}>
        Walk
        <Text style={styles.profileText}>Profile</Text>
      </Text>
      <Text>Email: {auth.currentUser?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  walkText: {
    fontWeight: "bold",
    fontSize: 38,
    marginBottom: 15,
  },
  profileText: {
    color: "#28D8A1",
  },
});
