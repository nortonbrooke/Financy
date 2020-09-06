import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";

export default function useCachedResources() {
  const [loading, setLoading] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    let loadResourcesAndDataAsync = async () => {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome5.font,
          ...Ionicons.font,
          roboto: require("../assets/fonts/Roboto-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoading(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();

    return () => {
      loadResourcesAndDataAsync = null;
    }
  }, []);

  return loading;
}
