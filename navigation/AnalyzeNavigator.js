import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import AnalyzeScreen from "../screens/Analyze/AnalyzeScreen";
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
        },
      }}
    >
      <Stack.Screen
        name="Analyze"
        component={AnalyzeScreen}
        options={{
          title: "Analyze",
        }}
      />
    </Stack.Navigator>
  );
}
