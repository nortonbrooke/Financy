import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/theme";
import { noop } from "lodash/noop";
import Colors from "../../constants/Colors";

const Link = (props) => {
  const theme = useContext(ThemeContext);

  const _handleOnPress = () => {
    if (!props.disabled) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={_handleOnPress}>
      <Text
        style={{ fontWeight: "bold", color: props.color || theme.foreground }}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

Link.defaultProps = {
  onPress: noop,
  disabled: false,
  color: Colors.black,
};

Link.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
});

export default Link;
