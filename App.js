import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();

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

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
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
      </NavigationContainer>
    </>
  );
}
