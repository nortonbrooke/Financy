import React, { useContext } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { ThemeContext } from "../contexts/theme";
import Colors from "../constants/Colors";
import { omit } from "lodash";

const StyledTextInput = (props) => {
  const theme = useContext(ThemeContext);
  const textInputProps = omit(props, ["children"]);

  return (
    <View>
      <TextInput
        {...textInputProps}
        style={{
          height: 40,
          borderBottomWidth: 1,
          padding: 2,
          marginBottom: 20,
          color: theme.foreground,
          borderBottomColor: theme.foreground,
          paddingRight: props.children ? 35 : 0,
        }}
        placeholderTextColor={Colors.grey}
      />
      {props.children && (
        <View style={styles.inputAddon}>{props.children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputAddon: {
    height: 40,
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    right: 2,
  },
});

export default StyledTextInput;
