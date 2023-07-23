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
  roleDropDown: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: COLOR.grey,
    borderRadius: DIMENSIONS.borderRadius,
  },
  imageContainerStyle: {
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderColor: COLOR.grey,
    borderRadius: DIMENSIONS.borderRadius,
    width: DIMENSIONS.bannerWidth,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainerStyle: {
    borderColor: COLOR.transparent,
    marginBottom: 20
  }
});

export default styles;
