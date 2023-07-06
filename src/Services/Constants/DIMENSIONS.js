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
    bannerHeight: (sw - 40) / 2,

    iconSize: 20,
    userIconSize: 30,

    borderRadiusLarge: 50,
    borderRadius: 30,
    borderRadiusSmall: 20,
    borderRadiusXS: 10,
    borderRadiusXXS: 5,

    headerHeight: sw / 7,

    headerTextSize: sw / 25,
    subtitleTextSize: sw / 28,
    textSize: sw / 30,

    sectionGap: 20,

    detailsImage: 100,

};

export default DIMENSIONS;
