import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MoneyScreen from "../screens/MoneyScreen";
import AnalyzeScreen from "../screens/AnalyzeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  AccountScreen,
  ChangePasswordScreen,
  UpdateNameScreen,
} from "../screens/Settings/Account";
import { AppearanceScreen, ThemeScreen } from "../screens/Settings/Preferences";
import { ThemeContext } from "../contexts/theme";
import Colors from "../constants/Colors";
import { isEmpty } from "lodash";

const INITIAL_ROUTE_NAME = "Home";

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsIndex"
        component={SettingsScreen}
        options={{
          title: "SettingsIndex",
        }}
      />
      <SettingsStack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account Information",
        }}
      />
      <SettingsStack.Screen
        name="UpdateName"
        component={UpdateNameScreen}
        options={{
          title: "Update Name",
        }}
      />
      <SettingsStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: "Change Password",
        }}
      />
      <SettingsStack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={{
          title: "App Appearance",
        }}
      />
      <SettingsStack.Screen
        name="Theme"
        component={ThemeScreen}
        options={{
          title: "Theme",
        }}
      />
    </SettingsStack.Navigator>
  );
};

export default function TabNavigator({ navigation, route }) {
  const theme = useContext(ThemeContext);
  const headerTitle = getHeaderTitle(route);

  if (isEmpty(headerTitle)) {
    navigation.setOptions({
      headerStyle: {
        height: 0,
        borderBottomWidth: 0,
        shadowColor: "transparent",
      },
      headerTitle: headerTitle,
    });
  } else {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.background,
        borderBottomWidth: 0,
        shadowColor: "transparent",
      },
      headerTitle: headerTitle,
      headerTitleAlign: "left",
      headerTintColor: theme.foreground,
      headerTitleStyle: {
        fontSize: 26,
        fontWeight: "bold",
      },
    });
  }

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
        name="Settings"
        component={SettingsStackScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user-astronaut" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route) {
  const currentRoute = route.state?.routes[route.state.index];

  // Check for nested route
  if (currentRoute?.state?.routes?.length > 1) {
    return "";
  }

  const routeName = currentRoute?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case "Home":
      return "";
    case "Money":
      return "Money";
    case "Analyze":
      return "Analyze";
    case "Settings":
      return "Settings";
  }
}
