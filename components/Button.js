import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { noop } from "lodash/noop";

const Button = (props) => {
  const _handleOnPress = () => {
    if (!props.disabled) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity onPress={_handleOnPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  onPress: noop,
  disabled: false,
};

Button.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
  },
  container: {
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.tintColor,
    borderRadius: 40,
  },
});

export default Button;
