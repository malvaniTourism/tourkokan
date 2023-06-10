import { Dimensions } from "react-native";

const sh = Dimensions.get("screen").height;
const wh = Dimensions.get("window").height;
const sw = Dimensions.get("screen").width;
const ww = Dimensions.get("window").width;

const DIMENSIONS = {
    screenHeight: sh,
    windowHeight: wh,
    screenWidth: sw,
    windowWidth: ww,
    halfWidth: sw / 2,
    bannerWidth: sw - 40,
    iconSize: 20,
    userIconSize: 30,
    borderRadiusLarge: 50,
    borderRadius: 30,
    borderRadiusSmall: 20,
    borderRadiusXS: 10,
    borderRadiusXXS: 5,
    headerHeight: sw / 7,
    headerTextSize: 17,
    subtitleTextSize: 17,
    sectionGap: 20,
    detailsImage: 200,
};

export default DIMENSIONS;
