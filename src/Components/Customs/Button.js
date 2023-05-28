import { Button } from "@rneui/themed";
import React from "react";
import styles from "./Styles";
import { View } from "react-native";

const CustomButton = ({
  title,
  containerStyle,
  buttonStyle,
  titleStyle,
  isDisabled,
  raised,
  type,
  onPress,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Button
        title={title}
        containerStyle={[styles.containerStyle, containerStyle]}
        buttonStyle={[styles.buttonStyle, buttonStyle]}
        titleStyle={[styles.titleStyle, titleStyle]}
        disabled={isDisabled}
        raised={raised}
        type={type}
        onPress={onPress}
      />
    </View>
  );
};

export default CustomButton;
