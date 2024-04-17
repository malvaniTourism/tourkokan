import { Button } from "@rneui/themed";
import React from "react";
import styles from "./Styles";
import { TouchableOpacity, View } from "react-native";
import STRING from "../../../Services/Constants/STRINGS";
import GlobalText from "../Text";

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
  buttonView
}) => {
  return (
    <TouchableOpacity onPress={isDisabled ? null : onPress} style={[styles.buttonView, buttonView]}>
      {startIcon}
      <GlobalText text={title} style={[styles.titleStyle, titleStyle]} />
      {endIcon}
    </TouchableOpacity>
  );
};

export default TextButton;
