import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/theme";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ResetPassword from "../screens/ResetPassword";

const Stack = createStackNavigator();

export default function StackNavigator({ navigation, route }) {
  const theme = useContext(ThemeContext);

  navigation.setOptions({
    headerStyle: {
      backgroundColor: theme.background,
      borderBottomWidth: 0,
      shadowColor: "transparent",
    },
    headerTitle: "",
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: "Sign In",
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          title: "Reset Password",
        }}
      />
    </Stack.Navigator>
  );
}
