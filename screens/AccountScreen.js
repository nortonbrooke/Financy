import React, { useContext } from "react";
import { SafeAreaView, View, ScrollView, StyleSheet } from "react-native";
import Button from "../components/Button";
import { ThemeContext } from "../contexts/theme";
import { AuthContext } from "../contexts/auth";

export default function AccountScreen() {
  const theme = useContext(ThemeContext);
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.contentContainer}>
        <ScrollView>
          <Button onPress={() => signOut()}>Sign out</Button>
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
