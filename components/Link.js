import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";
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
      <Text style={{ fontSize: 14, color: theme.foreground }}>
        {props.children}
      </Text>
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

export default Link;
