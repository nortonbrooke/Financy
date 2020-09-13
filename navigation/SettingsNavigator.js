import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import {
  AccountScreen,
  ChangePasswordScreen,
  UpdateNameScreen,
} from "../screens/Settings/Account";
import { AppearanceScreen, ThemeScreen } from "../screens/Settings/Preferences";
import { ThemeContext } from "../contexts/theme";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 70,
          backgroundColor: theme.background,
          borderBottomWidth: 0,
          shadowColor: "transparent",
        },
        headerBackTitle: "Back",
        headerTintColor: Colors.tintColor,
        headerTitle: "",
        headerTitleStyle: {
          color: theme.foreground,
        }
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account",
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
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: "Change Password",
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
          title: "Choose Theme",
        }}
      />
    </Stack.Navigator>
  );
}
