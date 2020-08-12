import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Header from "../components/Header";
import Button from "../components/Button";
import Link from "../components/Link";
import TextInput from "../components/TextInput";
import { AppContext } from "../contexts/app";
import { AuthContext } from "../contexts/auth";
import { ThemeContext } from "../contexts/theme";
import { validator } from "../util";
import { isEmpty } from "lodash";

export default function SignInScreen({ navigation }) {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Contexts
  const app = useContext(AppContext);
  const theme = useContext(ThemeContext);
  const { signIn } = useContext(AuthContext);

  // Validation
  const emailValid = validator.isValidEmail(email);
  const passwordValid = !isEmpty(password);
  const formValid = emailValid && passwordValid;

  // Helpers
  const _handleSignIn = async () => {
    if (formValid) {
      setLoading(true);
      await signIn({ email, password });
      setLoading(false);
    } else if (!emailValid) {
      alert("Invalid Email", "Please enter a valid email address");
    } else if (!passwordValid) {
      alert("Invalid Password", "Please enter a password");
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
        <Header>{app.name}</Header>
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
        <View style={styles.rightContentContainer}>
          <Link onPress={() => navigation.navigate("ResetPassword")}>
            Forgot password?
          </Link>
        </View>
        <Button onPress={_handleSignIn}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
        <View style={styles.centeredContentContainer}>
          <Link onPress={() => navigation.navigate("SignUp")}>
            Don't have an account? Sign up
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
  rightContentContainer: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 20,
  },
});
