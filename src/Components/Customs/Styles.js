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
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.grey,
    padding: 10,
  },
  textFieldContainer: {},
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
    width: DIMENSIONS.bannerWidth,
    height: DIMENSIONS.halfWidth,
    backgroundColor: COLOR.white,
    elevation: 10,
    animation: "fadeinout 4s infinite",
  },
  bannerImage: {
    width: DIMENSIONS.bannerWidth,
    height: DIMENSIONS.halfWidth,
    animation: "fadeinout 4s infinite",
  },
  routeLineVert: {
    borderColor: COLOR.black,
    borderWidth: 1,
    position: "absolute",
    height: 80,
    top: -30,
    left: 5,
  },
  routeDot: {
    borderColor: COLOR.black,
    borderWidth: 6,
    borderRadius: DIMENSIONS.borderRadius,
  },
  containerStyle: {
    width: DIMENSIONS.bannerWidth,
  },
  buttonStyle: {
    width: DIMENSIONS.bannerWidth,
    backgroundColor: COLOR.themeDarkGreen,
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
    height: DIMENSIONS.bannerWidth / 2,
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
  dropdown: {
    width: DIMENSIONS.bannerWidth + 20,
    backgroundColor: COLOR.white,
    marginBottom: 25,
    padding: 7,
    borderWidth: 1,
    borderColor: COLOR.grey,
  },
});

export default styles;
