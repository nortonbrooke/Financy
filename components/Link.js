import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemeContext } from "../contexts/theme";
import { noop } from "lodash/noop";

const Link = (props) => {
  const theme = useContext(ThemeContext);

  const _handleOnPress = () => {
    if (!props.disabled) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity onPress={_handleOnPress}>
      <View>
        <Text style={{ ...styles.text, color: theme.foreground }}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Link.defaultProps = {
  onPress: noop,
  disabled: false,
  underline: false,
};

Link.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  underline: PropTypes.bool,
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

export default Link;
