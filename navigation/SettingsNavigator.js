import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SettingsHomeScreen from "../screens/Settings/SettingsHomeScreen";
import AccountScreen from "../screens/Settings/AccountScreen";
import UpdateNameScreen from "../screens/Settings/UpdateNameScreen";

const Stack = createStackNavigator();

export default function StackNavigator({}) {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsHome"
        component={SettingsHomeScreen}
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account Information",
        }}
      />
      <Stack.Screen
        name="UpdateName"
        component={UpdateNameScreen}
        options={{
          title: "Update Name",
        }}
    />
    </Stack.Navigator>
  );
}
