import { Button } from "@rneui/themed";
import React from "react";
import styles from "./Styles";
import { TouchableOpacity, View } from "react-native";
import STRING from "../../../Services/Constants/STRINGS";

const TextButton = ({
  title,
  containerStyle,
  buttonStyle,
  titleStyle,
  isDisabled,
  raised,
  type,
  onPress,
  startIcon,
  endIcon,
  seeMoreStyle
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonView, seeMoreStyle]}>
      {startIcon}
      <Button
        title={title}
        containerStyle={[styles.containerStyle, containerStyle]}
        buttonStyle={[styles.buttonStyle, buttonStyle]}
        titleStyle={[styles.titleStyle, titleStyle]}
        disabled={isDisabled}
        raised={raised}
        type={STRING.BUTTON.SUBMIT}
        onPress={onPress}
      />
      {endIcon}
    </TouchableOpacity>
  );
};

export default TextButton;
