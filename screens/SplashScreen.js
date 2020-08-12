import React, { useContext } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { AppContext } from "../contexts/app";

export default function SplashScreen() {
  const app = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{app.name}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tintColor,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    color: Colors.black,
  },
});
