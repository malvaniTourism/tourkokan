import { StyleSheet } from "react-native";
import COLOR from "../../Services/Constants/COLORS.js";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS.js";

const styles = StyleSheet.create({
  topComponent: {
    height: DIMENSIONS.halfWidth,
    width: DIMENSIONS.windowWidth,
    borderBottomLeftRadius: DIMENSIONS.borderRadiusSmall,
    borderBottomRightRadius: DIMENSIONS.borderRadiusSmall,
  },
  userIcon: {
    margin: 10,
  },
  topMenu: {
    backgroundColor: COLOR.themeComicBlue,
    width: DIMENSIONS.windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  locationView: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fontBold: {
    fontWeight: 'bold',
    fontSize: DIMENSIONS.subtitleTextSize,
    marginRight: 5
  },
  listView: {
    zIndex: 1,
    height: 200,
    top: 70,
    position: 'absolute',
    width: DIMENSIONS.screenWidth,
  },
  currLocView: {
    zIndex: 0,
    padding: 10,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },
  recentsView: {
    marginTop: 10,
    padding: 20,
    borderTopWidth: 1,
    borderColor: COLOR.grey
  },
  recentsListView: {
    marginTop: 10,
    flexDirection: 'row'
  },
  fieldsView: {
    // borderWidth: 1,
    // borderColor: COLOR.grey,
    borderBottomColor: COLOR.transparent,
    paddingTop: 10,
    // marginBottom: -5,
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
    borderWidth: .5,
    borderRadius: DIMENSIONS.borderRadius,
  },
  searchButtonContainerStyle: {
    marginTop: 15,
    borderRadius: DIMENSIONS.borderRadiusSmall,
  },
  searchButtonStyle: {
    height: 50,
    backgroundColor: COLOR.themeComicBlue,
    borderRadius: DIMENSIONS.borderRadiusSmall,
  },
  searchButtonDisable: {
    height: 50,
    backgroundColor: COLOR.grey,
    borderRadius: DIMENSIONS.borderRadiusSmall,
  },
  buttonTitleStyle: {
    color: COLOR.white,
    fontWeight: "bold",
  },
  headerMain: {
    // flex: 1,
    height: DIMENSIONS.headerHeight,
    width: DIMENSIONS.screenWidth,
    backgroundColor: COLOR.themeComicBlue,
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
  swapIcon: {
    position: 'absolute',
    top: '41%',
    left: '80%'
  },
  tabView: {
    width: DIMENSIONS.screenWidth
  },
  tabPanel: {
    alignSelf: 'center',
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
  }
});

export default styles;
