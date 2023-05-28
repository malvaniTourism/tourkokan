import React from "react";
import { View, Text, Animated, ImageBackground, Image } from "react-native";
import styles from "./Styles";
import CustomButton from "./Button";

const Alert = ({ alertMessage, closeAlert }) => {
  return (
    <View style={styles.alertBackdrop}>
      <View style={styles.alertContainer}>
        <View style={styles.alertMsgView}>
          <Text>{alertMessage}</Text>
        </View>
        <View style={styles.alertButtonView}>
          <CustomButton title={"Ok"} onPress={closeAlert} />
        </View>
      </View>
    </View>
  );
};

export default Alert;
