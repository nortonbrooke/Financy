import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import Button from "../components/Button";
import { ThemeContext } from "../contexts/theme";
import { AuthContext } from "../contexts/auth";

export default function AccountScreen() {
  const theme = useContext(ThemeContext);
  const { signOut } = useContext(AuthContext);

  const confirmSignOut = () =>
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [{ text: "No" }, { text: "Yes", onPress: () => signOut() }],
      { cancelable: false }
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.contentContainer}>
        <ScrollView>
          <Button onPress={() => confirmSignOut()}>Sign out</Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

AccountScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
});
