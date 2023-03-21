import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Home() {
  const [stepCount, setStepCount] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isWalking, setWalking] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();
    setStepCount(stepCount + 1);
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  
  function toggleWalk() {
    setWalking(!isWalking);
  };

  // Call updateStepCount in 2 seconds and every 2 seconds after
  //let updateCountInterval = setInterval(updateStepCount, 2000);
  //if(!isWalking){
    // stop running interval if not walking
    //clearInterval(updateCountInterval);
  //}

  if(isWalking){
    return (
      <View style={styles.container}>
        <Text style={styles.walkText}>
          Walk
          <Text style={styles.timeText}>Time</Text>
        </Text>
        <View style={styles.body}>
          <Text style={styles.bodyText}>On a walk!</Text>
          <Text style={styles.bodyText}>Step Count: {stepCount}</Text>
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
          <View style={styles.factContainer}>
            <Text style={styles.headerText}>Why Walk?</Text>
            <Text style={styles.bodyText}>Walking is a great way to get the physical activity needed to obtain health benefits. Moderate-to-vigorous physical activity can improve sleep, memory, and the ability to think and learn. It also reduces anxiety symptoms.</Text>
            <Text>Source: Centers for Disease Control and Prevention, U.S. Department of Health & Human Services</Text>
          </View>
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
    fontWeight: "500"
  },
  walkButton: {
    backgroundColor: "#28D8A1",
    padding: 10,
    margin: 10,
    width: "75%",
    borderRadius: 30, 
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
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
    fontWeight: "bold"
  }
});
