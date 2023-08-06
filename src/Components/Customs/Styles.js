import { StyleSheet } from "react-native";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    width: DIMENSIONS.bannerWidth,
    paddingLeft: 20
  },
  textFieldContainer: {
    borderWidth: 0,
    padding: 10,
    borderColor: COLOR.grey,
    marginBottom: -50,
    alignItems: "center"
  },
  inputContainer: {
    width: DIMENSIONS.bannerWidth,
  },
  leftIconContainerStyle: {
    top: -10,
    left: 10
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    width: DIMENSIONS.screenWidth,
  },
  searchInputContainer: {
    backgroundColor: COLOR.white,
    borderRadius: DIMENSIONS.borderRadius,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 10,
  },
  smallCard: {
    width: DIMENSIONS.screenWidth / 2 - 30,
    height: DIMENSIONS.headerHeight,
    backgroundColor: COLOR.white,
    elevation: 10,
    margin: 10,
    borderRadius: DIMENSIONS.borderRadiusXXS,
    flexDirection: "row",
    alignItems: "center",
  },
  smallCardIcon: {
    marginHorizontal: 10,
  },
  banner: {
    width: DIMENSIONS.screenWidth,
    height: DIMENSIONS.halfWidth,
    // elevation: 10,
    animation: "fadeinout 4s infinite",
    marginBottom: -25
  },
  bannerImage: {
    width: DIMENSIONS.screenWidth,
    height: DIMENSIONS.halfWidth,
    animation: "fadeinout 4s infinite",
    opacity: 1
  },
  buttonView: {
    overflow: 'hidden',
    borderRadius: DIMENSIONS.borderRadiusXS,
  },
  containerStyle: {
    width: DIMENSIONS.bannerWidth,
    borderRadius: DIMENSIONS.borderRadiusXS,
    overflow: 'hidden'
  },
  buttonStyle: {
    width: DIMENSIONS.bannerWidth,
  },
  alertContainerStyle: {
    width: DIMENSIONS.bannerWidth - 40,
  },
  alertButtonStyle: {
    width: DIMENSIONS.bannerWidth - 40,
  },
  titleStyle: {
    color: COLOR.white,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  alertBackdrop: {
    height: DIMENSIONS.screenHeight,
    width: DIMENSIONS.screenWidth,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainer: {
    zIndex: 100,
    backgroundColor: COLOR.white,
    height: DIMENSIONS.bannerHeight,
    width: DIMENSIONS.bannerWidth,
  },
  alertMsgView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  alertButtonView: {
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: COLOR.themeComicBlue,
  },
  dropdown: {
    width: DIMENSIONS.bannerWidth,
    marginBottom: 10,
    padding: 7,
    borderWidth: 1,
    borderColor: COLOR.grey,
    color: COLOR.black
  },
  text: {
    color: COLOR.black,
    fontSize: DIMENSIONS.textSize
  }
});

export default styles;
