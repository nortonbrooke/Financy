import React, { useContext } from "react";
import moment from "moment";
import { SafeAreaView, View, ScrollView, StyleSheet, Text } from "react-native";
import { UserContext } from "../../../contexts/user";
import { ThemeContext } from "../../../contexts/theme";
import Header from "../../../components/Headers/Header";
import StyledButton from "../../../components/Buttons/StyledButton";
import StackButton from "../../../components/Buttons/StackButton";
import Colors from "../../../constants/Colors";

export default function AccountScreen({ navigation }) {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.contentContainer}>
        {user ? (
          <ScrollView>
            <Header>Account</Header>
            <View style={styles.sectionContainer}>
              <StackButton
                label="Name"
                value={user.name}
                onPress={() =>
                  navigation.navigate({
                    name: "UpdateName",
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
                    name: "ChangePassword",
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
