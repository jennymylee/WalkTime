import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the settings page</Text>
      <StatusBar style="auto" />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button title="Log Out" onPress={() => navigation.navigate("Log In")} />
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
});
