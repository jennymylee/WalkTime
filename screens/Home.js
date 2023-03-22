import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Pedometer } from "expo-sensors";
import { logWalk } from "../models/history";
import { auth } from "../firebase";

export default function Home() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [lastWalk, setLastWalk] = useState("last");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isWalking, setWalking] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();

    const subscription = subscribe();
    return () => subscription;
  },[]);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  useEffect(() => {
    if (!isWalking) {
      setStartTime(new Date());
    } else {
      setEndTime(new Date());
      let hours = startTime.getHours();
      let suffix = 'am'
      if(hours >= 12){
        suffix = 'pm';
        if(hours > 12){
          hours = hours - 12;
        }
      }
      setLastWalk(hours + ':' + startTime.getMinutes() + suffix);
      logWalk(auth.currentUser?.uid, startTime, endTime, currentStepCount);
    }
  }, [isWalking]);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "location found";
  }

  function toggleWalk() {
    setWalking(!isWalking);
  }

  if (isWalking) {
    return (
      <View style={styles.container}>
        <Text style={styles.walkText}>
          Walk
          <Text style={styles.timeText}>Time</Text>
        </Text>
        <View style={styles.body}>
          <Text style={styles.bodyText}>On a walk!</Text>
          <Text style={styles.bodyText}>Step Count: {currentStepCount}</Text>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          />
          <Pressable style={styles.walkButton} onPress={toggleWalk}>
            <Text style={styles.buttonText}>Stop Walk</Text>
          </Pressable>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.walkText}>
          Walk
          <Text style={styles.timeText}>Time</Text>
        </Text>
        <View style={styles.body}>
          <Text style={styles.bodyText}>Great job on your {lastWalk} walk!</Text>
          <Pressable style={styles.walkButton} onPress={toggleWalk}>
            <Text style={styles.buttonText}>Start Walk</Text>
          </Pressable>
          <View style={styles.factContainer}>
            <Text style={styles.headerText}>Why Walk?</Text>
            <Text style={styles.bodyText}>
              Walking is a great way to get the physical activity needed to
              obtain health benefits. Moderate-to-vigorous physical activity can
              improve sleep, memory, and the ability to think and learn. It also
              reduces anxiety symptoms.
            </Text>
            <Text>
              Source: Centers for Disease Control and Prevention, U.S.
              Department of Health & Human Services
            </Text>
          </View>
          <Text style={styles.bodyText}>{text}</Text>
        </View>
      </View>
    );
  }
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
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bodyText: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "500",
  },
  walkButton: {
    backgroundColor: "#28D8A1",
    padding: 10,
    margin: 10,
    width: "75%",
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "60%",
  },
  factContainer: {
    backgroundColor: "#B1E8D9",
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
