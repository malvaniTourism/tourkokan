import React from "react";
import { View, Text, Animated, ImageBackground, Image } from "react-native";
import styles from "./Styles";
import CustomButton from "./Buttons/TextButton";
import GlobalText from "./Text";
import STRING from "../../Services/Constants/STRINGS";

const Alert = ({ alertMessage, closeAlert, successAlert, proceed }) => {
  return (
    <View style={styles.alertBackdrop}>
      <View style={styles.alertContainer}>
        <View style={styles.alertMsgView}>
          <GlobalText text={alertMessage} />
        </View>
        <View style={styles.alertButtonView}>
          {
            successAlert ?
              <CustomButton containerStyle={styles.alertContainerStyle} buttonStyle={styles.alertButtonStyle} title={STRING.BUTTON.OK} onPress={proceed} />
              :
              <CustomButton containerStyle={styles.alertContainerStyle} buttonStyle={styles.alertButtonStyle} title={STRING.BUTTON.OK} onPress={closeAlert} />
          }
        </View>
      </View>
    </View>
  );
};

export default Alert;
