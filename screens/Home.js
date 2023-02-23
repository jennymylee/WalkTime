import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
//import { Permissions } from "@expo/config-plugins/build/android";
//import { getAndroidManifestAsync } from "@expo/config-plugins/build/android/Paths";

export default function Home() {
  const [ PedometerAvailable, setPedometerAvailable ] = useState(""); // starts empty
  const [ stepCount, setStepCount ] = useState(0); // starts at 0 steps
  
  useEffect(()=>{
    subscribe(); // calls the subscribe function when app starts
  }, [])

  const subscribe = () => {
    
    Pedometer.watchStepCount((result)=>{
      setStepCount(result.steps);
    })

    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailable(String(result)); // result = 1|0. String(result) = true|false.
      },
      (error) => {
        setPedometerAvailable(error);
      }
    )

    // Need to set pedometer permissions
    /*
    getAndroidManifestAsync((result) =>{
      Permissions.addBlockedPermissions(result, ["android.permission.ACTIVITY_RECOGNITION"]);
    });
    */
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.walkText}>
        Walk
        <Text style={styles.timeText}>Time</Text>
      </Text>
      <Text>Is pedometer available on device?: {PedometerAvailable}</Text>
      <Text>Steps: {stepCount}</Text>
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
  timeText: {
    color: "#28D8A1",
  },
});
