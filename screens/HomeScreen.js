import React, { useContext, useState } from "react";
import { SafeAreaView, View, ScrollView, StyleSheet } from "react-native";
import { ThemeContext } from "../contexts/theme";

export default function HomeScreen() {
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <View style={styles.contentContainer}>
        <ScrollView></ScrollView>
      </View>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
});
