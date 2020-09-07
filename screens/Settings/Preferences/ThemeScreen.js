import { FontAwesome5 } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import BackButton from "../../../components/Buttons/BackButton";
import Header from "../../../components/Headers/Header";
import { APIContext } from "../../../contexts/api";
import { UserContext } from "../../../contexts/user";
import { ThemeContext } from "../../../contexts/theme";
import Colors from "../../../constants/Colors";
import { isEmpty, isNull } from "lodash";

const ThemeScreen = ({ navigation, route }) => {
  const { users } = useContext(APIContext);
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  const [selectedTheme, setSelectedTheme] = useState(user.preferences.theme);

  // Helpers
  const _handleOnSave = (theme) => {
    setSelectedTheme(theme);
    users
      .update({
        preferences: {
          theme,
        },
      })
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
        alert(
          "Update Failure",
          "Could not update your theme preference, please try again"
        );
      });
  };

  const THEMES = [
    {
      id: "light",
      title: "Light",
      description: "",
    },
    {
      id: "dark",
      title: "Dark",
      description: "",
    },
    {
      id: "system",
      title: "System",
      description: Platform.select({
        ios: "Match your iOS appearance",
        android: "Match your Android appearance",
        default: "Match your device appearance",
      }),
    },
  ];

  const alert = (title, message) =>
    Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });

  const Item = ({ id, title, description }) => (
    <TouchableOpacity style={styles.item} onPress={() => _handleOnSave(id)}>
      <View>
        <Text style={{ fontWeight: "600", color: theme.foreground }}>
          {title}
        </Text>
        {!isEmpty(description) && (
          <Text style={{ marginTop: 10, color: theme.foreground }}>
            {description}
          </Text>
        )}
      </View>
      {(selectedTheme === id || (id === "system" && isNull(selectedTheme))) && (
        <FontAwesome5 name="check" size={18} color={Colors.tintColor} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.contentContainer}>
        <BackButton onPress={() => navigation.navigate("Appearance")}>
          Back
        </BackButton>
        <View style={styles.formContainer}>
          <Header>Choose Theme</Header>
          <FlatList
            data={THEMES}
            renderItem={({ item }) => (
              <Item
                id={item.id}
                title={item.title}
                description={item.description}
              />
            )}
            keyExtractor={(item) => item.id}
          />
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
  item: {
    minHeight: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
});

export default ThemeScreen;
