import React, { useContext } from "react";
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from "react-native";
import { UserContext } from "../../../contexts/user";
import { ThemeContext } from "../../../contexts/theme";
import Header from "../../../components/Headers/Header";
import StackButton from "../../../components/Buttons/StackButton";

export default function AppearanceScreen({ navigation }) {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.contentContainer}>
        {user ? (
          <ScrollView>
            <Header>App Appearance</Header>
            <StackButton
              label="Theme"
              onPress={() =>
                navigation.navigate({
                  name: "Theme",
                })
              }
            ></StackButton>
          </ScrollView>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 15,
  },
});
