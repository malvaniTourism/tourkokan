import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center'
    },
    placeImageTitleView: {
        height: DIMENSIONS.detailsImage,
        width: DIMENSIONS.detailsImage,
        borderRadius: DIMENSIONS.borderRadiusLarge,
    },
    cityImageView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: DIMENSIONS.detailsImage,
    },
    cityHeader: {
        position: "absolute",
        backgroundColor: COLOR.transparent,
        zIndex: 1
    },
    placeImage: {
        height: DIMENSIONS.screenHeight / 100 * 40,
        width: DIMENSIONS.screenWidth,
        position: "absolute"
    },
    placeImageView: {
        height: DIMENSIONS.screenHeight / 100 * 40,
    },
    cityLikeView: {
        backgroundColor: COLOR.white,
        height: 35,
        width: 35,
        borderRadius: DIMENSIONS.borderRadius,
        right: 5,
        top: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cityStarView: {
        backgroundColor: COLOR.white,
        height: 35,
        width: 100,
        left: 10,
        top: 10,
        borderRadius: DIMENSIONS.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        backgroundColor: COLOR.white,
        width: DIMENSIONS.iconLarge,
        borderRadius: DIMENSIONS.borderRadius,
    },
    detailTitle: {
        fontSize: DIMENSIONS.headerTextSize,
        fontWeight: 'bold',
        color: COLOR.headingColor2
    },
    sectionView: {
        marginVertical: DIMENSIONS.sectionGap,
        alignItems: "center",
    },
})

export default styles;