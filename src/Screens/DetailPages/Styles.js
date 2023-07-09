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
    placeImage: {

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