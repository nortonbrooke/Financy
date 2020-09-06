import * as WebBrowser from "expo-web-browser";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Header from "../components/Headers/Header";
import Button from "../components/Buttons/Button";
import Link from "../components/Link";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import { AppContext } from "../contexts/app";
import { ThemeContext } from "../contexts/theme";
import { AuthContext } from "../contexts/auth";
import { validator } from "../util";
import { isEmpty } from "lodash";
import Colors from "../constants/Colors";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const app = useContext(AppContext);
  const theme = useContext(ThemeContext);
  const { signUp } = useContext(AuthContext);

  // Validation
  const nameValid = !isEmpty(name);
  const emailValid = validator.isValidEmail(email);
  const passwordValid = validator.isValidPassword(password);
  const passwordValidSteps = {
    hasUppercase: validator.containsUppercase(password),
    hasLowercase: validator.containsLowercase(password),
    hasNumbers: validator.containsNumbers(password),
    meetsLength: validator.passwordMeetsMinLength(password),
  };
  const formValid = nameValid && emailValid && passwordValid;

  // Helpers
  const _handleSignUp = async () => {
    if (formValid) {
      setLoading(true);
      await signUp({ name, email, password });
      setLoading(false);
    } else if (!nameValid) {
      alert("Invalid Name", "Please enter a name");
    } else if (!emailValid) {
      alert("Invalid Email", "Please enter a valid email address");
    } else if (!passwordValid) {
      alert(
        "Invalid Password",
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters"
      );
    }
  };

  const alert = (title, message) =>
    Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });

  const bubbleStyle = {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.background,
      }}
    >
      <View style={styles.contentContainer}>
        <Header>Create Account</Header>
        <TextInput
          placeholder="Name"
          textContentType="name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          textContentType="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        >
          <Link onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </Link>
        </TextInput>
        <View style={styles.validationContainer}>
          <View style={styles.validationTextContainer}>
            <Text>Password requirements:</Text>
          </View>
          <View style={styles.validationItemContainer}>
            <View
              style={{
                ...bubbleStyle,
                borderColor: passwordValidSteps.hasLowercase
                  ? "transparent"
                  : theme.foreground,
                backgroundColor: passwordValidSteps.hasLowercase
                  ? Colors.tintColor
                  : "transparent",
              }}
            ></View>
            <Text>At least one lowercase letter</Text>
          </View>
          <View style={styles.validationItemContainer}>
            <View
              style={{
                ...bubbleStyle,
                borderColor: passwordValidSteps.hasUppercase
                  ? "transparent"
                  : theme.foreground,
                backgroundColor: passwordValidSteps.hasUppercase
                  ? Colors.tintColor
                  : "transparent",
              }}
            ></View>
            <Text>At least one uppercase letter</Text>
          </View>
          <View style={styles.validationItemContainer}>
            <View
              style={{
                ...bubbleStyle,
                borderColor: passwordValidSteps.hasNumbers
                  ? "transparent"
                  : theme.foreground,
                backgroundColor: passwordValidSteps.hasNumbers
                  ? Colors.tintColor
                  : "transparent",
              }}
            ></View>
            <Text>At least one number</Text>
          </View>
          <View style={styles.validationItemContainer}>
            <View
              style={{
                ...bubbleStyle,
                borderColor: passwordValidSteps.meetsLength
                  ? "transparent"
                  : theme.foreground,
                backgroundColor: passwordValidSteps.meetsLength
                  ? Colors.tintColor
                  : "transparent",
              }}
            ></View>
            <Text>Be at least 8 characters</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text>By creating an account, you agree to our </Text>
          <Link
            onPress={() => WebBrowser.openBrowserAsync(app.urls.termsOfService)}
          >
            Terms of Service
          </Link>
          <Text> and </Text>
          <Link
            onPress={() => WebBrowser.openBrowserAsync(app.urls.privacyPolicy)}
          >
            Privacy Policy
          </Link>
          <Text>.</Text>
        </View>
        <Button onPress={_handleSignUp}>
          {loading ? "Signing up..." : "Sign up"}
        </Button>
        <View style={styles.centeredContentContainer}>
          <Link onPress={() => navigation.navigate("SignIn")}>
            Already have an account? Sign in
          </Link>
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
  validationContainer: {
    marginBottom: 20,
  },
  validationTextContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  validationItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
