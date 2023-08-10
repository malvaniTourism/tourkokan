import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cityContainer: {
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        width: DIMENSIONS.bannerWidth,
        maxHeight: DIMENSIONS.halfWidth - 20,
        minHeight: DIMENSIONS.halfWidth - 20,
        backgroundColor: COLOR.white,
        borderRadius: DIMENSIONS.borderRadius,
        elevation: 5,
        marginVertical: 10
    },
    cityImageView: {
        flex: 2,
    },
    cityImage: {
        flex: 1,
    },
    likeView: {
        position: 'absolute',
        backgroundColor: COLOR.white,
        height: 30,
        width: 30,
        borderRadius: DIMENSIONS.borderRadius,
        right: 5,
        top: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cityImageStyle: {
        borderTopLeftRadius: DIMENSIONS.borderRadius,
        borderBottomLeftRadius: DIMENSIONS.borderRadius
    },
    cityContentView: {
        flex: 3,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cityContentTop: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    cityName: {
        fontSize: DIMENSIONS.headerTextSize,
        fontWeight: 'bold',
        color: COLOR.black
    },
    cityTag: {
        fontSize: DIMENSIONS.subtitleTextSize,
        fontWeight: 600
    },
    starStyle: {
        // width: '50%'
        color: COLOR.yellow
    },
    cityMetaView: {
        paddingTop: 10,
        flexDirection: 'row',
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
        justifyContent: 'space-evenly',
        margin: 10,
        flexDirection: 'row'
    },
    catCardIcon: {
        width: DIMENSIONS.bannerWidth / 4,
        height: DIMENSIONS.bannerWidth / 4
    },
    projectCard: {
        minHeight: DIMENSIONS.bannerHeight,
        maxHeight: DIMENSIONS.bannerHeight,
        width: DIMENSIONS.bannerWidth,
        alignSelf: 'center',
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
        height: DIMENSIONS.bannerHeight / 2 + 20,
        width: DIMENSIONS.bannerWidth,
        backgroundColor: COLOR.white,
        alignSelf: 'center',
        elevation: 10,
        zIndex: 10,
        borderRadius: DIMENSIONS.borderRadiusXS,
        justifyContent: 'space-between',
        marginVertical: 10
    },
    routeHeadCardTitle: {
        fontWeight: 'bold',
        color: COLOR.themeComicBlue,
        lineHeight: 25
    },
    routeHeadCardBottom: {
        borderBottomLeftRadius: DIMENSIONS.borderRadiusXS,
        borderBottomRightRadius: DIMENSIONS.borderRadiusXS,
        alignItems: 'center',
        paddingVertical: 2
    },
    busImage: {
        height: DIMENSIONS.iconXXL,
        width: DIMENSIONS.iconXXL,
    },
    routeHeadCardImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeCard: {
        width: DIMENSIONS.bannerWidth,
        height: DIMENSIONS.bannerWidth + 20,
        elevation: 10,
        margin: 10,
        padding: 10,
        backgroundColor: COLOR.white,
        borderRadius: DIMENSIONS.borderRadius,
        justifyContent: 'space-between'
    },
    placeOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLOR.black,
        borderRadius: DIMENSIONS.borderRadius
    },
    placeLikeView: {
        backgroundColor: COLOR.grayDark,
        height: 35,
        width: 35,
        borderRadius: DIMENSIONS.borderRadius,
        right: 5,
        top: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeStarView: {
        backgroundColor: COLOR.grayDark,
        height: 35,
        width: 100,
        left: 5,
        top: 60,
        borderRadius: DIMENSIONS.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeImage: {
        width: DIMENSIONS.bannerWidth,
        height: DIMENSIONS.bannerWidth + 20,
        position: 'absolute'
    },
    placeImageStyle: {
        borderRadius: DIMENSIONS.borderRadius,
    },
    placeDetailsOverlay: {
        width: DIMENSIONS.bannerWidth - 40,
        height: DIMENSIONS.bannerHeight - 40,
        backgroundColor: COLOR.white,
        borderRadius: DIMENSIONS.borderRadius,
        padding: 15,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    placeName: {
        fontSize: DIMENSIONS.headerTextSize,
        fontWeight: 'bold'
    },
    placeDesc: {

    }
})

export default styles