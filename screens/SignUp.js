import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

export default function SignUp({ navigation }) {
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.walkText}>
        Walk
        <Text style={styles.timeText}>Time</Text>
      </Text>

      <View>
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={username}
          placeholder="username"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
        />
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setAge}
          value={age}
          placeholder="age"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text style={styles.signUpText}>SIGN UP</Text>
      </TouchableOpacity>
      <Text>
        Already have an account?
        <Text
          style={styles.logInText}
          onPress={() => navigation.navigate("Log In")}
        >
          &nbsp;Log in here.
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
  signUpButton: {
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
  signUpText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },

  logInText: {
    color: "#28D8A1",
  },
});
