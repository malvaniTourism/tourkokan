import { StyleSheet } from "react-native";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import COLOR from "../../Services/Constants/COLORS";

const styles = StyleSheet.create({
  appLogo: {
    height: 100,
  },
  buttonContainer: {},
  buttonStyle: {},
  buttonTitle: {},
  haveAcc: {
    flexDirection: "row",
    marginTop: 30,
  },
  containerStyle: {
    borderWidth: 1,
    padding: 10,
    borderColor: COLOR.grey,
    borderRadius: DIMENSIONS.borderRadius
  },
  inputContainerStyle: {
    borderColor: COLOR.transparent,
    marginBottom: 20
  }
});

export default styles;
