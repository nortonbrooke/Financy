import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { noop } from "lodash/noop";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const BackButton = (props) => {
  const _handleOnPress = () => {
    if (!props.disabled) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={_handleOnPress}>
      <Ionicons
        name="ios-arrow-back"
        size={28}
        color={Colors.tintColor}
      ></Ionicons>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
};

BackButton.defaultProps = {
  onPress: noop,
  disabled: false,
};

BackButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const styles = new StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.tintColor,
    marginLeft: 5,
  },
});

export default BackButton;
