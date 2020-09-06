import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SettingsHomeScreen from "../screens/Settings/SettingsHomeScreen";
import AccountScreen from "../screens/Settings/Account/AccountScreen";
import UpdateNameScreen from "../screens/Settings/Account/UpdateNameScreen";
import UpdatePasswordScreen from "../screens/Settings/Account/UpdatePasswordScreen";
import AppearanceScreen from "../screens/Settings/Preferences/AppearanceScreen";
import ThemeScreen from "../screens/Settings/Preferences/ThemeScreen";

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
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePasswordScreen}
        options={{
          title: "Update Password",
        }}
      />
      <Stack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={{
          title: "App Appearance",
        }}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        options={{
          title: "Theme",
        }}
      />
    </Stack.Navigator>
  );
}
