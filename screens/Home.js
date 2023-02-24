import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import GoogleFit, { Scopes } from 'react-native-google-fit';
//import { Pedometer } from "expo-sensors";
//import { Permissions } from "@expo/config-plugins/build/android";
//import { getAndroidManifestAsync } from "@expo/config-plugins/build/android/Paths";

export default function Home() {
  var [dailySteps, setDailySteps] = useState(0);
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
    ],
  };

  let getStepData = async () => {  
    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit?.isAuthorized;
      if(authorized){
        var today = new Date();
        var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
        
        const opt = {
          startDate: yesterday.toISOString(),
          endDate: today.toISOString(),
          bucketUnit: 'DAY',
          bucketInterval: 1,
        };

        let fetchStepsData = async opt => {
          const res = await GoogleFit.getDailyStepCountSamples(opt);
          if(res.length != 0){
            for(var i=0; i < res.length; i++){
              if(res[i].source == 'com.google.android.gms:estimated_steps'){
                let data = res[i].steps.reverse();
                dailyStepCount = res[i].steps;
                setDailySteps(data[0].value);
              }
            }
          }
          else{
            console.log('Data not found.');
          }
        };

      } 
      else{
        GoogleFit.authorize(options).then(authResult => {
          if(authResult.success){
            console.log('AUTH_SUCCESS');
          }
          else{
            console.log('AUTH_DENIED ' + authResult.message);
          }
        }).catch(()=>{dispatch('AUTH_ERROR');});
      }
    })
  }

  useEffect(() => {
    getStepData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.walkText}>
        Walk
        <Text style={styles.timeText}>Time</Text>
      </Text>
      <Text>Walk! And watch this go up: {dailySteps}</Text>
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
