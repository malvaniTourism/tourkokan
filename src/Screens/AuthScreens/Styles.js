import { StyleSheet } from "react-native";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import COLOR from "../../Services/Constants/COLORS";

const styles = StyleSheet.create({
  appLogo: {
    height: 70,
    marginTop: 30
  },
  buttonView: {
    borderRadius: DIMENSIONS.borderRadius,
    overflow: "hidden",
    marginTop: 30
  },
  buttonContainer: {
    
  },
  choiceButtonContainer: {
    width: DIMENSIONS.screenWidth / 2 - 40
  },
  choiceButtonStyle: {
    width: DIMENSIONS.screenWidth / 2 - 40
  },
  buttonStyle: {
    paddingVertical: 13
  },
  buttonTitle: {},
  haveAcc: {
    flexDirection: "row",
    marginVertical: 20,
  },
  containerStyle: {
    borderWidth: 1,
    padding: 10,
    borderColor: COLOR.white,
    borderRadius: DIMENSIONS.borderRadius,
    color: COLOR.white
  },
  otpContainerStyle: {
    borderWidth: 1,
    padding: 10,
    borderColor: COLOR.white,
    borderRadius: DIMENSIONS.borderRadius,
    color: COLOR.black
  },
  eyeIcon: {
    position: "absolute",
    left: -40
  },
  roleDropDown: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: COLOR.grey,
    borderRadius: DIMENSIONS.borderRadius,
    color: COLOR.white
  },
  selectedTextStyle: {
    color: COLOR.white
  },
  imageContainerStyle: {
    borderWidth: 1,
    borderColor: COLOR.grey,
    borderRadius: DIMENSIONS.borderRadiusLarge,
    width: DIMENSIONS.iconXXXL,
    height: DIMENSIONS.iconXXXL,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imageSourceView: {
    width: DIMENSIONS.iconXXL,
    height: DIMENSIONS.iconXXL,
    borderRadius: DIMENSIONS.borderRadiusLarge,
  },
  inputContainerStyle: {
    borderColor: COLOR.transparent,
    marginBottom: 20
  },
  loginHeader: {
  },
  loginImage: {
    height: DIMENSIONS.screenHeight,
    width: DIMENSIONS.screenWidth,
    position: "absolute"
  },
  changeOption: {
    fontWeight: "bold",
    fontSize: DIMENSIONS.headerTextSize,
    padding: 10,
    paddingBottom: 10,
    color: COLOR.themeComicBlue,
    backgroundColor: COLOR.white,
    borderRadius: DIMENSIONS.borderRadius,
    marginTop: 10
  },
  loginText: {
    fontWeight: "bold",
    fontSize: DIMENSIONS.headerTextSize,
    padding: 30,
    paddingBottom: 10,
    color: COLOR.white
  },
  appName: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.white,
    width: DIMENSIONS.appLogo + 40,
    maxHeight: DIMENSIONS.appLogo + 40,
    borderRadius: DIMENSIONS.borderRadiusXL,
    marginTop: 50,
    resizeMode: "contain",
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 10,
  },
  appLogo: {
    height: DIMENSIONS.appLogo,
    width: DIMENSIONS.appLogo,
  },
  appNameText: {
    fontSize: DIMENSIONS.xlText,
    fontWeight: "bold"
  },
  loginContentsBox: {
    backgroundColor: COLOR.blackOpacityDark,
    borderRadius: DIMENSIONS.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  whiteText: {
    color: COLOR.white
  },
  selectText: {
    color: COLOR.white,
    fontWeight: "bold",
    top: 10
  }
});

export default styles;
