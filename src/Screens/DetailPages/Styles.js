import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    center: {
        justifyContent: "center"
    },
    placeImageTitleView: {
        height: DIMENSIONS.detailsImage,
        width: DIMENSIONS.detailsImage,
        borderRadius: DIMENSIONS.borderRadiusLarge,
    },
    cityImageView: {
        alignItems: "center",
        justifyContent: "center",
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
        backgroundColor: COLOR.grey,
        height: 35,
        width: 35,
        borderRadius: DIMENSIONS.borderRadius,
        justifyContent: "center",
        alignItems: "center",
    },
    avgRating: {
        borderRadius: DIMENSIONS.borderRadiusLarge,
        marginHorizontal: 5,
        color: COLOR.greyDark,
        fontWeight: "bold"
    },
    cityStarView: {
        backgroundColor: COLOR.white,
        height: 35,
        borderRadius: DIMENSIONS.borderRadius,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row"
    },
    backIcon: {
        backgroundColor: COLOR.white,
        width: DIMENSIONS.iconLarge,
        borderRadius: DIMENSIONS.borderRadius,
    },
    detailTitle: {
        fontSize: DIMENSIONS.headerTextSize,
        fontWeight: "bold",
        textAlign: "left"
    },
    detailSubTitle: {
        fontSize: DIMENSIONS.textSize,
        fontWeight: "bold",
        textAlign: "left",
        color: COLOR.greyDark
    },
    sectionView: {
        marginVertical: DIMENSIONS.sectionGap,
        alignItems: "center",
    },
    starStyle: {
        // width: "50%"
        color: COLOR.yellow,
        bottom: 0,
        justifyContent: "flex-end",
    },
    locationPinText: {
        fontWeight: "bold",
        textAlign: "left",
        color: COLOR.grey
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    detailsTitleView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: DIMENSIONS.sectionGap,
    },
    cityDescription: {
        marginBottom: DIMENSIONS.sectionGap
    },
    showMore: {
        width: "auto",
        alignItems: "center"
    },
    seeMoreStyle: {
        width: DIMENSIONS.screenWidth / 4,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        elevation: 10
    },
    buttonStyle: {
        backgroundColor: COLOR.transparent,
        width: "auto"
    },
    titleStyle: {
        color: COLOR.themeBlue,
        fontWeight: "200",
        fontSize: DIMENSIONS.textSize
    },
    viewMapButtonStyle: {
        backgroundColor: COLOR.themeBlue,
        width: "auto"
    },
    viewMapTitle: {
        color: COLOR.white,
        fontWeight: "200",
        fontSize: DIMENSIONS.textSize
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: DIMENSIONS.headerTextSize,
        color: COLOR.cancelButton,
        marginBottom: 20
    },
})

export default styles;