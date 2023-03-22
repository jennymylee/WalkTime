import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { auth } from "../firebase";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation }) {
  const [name, setName] = useState(" ");
  const [age, setAge] = useState(0);

  useEffect(() => {
      try {
        AsyncStorage.getItem('name').then((result) => {
          setName(result);
        });
        
        AsyncStorage.getItem('age').then((result) => {
          setAge(result);
        });
      } catch(e) {
        console.log(e);
      }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.walkText}>
        Walk
        <Text style={styles.profileText}>Profile</Text>
      </Text>
      <View style={styles.body}>
        <View style={styles.centerContainer}>
          <Ionicons name="person-circle-outline" size={75}></Ionicons>
          <Text style={styles.bodyText}>Hi, {name}!</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldTitle}>Age: </Text>
          <Text style={styles.fieldText}>{age}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldTitle}>Email: </Text>
          <Text style={styles.fieldText}>{auth.currentUser?.email}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldTitle}>Password: </Text>
          <Text style={styles.fieldText}>*********</Text>
        </View>
      </View>
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
  profileText: {
    color: "#28D8A1",
  },
  body: {
    display: "flex",
    flexDirection: "column",
  },
  centerContainer:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#28D8A1",
    padding: 10,
    paddingLeft: 15,
    margin: 10,
    width: "50%",
    borderRadius: 30, 
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  bodyText: {
    fontSize: 18,
    marginBottom: 5,
  },
  field:{
    display: "flex",
    flexDirection: "row"
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  fieldText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
