import { StyleSheet } from "react-native";
import COLOR from "../../Services/Constants/COLORS.js";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS.js";

const styles = StyleSheet.create({
  topComponent: {
    height: (DIMENSIONS.windowHeight * 27) / 100,
    width: DIMENSIONS.windowWidth,
    backgroundColor: COLOR.themeDarkGreen,
    borderBottomLeftRadius: DIMENSIONS.borderRadiusSmall,
    borderBottomRightRadius: DIMENSIONS.borderRadiusSmall,
    position: "relative",
  },
  userIcon: {
    margin: 10,
  },
  topMenu: {
    backgroundColor: COLOR.transparent,
    width: DIMENSIONS.windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: 10,
  },
  fieldsView: {
    borderWidth: 1,
    borderColor: COLOR.grey,
    borderBottomColor: COLOR.transparent,
    paddingTop: 10,
    marginBottom: -15,
  },
  textContainerStyle: {
    width: DIMENSIONS.bannerWidth,
    marginBottom: -16,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: COLOR.transparent,
  },
  searchPanelField: {
    borderRadius: DIMENSIONS.borderRadius,
  },
  searchButtonContainerStyle: {
    marginTop: 15,
    borderBottomLeftRadius: DIMENSIONS.borderRadiusSmall,
    borderBottomRightRadius: DIMENSIONS.borderRadiusSmall,
  },
  searchButtonStyle: {
    height: 50,
    backgroundColor: COLOR.themeDarkGreen,
    borderBottomLeftRadius: DIMENSIONS.borderRadiusSmall,
    borderBottomRightRadius: DIMENSIONS.borderRadiusSmall,
  },
  buttonTitleStyle: {
    color: COLOR.white,
    fontWeight: "bold",
  },
  headerMain: {
    // flex: 1,
    height: DIMENSIONS.headerHeight,
    width: DIMENSIONS.screenWidth,
    backgroundColor: COLOR.themeDarkGreen,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: DIMENSIONS.headerTextSize,
    textAlign: "center",
  },
});

export default styles;
