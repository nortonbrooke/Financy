import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, View, Alert } from "react-native";
import Button from "../../../components/Buttons/Button";
import Link from "../../../components/Link";
import Header from "../../../components/Headers/Header";
import Text from "../../../components/Text";
import TextInput from "../../../components/TextInput";
import { APIContext } from "../../../contexts/api";
import { ThemeContext } from "../../../contexts/theme";
import { validator } from "../../../util";
import { isEmpty } from "lodash";

export default function ChangePasswordScreen({ navigation }) {
  const { auth } = useContext(APIContext);
  const theme = useContext(ThemeContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation
  const currentPasswordValid = !isEmpty(currentPassword);
  const newPasswordValid = validator.isValidPassword(newPassword);

  // Helpers
  const _handleOnSave = () => {
    if (!currentPasswordValid) {
      alert("Invalid Password", "Please enter your current password");
      return;
    }

    if (!newPasswordValid) {
      alert(
        "Invalid Password",
        "Your new password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters"
      );
      return;
    }

    setLoading(true);
    auth
      .reauthenticate(currentPassword)
      .then(() => {
        auth
          .updatePassword(newPassword)
          .then(() => {
            setLoading(false);
            navigation.navigate("Account");
          })
          .catch((error) => {
            console.log(error.message);
            setLoading(false);
            alert(
              "Update Failure",
              "Could not update your password, please try again"
            );
          });
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        alert(
          "Authentication Failure",
          "The current password entered is incorrect"
        );
      });
  };

  const alert = (title, message) =>
    Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Header>Change Password</Header>
          <TextInput
            placeholder="Current password"
            textContentType="password"
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrentPassword}
            autoFocus={true}
          >
            <Link onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
              {showCurrentPassword ? "Hide" : "Show"}
            </Link>
          </TextInput>
          <TextInput
            placeholder="New password"
            textContentType="password"
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
          >
            <Link onPress={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? "Hide" : "Show"}
            </Link>
          </TextInput>
          <View style={styles.textContainer}>
            <Text>
              Password must contain at least one lowercase letter, one uppercase
              letter, one number, and be at least 8 characters.
            </Text>
          </View>
          <Button onPress={_handleOnSave}>
            {loading ? "Updating..." : "Continue"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  formContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
});
