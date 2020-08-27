import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Appearance } from "react-native-appearance";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { APIContext } from "./contexts/api";
import { AuthProvider } from "./contexts/auth";
import { ThemeProvider, themes } from "./contexts/theme";

import useCachedResources from "./hooks/useCachedResources";
import AuthNavigator from "./navigation/AuthNavigator";
import AppNavigator from "./navigation/AppNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import authReducer, {
  authInitialState,
  SIGN_IN,
  SIGN_OUT,
  RESTORE_USER,
} from "./reducers/auth";
import SplashScreen from "./screens/SplashScreen";
import { get } from "lodash";

const Stack = createStackNavigator();

export default function App(props) {
  // Resources
  const isLoadingComplete = useCachedResources();

  // Authentication
  const { authenticate, users } = useContext(APIContext);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  // Theme
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(get(themes, colorScheme, "light"));

  // Status bar
  const styleTypes = {
    default: "default",
    light: "dark-content",
    dark: "light-content",
  };
  const [styleStatusBar, setStyleStatusBar] = useState(
    get(styleTypes, colorScheme, "light")
  );

  const auth = useMemo(
    () => ({
      signIn: async (data) => {
        try {
          const response = await authenticate.signIn(data);
          const { user } = response;

          if (user) {
            AsyncStorage.setItem("userToken", user.uid);
            authDispatch({ type: SIGN_IN, userToken: user.uid });
          }
        } catch (error) {
          switch (error.code) {
            case "auth/invalid-email":
              alert("Sign in Failed", "Email address is not valid");
              break;
            case "auth/user-disabled":
              alert("Sign in Failed", "Your account has been disabled");
              break;
            case "auth/user-not-found":
              alert("Sign in Failed", "No account was found for the email provided");
              break;
            case "auth/wrong-password":
              alert("Sign in Failed", "The password entered is incorrect");
              break;
            case "auth/too-many-requests":
              alert("Sign in Failed", "You've attempted to sign in too many times, try again later");
              break;
            default:
              alert("Sign in Failed", error.message);
              break;
          }
        }
      },

      signOut: async () => {
        try {
          await authenticate.signOut();
          AsyncStorage.removeItem("userToken");
          authDispatch({ type: SIGN_OUT });
        } catch (error) {
          console.log(error.message);
        }
      },

      signUp: async (data) => {
        try {
          const response = await authenticate.signUp(data);
          const { user } = response;

          if (user) {
            AsyncStorage.setItem("userToken", user.uid);
            users
              .create(data)
              .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                authDispatch({ type: SIGN_IN, userToken: user.uid });
              })
              .catch(function (error) {
                console.error("Error adding document: ", error);
              });
          }
        } catch (error) {
          switch (error.code) {
            case "auth/invalid-email":
              alert("Sign up Failed", "Email address is not valid");
              break;
            case "auth/email-already-in-use":
              alert("Sign up Failed", "Email address is already in use");
              break;
            case "auth/operation-not-allowed":
              alert("Sign up Failed", "Unable to create account");
              break;
            case "auth/weak-password":
              alert("Sign up Failed", "Password is too weak");
              break;
            default:
              alert("Sign up Failed", error.message);
              break;
          }
        }
      },
    }),
    []
  );

  useEffect(() => {
    // Subscribe to appearance
    let subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(get(themes, colorScheme, "light"));
      setStyleStatusBar(get(styleTypes, colorScheme, "light"));
    });

    // Fetch the user from storage then navigate to our appropriate place
    let bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (error) {
        console.log(error);
      }

      if (userToken) {
        try {
          await authenticate.isSignedIn((user) => {
            if (user) {
              authDispatch({ type: RESTORE_USER, userToken: user.uid });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    bootstrapAsync();

    return function cleanup() {
      bootstrapAsync = null;
      subscription.remove();
    };
  }, []);

  const alert = (title, message) =>
    Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });

  if (!isLoadingComplete) {
    return <SplashScreen></SplashScreen>;
  } else if (authState.loading) {
    return <Text>Checking auth...</Text>; // TODO: authenticating screen
  } else {
    return (
      <View style={styles.container}>
        <AuthProvider value={auth}>
          <ThemeProvider value={theme}>
            <StatusBar barStyle={styleStatusBar} />

            <NavigationContainer linking={LinkingConfiguration}>
              <Stack.Navigator>
                {authState.userToken == null ? (
                  <Stack.Screen name="AuthRoot" component={AuthNavigator} />
                ) : (
                  <Stack.Screen name="AppRoot" component={AppNavigator} />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </AuthProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
