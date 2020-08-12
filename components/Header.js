import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../contexts/theme";

const Header = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <Text
      {...props}
      style={{ fontSize: 30, color: theme.foreground, marginBottom: 20 }}
    />
  );
};

export default Header;
