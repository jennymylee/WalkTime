import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ navigation }) {
  const [name, setName] = useState(" ");

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Log In");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    try {
      AsyncStorage.getItem('name').then((result) => {
        setName(result);
      });
    } catch(e) {
      console.log(e);
    }
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.walkText}>
        Walk
        <Text style={styles.settingsText}>Settings</Text>
      </Text>
      <View style={styles.centerContainer}>
        <Ionicons name="person-circle-outline" size={70}></Ionicons>
        <Text style={styles.bodyText}>{name}</Text>
        <Text style={styles.bodyText}>{auth.currentUser?.email}</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.buttonText}>Edit Profile</Text>
            <Ionicons name="chevron-forward-outline" size={25}></Ionicons>
        </Pressable>
      </View>

      <View style={styles.section}>
          <Text style={styles.headerText}>Preferences</Text>
          <View style={styles.listItem}>
            <Ionicons name="globe-outline" size={30}></Ionicons>
            <Text style={styles.listItemTitle}>Language</Text>
            <Text style={styles.listItemText}>English</Text>
            <Ionicons name="chevron-forward-outline" size={30}></Ionicons>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="moon-outline" size={30}></Ionicons>
            <Text style={styles.listItemTitle}>Dark Mode</Text>
            <Ionicons style={{marginLeft: 115}} name="toggle-sharp" size={45}></Ionicons>
          </View>
      </View>

      <View style={{height: 250}}>
      </View>

      <View style={styles.centerContainer}>
        <Pressable style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Log Out</Text>
            <Ionicons name="log-out-outline" size={25} style={{marginLeft: 5}}></Ionicons>
        </Pressable>
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
    paddingLeft: 10,
    paddingRight: 10
  },
  walkText: {
    fontWeight: "bold",
    fontSize: 38,
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20
  },
  settingsText: {
    color: "#28D8A1",
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
  section:{
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  headerText:{
    backgroundColor: "#B1E8D9",
    padding: 5,
    fontSize: 20,
    fontWeight: "bold"
  },
  listItem:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    marginRight: 80
  },
  listItemText: {
    fontSize: 16,
    padding: 5,
    marginLeft: 80
  }
});
