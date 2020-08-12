import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../contexts/theme";

const StyledText = (props) => {
  const theme = useContext(ThemeContext);

  return <Text {...props} style={{ color: theme.foreground }} />;
};

export default StyledText;
