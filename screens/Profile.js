import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the profile page</Text>
      <StatusBar style="auto" />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings Page")}
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
