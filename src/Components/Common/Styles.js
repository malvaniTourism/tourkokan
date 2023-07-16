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
    fontSize: DIMENSIONS.headerTextSize,
    marginRight: 5,
    color: COLOR.white
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
    borderWidth: .5,
    borderColor: COLOR.themeComicBlue,
    borderRadius: DIMENSIONS.borderRadius,
    paddingBottom: 10,
    backgroundColor: COLOR.white
  },
  textContainerStyle: {
    width: DIMENSIONS.bannerWidth,
  },
  inputContainerStyle: {
    borderWidth: .5,
    borderRadius: DIMENSIONS.borderRadius,
    borderColor: COLOR.grey,
  },
  searchPanelField: {
    borderWidth: 0,
    paddingLeft: 40
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
    color: COLOR.white
  },
  swapIcon: {
    position: 'absolute',
    top: '39.5%',
    left: '80%'
  },
  tabView: {
    width: DIMENSIONS.screenWidth,
    marginBottom: 30
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
