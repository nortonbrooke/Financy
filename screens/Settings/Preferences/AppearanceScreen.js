import React, { useContext } from "react";
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from "react-native";
import { UserContext } from "../../../contexts/user";
import { ThemeContext } from "../../../contexts/theme";
import BackButton from "../../../components/Buttons/BackButton";
import Header from "../../../components/Headers/Header";
import StackButton from "../../../components/Buttons/StackButton";

export default function AppearanceScreen({ navigation }) {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.contentContainer}>
        <BackButton onPress={() => navigation.navigate("SettingsIndex")}>
          Settings
        </BackButton>
        {user ? (
          <ScrollView>
            <View style={styles.sectionContainer}>
              <Header>App Appearance</Header>
              <StackButton
                label="Theme"
                onPress={() =>
                  navigation.navigate({
                    name: "Theme",
                  })
                }
              ></StackButton>
            </View>
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
  sectionContainer: {
    marginBottom: 30,
  },
});
