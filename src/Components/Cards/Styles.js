import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    placeContainer: {
        alignSelf: "center",
        flex: 1,
        flexDirection: "row",
        width: DIMENSIONS.bannerWidth,
        maxHeight: DIMENSIONS.halfWidth - 20,
        minHeight: DIMENSIONS.halfWidth - 20,
        backgroundColor: COLOR.white,
        borderRadius: DIMENSIONS.borderRadius,
        elevation: 5,
        marginVertical: 10
    },
    placeImageView: {
        flex: 2,
    },
    placeImage: {
        flex: 1,
    },
    likeView: {
        position: "absolute",
        backgroundColor: COLOR.white,
        height: 30,
        width: 30,
        borderRadius: DIMENSIONS.borderRadius,
        right: 5,
        top: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    placeImageStyle: {
        borderTopLeftRadius: DIMENSIONS.borderRadius,
        borderBottomLeftRadius: DIMENSIONS.borderRadius
    },
    placeContentView: {
        flex: 3,
        padding: 10,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    placeContentTop: {
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 10
    },
    placeName: {
        fontSize: DIMENSIONS.headerTextSize,
        fontWeight: "bold",
        color: COLOR.black
    },
    placeTag: {
        fontSize: DIMENSIONS.subtitleTextSize,
        fontWeight: 600
    },
    starStyle: {
        // width: "50%"
        color: COLOR.yellow
    },
    placeMetaView: {
        paddingTop: 10,
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: COLOR.grey,
        borderStyle: "dashed"
    },
    vertDivider: {
        borderWidth: 1,
        marginHorizontal: 5,
        borderColor: COLOR.grey
    },
    splitView: {
        padding: 5,
        flexWrap: "wrap",
    },
    lightBlackText: {
        color: COLOR.lightBlack,
    },
    catCardContainer: {
        justifyContent: "space-evenly",
        margin: 10,
        flexDirection: "row"
    },
    catCardIcon: {
        width: DIMENSIONS.bannerWidth / 4,
        height: DIMENSIONS.bannerWidth / 4
    },
    projectCard: {
        minHeight: DIMENSIONS.bannerHeight,
        maxHeight: DIMENSIONS.bannerHeight,
        width: DIMENSIONS.bannerWidth,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: COLOR.grey,
        marginVertical: 10
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLOR.black,
    },
    projectImage: {
        height: DIMENSIONS.bannerHeight - 30,
    },
    projectImageStyle: {
        opacity: 0.7
    },
    routeHeadCard: {
        height: DIMENSIONS.bannerHeight / 2 + 32,
        width: DIMENSIONS.bannerWidth,
        backgroundColor: COLOR.white,
        alignSelf: "center",
        elevation: 10,
        zIndex: 10,
        borderRadius: DIMENSIONS.borderRadiusXS,
        justifyContent: "space-between",
        marginVertical: 10
    },
    routeHeadCardTitle: {
        fontWeight: "bold",
        color: COLOR.themeComicBlue,
        lineHeight: 25,
        fontSize: DIMENSIONS.subtitleTextSize,
        textAlign: "left"
    },
    routeHeadCardBottom: {
        borderBottomLeftRadius: DIMENSIONS.borderRadiusXS,
        borderBottomRightRadius: DIMENSIONS.borderRadiusXS,
        alignItems: "center",
        paddingVertical: 4
    },
    busImage: {
        height: DIMENSIONS.iconXXL,
        width: DIMENSIONS.iconXXL,
    },
    routeHeadCardImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },



    cityCard: {
        width: DIMENSIONS.bannerWidth,
        height: DIMENSIONS.bannerWidth + 20,
        elevation: 10,
        margin: 10,
        padding: 10,
        backgroundColor: COLOR.white,
        borderRadius: DIMENSIONS.borderRadius,
        justifyContent: "space-between"
    },
    subCatCard: {
        width: DIMENSIONS.iconCard,
        height: DIMENSIONS.iconCard,
        elevation: 10,
        margin: 10,
        padding: 10,
        backgroundColor: COLOR.white,
        borderRadius: DIMENSIONS.borderRadius,
        justifyContent: "center"
    },
    placeCard: {
        width: DIMENSIONS.bannerWidth,
        height: DIMENSIONS.bannerHeight + 100,
        elevation: 10,
        margin: 10,
        padding: 10,
        backgroundColor: COLOR.white,
        borderRadius: DIMENSIONS.borderRadius,
        justifyContent: "space-between"
    },
    cityOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLOR.black,
        borderRadius: DIMENSIONS.borderRadius
    },
    cityLikeView: {
        backgroundColor: COLOR.white,
        height: 35,
        width: 35,
        borderRadius: DIMENSIONS.borderRadius,
        right: 5,
        top: 0,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    cityStarView: {
        backgroundColor: COLOR.white,
        height: 35,
        width: 100,
        left: 10,
        top: 10,
        borderRadius: DIMENSIONS.borderRadius,
        justifyContent: "center",
        alignItems: "center",
    },
    placeStarView: {
        backgroundColor: COLOR.white,
        height: 35,
        width: 100,
        left: 10,
        top: -10,
        borderRadius: DIMENSIONS.borderRadius,
        justifyContent: "center",
        alignItems: "center",
    },
    cityImage: {
        width: DIMENSIONS.bannerWidth,
        height: DIMENSIONS.bannerWidth + 20,
        position: "absolute"
    },
    placeImage: {
        width: DIMENSIONS.bannerWidth,
        height: DIMENSIONS.bannerHeight + 100,
        position: "absolute"
    },
    cityImageStyle: {
        borderRadius: DIMENSIONS.borderRadius,
    },
    cityDetailsOverlay: {
        width: DIMENSIONS.bannerWidth - 40,
        height: DIMENSIONS.bannerHeight - 40,
        backgroundColor: COLOR.white,
        borderRadius: DIMENSIONS.borderRadius,
        padding: 15,
        alignSelf: "center",
        justifyContent: "space-between"
    },
    placeDetailsOverlay: {
        width: DIMENSIONS.bannerWidth - 40,
        height: DIMENSIONS.bannerHeight / 2,
        backgroundColor: COLOR.white,
        borderRadius: DIMENSIONS.borderRadius,
        padding: 15,
        alignSelf: "center",
        justifyContent: "space-evenly"
    },
    cityName: {
        fontSize: DIMENSIONS.headerTextSize,
        fontWeight: "bold"
    },
    boldText: {
        fontWeight: "bold"
    }
})

export default styles