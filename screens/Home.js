import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
//import { Pedometer } from "expo-sensors";
//import { requestPermissionsAsync } from "expo-notifications";
//import { Permissions } from "@expo/config-plugins/build/android";
//import { getAndroidManifestAsync } from "@expo/config-plugins/build/android/Paths";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isWalking, setWalking] = useState(false);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  let toggleWalk = () => {
    setWalking(!isWalking);
  };

  if(isWalking){
    return (
      <View style={styles.container}>
        <Text style={styles.walkText}>
          Walk
          <Text style={styles.timeText}>Time</Text>
        </Text>
        <View style={styles.body}>
          <Text style={styles.bodyText}>On a walk!</Text>
          <Text style={styles.bodyText}>Step counter: {currentStepCount}</Text>
          <MapView 
            style={styles.map}
            provider={PROVIDER_GOOGLE} 
            initialRegion={{
              latitude: 33.645463,
              longitude: -117.842087,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <Pressable style={styles.walkButton} onPress={toggleWalk}>
            <Text style={styles.buttonText}>Stop Walk</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <Text style={styles.walkText}>
          Walk
          <Text style={styles.timeText}>Time</Text>
        </Text>
        <View style={styles.body}>
          <Text style={styles.bodyText}>Great job on your 11:00am walk!</Text>
          <Text style={styles.bodyText}>Your next walk is at 1:15pm.</Text>
          <Pressable style={styles.walkButton} onPress={toggleWalk}>
            <Text style={styles.buttonText}>Start Walk</Text>
          </Pressable>
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
    alignItems: "center"
  },
  bodyText: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 25,
  },
  walkButton: {
    backgroundColor: "#28D8A1",
    padding: 10,
    margin: 10,
    width: "75%",
    borderRadius: 15, 
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  map: {
    width: "100%",
    height: "60%",
  }
});
