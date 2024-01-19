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
    iconMedium: 21,
    iconBig: 25,
    userIconSize: 30,
    iconLarge: 35,
    iconXL: 60,
    iconXXL: 70,
    iconXXXL: 90,
    appLogo: 70,

    borderRadiusXL: 80,
    borderRadiusLarge: 50,
    borderRadius: 30,
    borderRadiusSmall: 20,
    borderRadiusXS: 10,
    borderRadiusXXS: 5,

    headerHeight: sh / 100 * 6,
    headerSpace: (sh / 100 * 6) * 2.5,

    xlText: sw / 20,
    largeText: sw / 23,
    headerTextSize: sw / 25,
    subtitleTextSize: sw / 28,
    textSize: sw / 30,
    textSizeSmall: sw / 35,
    textSizeXS: sw / 40,

    sectionGap: 20,

    smallImage: 40,
    detailsImage: 100,

    mobileLength: 10,
    fieldLength: 50

};

export default DIMENSIONS;
