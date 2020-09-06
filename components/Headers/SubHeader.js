import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../../contexts/theme";

const SubHeader = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <Text
      {...props}
      style={{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        color: theme.foreground,
      }}
    />
  );
};

export default SubHeader;
