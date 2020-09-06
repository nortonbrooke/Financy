import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, View, Alert } from "react-native";
import Button from "../../components/Buttons/Button";
import BackButton from "../../components/Buttons/BackButton";
import Header from "../../components/Headers/Header";
import TextInput from "../../components/TextInput";
import { APIContext } from "../../contexts/api";
import { ThemeContext } from "../../contexts/theme";
import { isEmpty } from "lodash";

const UpdateNameScreen = ({ navigation, route }) => {
  const { users } = useContext(APIContext);
  const theme = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation
  const nameValid = !isEmpty(name);

  // Helpers
  const _handleOnSave = () => {
    if (nameValid) {
      setLoading(true);
      users
        .update({
          name,
        })
        .then(function () {
          setLoading(false);
          navigation.navigate("Account");
        })
        .catch(function (error) {
          console.log(error.message);
          setLoading(false);
          alert(
            "Update Failure",
            "Could not update your name, please try again"
          );
        });
    } else {
      alert("Invalid Name", "Please enter a name");
    }
  };

  const alert = (title, message) =>
    Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.contentContainer}>
        <BackButton onPress={() => navigation.navigate("Account")}></BackButton>
        <View style={styles.formContainer}>
          <Header>Update Name</Header>
          <TextInput
            placeholder={route.params.name}
            autoFocus={true}
            onChangeText={setName}
          ></TextInput>
          <Button onPress={_handleOnSave}>
            {loading ? "Updating..." : "Update"}
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
});

export default UpdateNameScreen;
