import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/theme";
import { noop } from "lodash/noop";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { isEmpty } from "lodash";

const StackButton = (props) => {
  const theme = useContext(ThemeContext);

  const _handleOnPress = () => {
    if (!props.disabled) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={_handleOnPress}>
      <View>
        <Text style={{ color: theme.foreground }}>{props.label}</Text>
        {!isEmpty(props.value) && (
          <Text style={{ marginTop: 10, color: theme.foreground }}>
            {props.value}
          </Text>
        )}
      </View>
      {!props.disabled && (
        <Ionicons
          name="ios-arrow-forward"
          size={20}
          color={Colors.grey}
        ></Ionicons>
      )}
    </TouchableOpacity>
  );
};

StackButton.defaultProps = {
  onPress: noop,
  disabled: false,
  label: "",
  value: "",
};

StackButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
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

export default StackButton;
