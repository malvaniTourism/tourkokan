import { Button } from "@rneui/themed";
import React from "react";
import styles from "./Styles";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomButton = ({
  title,
  containerStyle,
  buttonStyle,
  titleStyle,
  isDisabled,
  raised,
  type,
  onPress,
  icon
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.seeMore}>
      <Button
        title={title}
        containerStyle={[styles.containerStyle, containerStyle]}
        buttonStyle={[styles.buttonStyle, buttonStyle]}
        titleStyle={[styles.titleStyle, titleStyle]}
        disabled={isDisabled}
        raised={raised}
        type={type}
      />
      {icon}
    </TouchableOpacity>
  );
};

export default CustomButton;
