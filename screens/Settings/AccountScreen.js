import React, { useContext, useState } from "react";
import moment from "moment";
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../../contexts/theme";
import useUser from "../../hooks/useUser";
import BackButton from "../../components/Buttons/BackButton";
import Header from "../../components/Headers/Header";
import StyledButton from "../../components/Buttons/StyledButton";
import StackButton from "../../components/Buttons/StackButton";
import Colors from "../../constants/Colors";

export default function AccountScreen({ navigation }) {
  const theme = useContext(ThemeContext);
  const user = useUser();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.contentContainer}>
        <BackButton
          onPress={() => navigation.navigate("SettingsHome")}
        >Settings</BackButton>
        {user ? (
          <ScrollView>
            <View style={styles.sectionContainer}>
              <Header>Account Information</Header>
              <StackButton
                label="Name"
                value={user.name}
                onPress={() =>
                  navigation.navigate({
                    name: "UpdateName",
                    params: { name: user.name },
                  })
                }
              ></StackButton>
              <StackButton
                label="Email"
                value={user.email}
                disabled
              ></StackButton>
              <StackButton
                label="Password"
                onPress={() =>
                  navigation.navigate({
                    name: "UpdatePassword",
                  })
                }
              ></StackButton>
              <StackButton
                label="Created"
                value={moment(user.created.toDate()).format("MMMM Do YYYY")}
                disabled
              ></StackButton>
            </View>
            <StyledButton color={Colors.dangerText}>
              Delete Account
            </StyledButton>
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
