import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/theme";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MoneyScreen from "../screens/MoneyScreen";
import AnalyzeScreen from "../screens/AnalyzeScreen";
import AccountScreen from "../screens/AccountScreen";
import Colors from "../constants/Colors";

const INITIAL_ROUTE_NAME = "Home";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation, route }) {
  const theme = useContext(ThemeContext);

  navigation.setOptions({
    headerStyle: {
      backgroundColor: theme.background,
      borderBottomWidth: 0,
      shadowColor: "transparent",
    },
    headerTitle: getHeaderTitle(route),
    headerTitleAlign: "left",
    headerTintColor: theme.foreground,
    headerTitleStyle: {
      fontSize: 26,
      fontWeight: "bold",
    },
  });

  return (
    <Tab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeBackgroundColor: theme.background,
        activeTintColor: theme.foreground,
        inactiveBackgroundColor: theme.background,
        inactiveTintColor: Colors.tabIconDefault,
        showLabel: false,
        style: {
          borderTopWidth: 0,
          backgroundColor: theme.background,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="tachometer-alt" />
          ),
        }}
      />
      <Tab.Screen
        name="Money"
        component={MoneyScreen}
        options={{
          title: "Money",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="money-bill" />
          ),
        }}
      />
      <Tab.Screen
        name="Analyze"
        component={AnalyzeScreen}
        options={{
          title: "Analyze",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="chart-pie" />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user-astronaut" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "";
    case "Money":
      return "Money";
    case "Analyze":
      return "Analyze";
    case "Account":
      return "Account";
  }
}
