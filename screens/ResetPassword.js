import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Header from "../components/Header";
import Button from "../components/Button";
import Link from "../components/Link";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import { ThemeContext } from "../contexts/theme";
import { APIContext } from "../contexts/api";
import { validator } from "../util/";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const theme = useContext(ThemeContext);
  const { emails } = useContext(APIContext);

  // Validation
  const emailValid = validator.isValidEmail(email);
  const formValid = emailValid;

  // Helpers
  const _handleResetPassword = async () => {
    if (formValid) {
      try {
        setSending(true);
        await emails.sendPasswordResetEmail({ email });
        setSending(false);
        setSent(true);
      } catch (error) {
        setSending(false);
        setSent(false);
        switch (error.code) {
          case "auth/invalid-email":
            alert("Reset Password Failed", "Email address is not valid");
            break;
          case "auth/user-not-found":
            alert("Reset Password Failed", "Account not found");
            break;
          default:
            alert("Reset Password Failed", error.message);
            break;
        }
      }
    } else if (!emailValid) {
      alert("Invalid Email", "Please enter a valid email address");
    }
  };

  const alert = (title, message) =>
    Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.background,
      }}
    >
      <View style={styles.contentContainer}>
        <Header>Reset Password</Header>
        <View style={styles.textContainer}>
          <Text>
            Enter the email address associated with your account. We'll send you
            an email with password reset instructions.
          </Text>
        </View>
        <TextInput
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Button onPress={_handleResetPassword}>
          {sent ? "Sent" : sending ? "Sending..." : "Send"}
        </Button>
        <View style={styles.centeredContentContainer}>
          <Link onPress={() => navigation.navigate("SignIn")}>Sign in</Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 30,
  },
  centeredContentContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 30,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
});
