import { StyleSheet } from "react-native";
import COLOR from "../../Services/Constants/COLORS.js";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS.js";

const styles = StyleSheet.create({
  topComponent: {
    width: DIMENSIONS.windowWidth,
    borderBottomLeftRadius: DIMENSIONS.borderRadiusSmall,
    borderBottomRightRadius: DIMENSIONS.borderRadiusSmall,
  },
  userIcon: {
    margin: 10,
  },
  topMenu: {
    backgroundColor: COLOR.logoBlue,
    width: DIMENSIONS.windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  locationView: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  fontBold: {
    fontWeight: "bold",
    fontSize: DIMENSIONS.headerTextSize,
    marginRight: 5,
  },
  whiteBold: {
    fontWeight: "bold",
    fontSize: DIMENSIONS.headerTextSize,
    marginRight: 5,
    color: COLOR.white
  },
  listView: {
    zIndex: 1,
    height: 200,
    top: 70,
    position: "absolute",
    width: DIMENSIONS.screenWidth,
  },
  currLocView: {
    zIndex: 0,
    padding: 10,
    position: "relative",
    flexDirection: "row",
    alignItems: "center"
  },
  recentsView: {
    marginTop: 10,
    padding: 20,
    borderTopWidth: 1,
    borderColor: COLOR.grey
  },
  recentsListView: {
    marginTop: 10,
    flexDirection: "row"
  },
  fieldsView: {
    borderWidth: .5,
    borderColor: COLOR.logoBlue,
    borderRadius: DIMENSIONS.borderRadius,
    paddingBottom: 10,
    backgroundColor: COLOR.white
  },
  textContainerStyle: {
    width: DIMENSIONS.bannerWidth,
    marginBottom: -32
  },
  inputContainerStyle: {
    borderWidth: .5,
    borderRadius: DIMENSIONS.borderRadius,
    borderColor: COLOR.grey,
    width: DIMENSIONS.bannerWidth - 25
  },
  searchPanelField: {
    borderWidth: 0,
    paddingLeft: 40,
  },
  routesFieldsView: {
    borderWidth: .5,
    borderColor: COLOR.logoBlue,
    borderRadius: DIMENSIONS.borderRadius,
    paddingBottom: 10,
    backgroundColor: COLOR.white,
    alignItems: "flex-start",
    flexDirection: "row"
  },
  routesTextContainerStyle: {
    width: DIMENSIONS.bannerWidth / 2,
    marginBottom: -32
  },
  routesInputContainerStyle: {
    borderWidth: .5,
    borderRadius: DIMENSIONS.borderRadius,
    borderColor: COLOR.grey,
    width: DIMENSIONS.bannerWidth / 2 - 10
  },
  routesSearchPanelField: {
    borderWidth: 0,
    paddingLeft: 40,
  },
  routesSwapIcon: {
    position: "absolute",
    top: "30%",
    left: "44%"
  },
  routesRefreshIcon: {
    position: "absolute",
    top: 56,
    left: "44%"
  },
  searchButtonContainerStyle: {
    marginTop: 10,
    borderRadius: DIMENSIONS.borderRadiusSmall,
  },
  searchButtonStyle: {
    height: 50,
    backgroundColor: COLOR.logoBlue,
    borderRadius: DIMENSIONS.borderRadiusSmall,
  },
  searchButtonDisable: {
    height: 50,
    backgroundColor: COLOR.grey,
    borderRadius: DIMENSIONS.borderRadiusSmall,
  },
  buttonTitleStyle: {
    color: COLOR.logoYellow,
    fontWeight: "bold",
  },
  headerMain: {
    // flex: 1,
    height: DIMENSIONS.headerHeight,
    width: DIMENSIONS.screenWidth,
    backgroundColor: COLOR.logoBlue,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: DIMENSIONS.headerTextSize,
    textAlign: "center",
    color: COLOR.white
  },
  swapIcon: {
    position: "absolute",
    top: "38%",
    left: "80%"
  },
  refreshIcon: {
    position: "absolute",
    top: 120,
    left: "45%"
  },
  errorText: {
    color: COLOR.red,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 20,
    paddingTop: 10
  },
  tabView: {
    width: DIMENSIONS.screenWidth,
    marginBottom: 30
  },
  tabPanel: {
    alignSelf: "center",
    width: DIMENSIONS.bannerWidth,
    marginTop: 2
  },
  tabContent: {
  },
  placeCard: {
    elevation: 5,
    borderColor: COLOR.intentColor,
    borderRadius: DIMENSIONS.borderRadiusLarge,
    marginBottom: 5
  },
  overlay: {
    height: DIMENSIONS.bannerHeight,
    width: DIMENSIONS.bannerWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  overlayMessage: {
    fontWeight: "bold",
    fontSize: DIMENSIONS.headerTextSize,
    marginVertical: 20
  },
  popupView: {
    alignItems: "center",
    justifyContent: "center",
    height: "auto"
  },
  searchDropView: {
    zIndex: 10,
    top: -70,
    borderWidth: 2,
    borderRadius: DIMENSIONS.borderRadiusSmall,
    borderColor: COLOR.logoBlue,
    backgroundColor: COLOR.cardBackground
  },
  dropCloseIcon: {
    alignSelf: "flex-end"
  },
  commentsHeader: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grey,
    paddingBottom: 15
  },
  noComments: {
    justifyContent: "center",
    height: "83%"
  }
});

export default styles;
