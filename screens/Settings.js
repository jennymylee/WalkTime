import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
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
      <View style={styles.centerContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.buttonText}>Go to Profile</Text>
            <Ionicons name="person-circle-outline" size={32}></Ionicons>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Log Out</Text>
          <Ionicons name="log-out-outline" size={32}></Ionicons>
        </Pressable>
      </View>
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
  centerContainer:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "500"
  },
  button: {
    backgroundColor: "#28D8A1",
    padding: 10,
    margin: 10,
    width: "75%",
    borderRadius: 30, 
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
});
