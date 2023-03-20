import React, { useState, useEffect } from "react";
import { PermissionsAndroid, StyleSheet, Text, View, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Pedometer } from "expo-sensors";
import { requestPermissionsAsync } from "expo-notifications";
//import { Permissions } from "@expo/config-plugins/build/android";
//import { getAndroidManifestAsync } from "@expo/config-plugins/build/android/Paths";

import GoogleFit, { Scopes } from 'react-native-google-fit'

const requestActivityPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      {
        title: 'WalkTime Activity Recognition Permission',
        message:
          'WalkTime needs access to your activity recognition.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'NO',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the activity recognition');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default function Home() {
  //var [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  var [dailySteps, setdailySteps] = useState(0);
  var [isWalking, setWalking] = useState(false);

  //requestActivityPermission();
  /*
  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
    
    //PermissionsAndroid.check("android.permission.ACTIVITY_RECOGNITION").then(result => {console.log(result);});

    if (isAvailable) {
      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription;
  }, []);
  */
  let toggleWalk = () => {
    setWalking(!isWalking);
  };

  function getStepData() {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE
      ],
    };

    var today = new Date();
    var lastWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 8,
    );
    const opt = {
      startDate: lastWeekDate.toISOString(), // required ISO8601Timestamp
      endDate: today.toISOString(), // required ISO8601Timestamp
      bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
    };

    async function fetchStepData(options) {
      const res = await GoogleFit.getDailyStepCountSamples(options);
      if (res.length !== 0) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].source === 'com.google.android.gms:estimated_steps') {
            let data = res[i].steps.reverse();
            dailyStepCount = res[i].steps;
            setdailySteps(data[0].value);
          }
        }
      } else {
        console.log('Not Found');
      }
    };
    
    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      console.log(authorized);
      if (authorized) {
        // if already authorized, fetch data
        fetchStepData(opt);
      } else {
        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              console.log('AUTH_SUCCESS');

              // if successfully authorized, fetch data
            } else {
              console.log('AUTH_DENIED ' + authResult.message);
            }
          })
          .catch(() => {
            dispatch('AUTH_ERROR');
          });
      }
    });
  };

  useEffect(() => {
    getStepData();
  }, []);

  if(isWalking){
    return (
      <View style={styles.container}>
        <Text style={styles.walkText}>
          Walk
          <Text style={styles.timeText}>Time</Text>
        </Text>
        <View style={styles.body}>
          <Text style={styles.bodyText}>On a walk!</Text>
          <Text style={styles.bodyText}>Step counter: {dailySteps}</Text>
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
          <Text style={styles.bodyText}>Is this authorized? {GoogleFit.isAuthorized}</Text>
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