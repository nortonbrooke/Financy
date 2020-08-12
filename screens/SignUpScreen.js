import * as WebBrowser from "expo-web-browser";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Header from "../components/Header";
import Button from "../components/Button";
import Link from "../components/Link";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import { AppContext } from "../contexts/app";
import { ThemeContext } from "../contexts/theme";
import { AuthContext } from "../contexts/auth";
import { validator } from "../util";
import { isEmpty } from "lodash";

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
        "Password must be 8 characters long and contain upper and lowercase letters"
      );
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
});
