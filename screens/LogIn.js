import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { auth } from "../firebase";

export default function LogIn({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Tabs");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.walkText}>
        Walk
        <Text style={styles.timeText}>Time</Text>
      </Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.logInButton}
        // onPress={() => navigation.navigate("Tabs")}
        onPress={handleLogIn}
      >
        <Text style={styles.logInText}>LOG IN</Text>
      </TouchableOpacity>
      <Text>
        Don't have an account?
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate("Sign Up")}
        >
          &nbsp;Sign up here.
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  walkText: {
    fontWeight: "bold",
    fontSize: 38,
    marginBottom: 15,
  },
  timeText: {
    color: "#28D8A1",
  },
  input: {
    height: 30,
    margin: 12,
    width: 280,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  logInButton: {
    width: 280,
    height: 55,
    backgroundColor: "#28D8A1",
    color: "#fff",
    marginTop: 30,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#BBBBBB", // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    marginBottom: 20,
  },
  logInText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  signUpText: {
    color: "#28D8A1",
  },
});
