import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function SignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the sign up page</Text>
      <StatusBar style="auto" />
      <Button
        title="Go to Log In page"
        onPress={() => navigation.navigate("Log In")}
      />
      <Button
        title="Go to Tabs page"
        onPress={() => navigation.navigate("Tabs")}
      />
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
