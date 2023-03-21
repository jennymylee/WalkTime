import { StyleSheet, Text, View, Button } from "react-native";
import { auth } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation }) {
  const getName = async () => {
    try {
      await AsyncStorage.getItem('name').then((value) => {
        return value == null ? value : " ";
      });
    } catch(e) {
      // error reading value
    }
  }
  const getAge = async () => {
    try {
      await AsyncStorage.getItem('age').then((value) => {
        return value == null ? value : 0;
      });
    } catch(e) {
      // error reading value
    }
  }

  let name = "John";
  let age = 23;

  return (
    <View style={styles.container}>
      <Text style={styles.walkText}>
        Walk
        <Text style={styles.profileText}>Profile</Text>
      </Text>
      <View style={styles.body}>
        <View style={styles.field}>
          <Text style={styles.fieldTitle}>Hi, </Text>
          <Text style={styles.fieldText}>{name}!</Text>
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
