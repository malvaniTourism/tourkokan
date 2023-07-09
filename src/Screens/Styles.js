import { StyleSheet } from "react-native";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import COLOR from "../Services/Constants/COLORS";

const styles = StyleSheet.create({
    homeSearchBar: {
        // marginTop: -15,
    },
    cityListView: {
        zIndex: 1,
        position: 'absolute',
        top: 240,
        width: DIMENSIONS.bannerWidth
    },
    sectionView: {
        marginVertical: DIMENSIONS.sectionGap,
        alignItems: "center",
    },
    stopsSectionView: {
        margin: DIMENSIONS.sectionGap,
        paddingVertical: DIMENSIONS.sectionGap,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLOR.headingColor,
        borderRadius: DIMENSIONS.borderRadiusSmall,
        backgroundColor: COLOR.yellowLight
    },
    stopsCard: {
        width: DIMENSIONS.screenWidth / 2 - 45,
        shadowColor: COLOR.headingColor2
    },
    routesCard: {
        width: DIMENSIONS.bannerWidth - 30,
        shadowColor: COLOR.headingColor2
    },
    toggleView: {
        paddingBottom: 10
    },
    placesList: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: DIMENSIONS.headerTextSize,
        color: COLOR.cancelButton
    },
    cardsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonStyle: {
        backgroundColor: COLOR.themeComicBlue,
    },
    showMore: {
        width: DIMENSIONS.halfWidth - 40,
        alignItems: 'center'
    },
    profileImageView: {
        height: DIMENSIONS.bannerWidth,
        marginTop: -75,
        borderRadius: DIMENSIONS.borderRadius,
        padding: 3
    },
    profileImage: {
        // aspectRatio: 1,
        height: DIMENSIONS.bannerWidth,
        borderRadius: DIMENSIONS.borderRadius,
        resizeMode: 'cover'
        // width: '100%',
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    profileDetails: {
        padding: 15
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    prjImgContainer: {
        marginBottom: 20,
        width: DIMENSIONS.screenWidth,
    },
    categoryBack: {
        marginTop: -20,
        height: DIMENSIONS.bannerHeight,
    },
    categoryBackImageStyle: {
        opacity: 0.7
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLOR.black,
        marginTop: -20,
    },
    categoryImageDetails: {
        height: DIMENSIONS.bannerHeight,
        width: DIMENSIONS.bannerWidth,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    catTitle: {
        color: COLOR.white,
        fontWeight: 'bold',
        fontSize: DIMENSIONS.headerTextSize,
        textAlign: 'center'
    },
    catSubTitle: {
        color: COLOR.white,
        fontSize: DIMENSIONS.subtitleTextSize,
        textAlign: 'center'
    }
});

export default styles;
