import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MoneyNavigator from "./MoneyNavigator";
import AnalyzeNavigator from "./AnalyzeNavigator";
import SettingsNavigator from "./SettingsNavigator";
import { ThemeContext } from "../contexts/theme";
import Colors from "../constants/Colors";

const Tab = createBottomTabNavigator();

export default function TabNavigator({}) {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
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
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="tachometer-alt" />
          ),
        }}
      />
      <Tab.Screen
        name="Money"
        component={MoneyNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="money-bill" />
          ),
        }}
      />
      <Tab.Screen
        name="Analyze"
        component={AnalyzeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="chart-pie" />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsIndex"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user-astronaut" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
