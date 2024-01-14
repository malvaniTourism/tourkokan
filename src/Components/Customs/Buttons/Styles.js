import { StyleSheet } from "react-native";
import COLOR from "../../../Services/Constants/COLORS";
import DIMENSIONS from "../../../Services/Constants/DIMENSIONS";

const styles = StyleSheet.create({
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
    backgroundColor: COLOR.themeComicBlue,
  },
  titleStyle: {
    color: COLOR.white,
  },
  imageButtonContainer: {
    width: DIMENSIONS.iconXXL,
    margin: DIMENSIONS.sectionGap / 2,
  },
  imageButtonCircle: {
    height: DIMENSIONS.iconXXL,
    width: DIMENSIONS.iconXXL,
    borderRadius: DIMENSIONS.borderRadiusLarge,
    borderWidth: 4,
    borderColor: COLOR.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    borderColor: COLOR.themeComicBlue,
    shadowColor: COLOR.themeComicBlue,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 2,
  elevation: 10,
  },
  selectedText: {
    fontWeight: 'bold'
  },
  catCardIcon: {
    height: DIMENSIONS.iconXXL - 4,
    width: DIMENSIONS.iconXXL - 4,
    borderRadius: DIMENSIONS.borderRadiusLarge,
    resizeMode: "cover"
  },
});

export default styles;
