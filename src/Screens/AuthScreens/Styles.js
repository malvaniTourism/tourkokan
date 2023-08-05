import { StyleSheet } from "react-native";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import COLOR from "../../Services/Constants/COLORS";

const styles = StyleSheet.create({
  appLogo: {
    height: 100,
  },
  buttonView: {
    borderRadius: DIMENSIONS.borderRadius,
    overflow: 'hidden',
    marginTop: 30
  },
  buttonContainer: {},
  buttonStyle: {
    paddingVertical: 13
  },
  buttonTitle: {},
  haveAcc: {
    flexDirection: "row",
    marginVertical: 30,
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
    padding: 14,
    borderColor: COLOR.grey,
    borderRadius: DIMENSIONS.borderRadius,
    width: DIMENSIONS.iconXL,
    height: DIMENSIONS.iconXL,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputContainerStyle: {
    borderColor: COLOR.transparent,
    marginBottom: 20
  },
  loginHeader: {
    backgroundColor: COLOR.loginImageBackground,
    marginBottom: -20
  },
  loginImage: {
    height: DIMENSIONS.bannerHeight,
    width: DIMENSIONS.screenWidth
  },
  loginText: {
    fontWeight: "bold",
    fontSize: DIMENSIONS.headerTextSize,
    padding: 30,
    paddingBottom: 10
  }
});

export default styles;
