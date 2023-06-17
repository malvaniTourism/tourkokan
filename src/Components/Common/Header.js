import React from "react";
import { Text, View } from "react-native";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";

import styles from "./Styles";

const Header = ({ startIcon, name, endIcon, style, Component }) => {
  return (
    <View style={[styles.headerMain, style]}>
      {startIcon && <View style={{ flex: 1, marginLeft: 7 }}>{startIcon}</View>}
      <View style={{ flex: 2 }}>
        <Text style={styles.headerText}>{name}</Text>
        {Component && Component}
      </View>
      <View style={{ flex: 1, alignItems: "flex-end", marginRight: 7 }}>
        {endIcon && endIcon}
      </View>
    </View>
  );
};

export default Header;
