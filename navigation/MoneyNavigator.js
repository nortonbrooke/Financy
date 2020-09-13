import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext } from "react";
import { CreditCardsScreen, ExpensesScreen, IncomeScreen } from "../screens/Money";
import { ThemeContext } from "../contexts/theme";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function StackNavigator() {
  const theme = useContext(ThemeContext);

  const TabNavigator = () => (
    <Tab.Navigator
      initialRouteName="Expenses"
      animationEnabled={false}
      tabBarOptions={{
        activeTintColor: Colors.tintColor,
        inactiveTintColor: Colors.tabIconDefault,
        style: {
          backgroundColor: theme.background,
        },
        indicatorStyle: {
          backgroundColor: Colors.tintColor,
        },
      }}
      style={{
        backgroundColor: theme.background,
      }}
      sceneContainerStyle={{
        backgroundColor: theme.background,
      }}
    >
      <Tab.Screen
        name="Income"
        component={IncomeScreen}
        options={{
          title: "Income",
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          title: "Expenses",
        }}
      />
      <Tab.Screen
        name="CreditCards"
        component={CreditCardsScreen}
        options={{
          title: "Credit Cards",
        }}
      />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 40,
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
        name="Money"
        component={TabNavigator}
        options={{
          title: "Money",
        }}
      />
    </Stack.Navigator>
  );
}
