import { FontAwesome5 } from "@expo/vector-icons";
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

import Colors from "../constants/Colors";

const TabBarIcon = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <FontAwesome5
      name={props.name}
      size={22}
      color={props.focused ? theme.foreground : Colors.tabIconDefault}
    />
  );
};

export default TabBarIcon;
