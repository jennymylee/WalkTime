import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { auth } from "../firebase";

export default function Settings({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Log In");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.walkText}>
        Walk
        <Text style={styles.settingsText}>Settings</Text>
      </Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button title="Log Out" onPress={handleSignOut} />
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
  settingsText: {
    color: "#28D8A1",
  },
});
