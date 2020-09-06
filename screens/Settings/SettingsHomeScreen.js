import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import StackButton from "../../components/Buttons/StackButton";
import StyledButton from "../../components/Buttons/StyledButton";
import SubHeader from "../../components/Headers/SubHeader";
import { ThemeContext } from "../../contexts/theme";
import { AuthContext } from "../../contexts/auth";
import Colors from "../../constants/Colors";

export default function SettingsHomeScreen({ navigation }) {
  const theme = useContext(ThemeContext);
  const { signOut } = useContext(AuthContext);

  const confirmSignOut = () =>
    Alert.alert(
      "Sign out",
      "Are you sure you want to sign out?",
      [{ text: "No" }, { text: "Yes", onPress: () => signOut() }],
      { cancelable: false }
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={styles.sectionContainer}>
            <SubHeader>Account</SubHeader>
            <StackButton
              label="Account Information"
              onPress={() => navigation.navigate("Account")}
            ></StackButton>
          </View>
          <View style={styles.sectionContainer}>
            <SubHeader>Preferences</SubHeader>
            <StackButton
              label="App Appearance"
              onPress={() => navigation.navigate("Appearance")}
            ></StackButton>
            <StackButton label="Notifications"></StackButton>
          </View>
          <View style={styles.sectionContainer}>
            <SubHeader>Security</SubHeader>
            <StackButton label="Device Security"></StackButton>
            <StackButton label="Two-Factor Authentication"></StackButton>
          </View>
          <StyledButton color={Colors.tintColor} onPress={confirmSignOut}>
            Sign out
          </StyledButton>
        </ScrollView>
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
