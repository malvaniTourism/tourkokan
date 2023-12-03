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
    backgroundColor: COLOR.themeComicBlue,
    borderRadius: DIMENSIONS.borderRadiusLarge
  },
  catCardIcon: {
    height: DIMENSIONS.iconXXL,
    width: DIMENSIONS.iconXXL,
    borderRadius: DIMENSIONS.borderRadiusLarge
  }
});

export default styles;
