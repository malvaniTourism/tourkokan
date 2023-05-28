import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles";

const SmallCard = ({ style, Icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.smallCard, style]}>
        <View style={styles.smallCardIcon}>{Icon}</View>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SmallCard;
