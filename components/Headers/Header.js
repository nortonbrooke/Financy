import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../../contexts/theme";

const Header = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <Text
      {...props}
      style={{
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: theme.foreground,
      }}
    />
  );
};

export default Header;
