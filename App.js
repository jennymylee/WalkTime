import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./screens/Home";
import History from "./screens/History";
import Schedule from "./screens/Schedule";
import Settings from "./screens/Settings";
import Profile from "./screens/Profile";
import LogIn from "./screens/LogIn";
import SignUp from "./screens/SignUp";

// for Notifications
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import {  Platform } from "react-native";

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const AuthStack = createStackNavigator();

// allows us to navigate to the profile page from the settings page and vice versa
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen name="Settings Page" component={Settings} />
      <SettingsStack.Screen name="Profile" component={Profile} />
    </SettingsStack.Navigator>
  );
}

function TabsInterface() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            return <Feather name="home" size={size} color={color} />;
          } else if (route.name === "History") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Schedule") {
            return <Feather name="calendar" size={size} color={color} />;
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-settings" : "ios-settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#28D8A1",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Schedule" component={Schedule} />

      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

// Setting up notifications for the app
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  // Adding notification listener and subscriber
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => 
      setExpoPushToken(token)
    );

    notificationListener.current = 
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current = 
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
  
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: true,
        lightColor: "#FF231F7C",
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
      });
    }
  
    return token;
  }

  return (
    <>
      <NavigationContainer>
        {/* allows us to navigate between sign up and log in screens and to the home page */}
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen name="Log In" component={LogIn} />
          <AuthStack.Screen name="Sign Up" component={SignUp} />
          <AuthStack.Screen name="Tabs" component={TabsInterface} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </>
  );
}
