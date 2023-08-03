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
        height: DIMENSIONS.bannerHeight - 50,
        marginBottom: 10
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLOR.black,
    },
    exploreHeaderImage: {
        flex: 1,
        opacity: 0.7,
        marginTop: -20,
    },
    details: {
        height: DIMENSIONS.bannerHeight - 50,
        width: DIMENSIONS.bannerWidth,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    lineVert: {
        borderWidth: 1,
        borderColor: COLOR.white,
        marginHorizontal: 20
    },
    whiteText: {
        color: COLOR.white,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: DIMENSIONS.headerTextSize
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
        backgroundColor: COLOR.transparent,
        width: "auto"
    },
    contactButtonStyle: {
        backgroundColor: COLOR.themeComicBlue,
        width: "auto",
    },
    contactButtonContainer: {
        marginTop: 15,
    },
    containerStyle: {
        borderWidth: 1,
        padding: 10,
        borderColor: COLOR.grey,
        borderRadius: DIMENSIONS.borderRadius
    },
    inputContainerStyle: {
        borderColor: COLOR.transparent,
        marginBottom: 10
    },
    titleStyle: {
        color: COLOR.themeComicBlue
    },
    showMore: {
        width: "auto",
        alignItems: 'center'
    },
    seeMoreStyle: {
        width: DIMENSIONS.bannerWidth,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "flex-end",
        marginTop: 10
    },
    locBtnStyle: {
        width: DIMENSIONS.bannerWidth,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "center",
        marginVertical: 10,
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
    },
    pricingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    pricingCard: {
        margin: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: COLOR.grey,
        borderRadius: DIMENSIONS.borderRadiusXXS,
    },
    pricingOptionTitle: {
        fontSize: DIMENSIONS.xlText,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pricingOptionPrice: {
        fontSize: DIMENSIONS.headerTextSize,
        color: COLOR.lightBlack,
        marginBottom: 10,
    },
    pricingOptionDescription: {
        fontSize: 14,
        color: COLOR.greySolid,
        marginBottom: 10,
    },
    pricingOptionFeatures: {
        marginBottom: 10,
    },
    pricingOptionFeature: {
        fontSize: 14,
        color: COLOR.grayDark,
    },
    pricingOptionButton: {
        fontSize: 14,
        color: COLOR.white,
        padding: 10,
    },
    planButtonContainer: {
        width: "auto",
    },
    headerContainer: {
        alignItems: 'center',
    },
    coverPhoto: {
        width: '100%',
        height: 200,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: -50,
    },
    profilePhoto: {
        width: DIMENSIONS.detailsImage,
        height: DIMENSIONS.detailsImage,
        borderRadius: DIMENSIONS.borderRadiusLarge,
    },
    bioContainer: {
        padding: 15,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    statContainer: {
        alignItems: 'center',
        flex: 1,
    },
    statCount: {
        fontSize: DIMENSIONS.largeText,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: DIMENSIONS.subtitleTextSize,
        color: COLOR.grayDark,
    },
    editButtonContainer: {
        alignSelf: "center"
    },
    containerHome: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boldTextHome: {
        fontSize: 25,
        color: 'red',
        marginVertical: 16,
    },

    containerMap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    locationModal: {
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: DIMENSIONS.headerTextSize
    },
    profileMapView: {
        height: DIMENSIONS.halfWidth,
        width: DIMENSIONS.screenWidth,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: COLOR.grey
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default styles;
