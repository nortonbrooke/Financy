import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsNavigator from "../navigation/SettingsNavigator";

const Stack = createStackNavigator();

export default function SettingsScreen({}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsNavigator} />
    </Stack.Navigator>
  );
}

SettingsScreen.navigationOptions = {
  header: null,
};
