import { StyleSheet } from "react-native";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import COLOR from "../Services/Constants/COLORS";

const styles = StyleSheet.create({
    homeSearchBar: {
        // marginTop: -15,
    },
    cityListView: {
        zIndex: 1,
        position: "absolute",
        top: 240,
        width: DIMENSIONS.bannerWidth
    },
    sectionView: {
        marginVertical: DIMENSIONS.sectionGap,
        alignItems: "center",
    },
    routeHeadCard: {
        marginVertical: 10
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
    },
    details: {
        height: DIMENSIONS.bannerHeight - 50,
        width: DIMENSIONS.bannerWidth,
        position: "absolute",
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center"
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
        paddingVertical: 13
    },
    contactButtonContainer: {
        // marginTop: 15,
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
    profileContainerStyle: {
        borderColor: COLOR.transparent,
        marginBottom: 20
    },
    titleStyle: {
        color: COLOR.themeComicBlue
    },
    showMore: {
        width: "auto",
        alignItems: "center"
    },
    seeMoreStyle: {
        width: DIMENSIONS.bannerWidth,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10
    },
    locBtnStyle: {
        width: DIMENSIONS.bannerWidth,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    profileImageView: {
        height: DIMENSIONS.bannerWidth - 90,
        marginTop: -75,
        borderRadius: DIMENSIONS.borderRadius,
        padding: 3
    },
    profileImage: {
        // aspectRatio: 1,
        height: DIMENSIONS.bannerWidth - 90,
        resizeMode: "contain"
        // width: "100%",
    },
    handPointer: {
        height: DIMENSIONS.bannerWidth - 90,
        width: DIMENSIONS.screenWidth,
        position: "absolute",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center"
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 16
    },
    profileDetails: {
        padding: 15,
        alignItems: "center"
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between"
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
    },
    categoryImageDetails: {
        height: DIMENSIONS.bannerHeight,
        width: DIMENSIONS.bannerWidth,
        position: "absolute",
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    catTitle: {
        color: COLOR.white,
        fontWeight: "bold",
        fontSize: DIMENSIONS.headerTextSize,
        textAlign: "center"
    },
    catSubTitle: {
        color: COLOR.white,
        fontSize: DIMENSIONS.subtitleTextSize,
        textAlign: "center"
    },
    pricingView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
        fontWeight: "bold",
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
        alignItems: "center",
    },
    coverPhoto: {
        width: "100%",
        height: 200,
    },
    profileContainer: {
        alignItems: "center",
        marginTop: -50,
        zIndex: 10
    },
    profilePhoto: {
        width: DIMENSIONS.detailsImage,
        height: DIMENSIONS.detailsImage,
        borderRadius: DIMENSIONS.borderRadiusLarge,
        borderWidth: .5,
        borderColor: COLOR.themeComicBlue
    },
    bioContainer: {
        padding: 15,
    },
    statsContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
    },
    statContainer: {
        alignItems: "center",
        flex: 1,
    },
    statCount: {
        fontSize: DIMENSIONS.largeText,
        fontWeight: "bold",
    },
    statLabel: {
        fontSize: DIMENSIONS.subtitleTextSize,
        color: COLOR.grayDark,
    },
    editButtonContainer: {
        alignSelf: "center",
        width: DIMENSIONS.halfWidth - 20,
    },
    editButtonStyle: {
        width: DIMENSIONS.halfWidth - 20
    },
    editSeeMoreStyle: {
        borderRadius: 0,
        borderTopLeftRadius: DIMENSIONS.borderRadius,
        borderBottomLeftRadius: DIMENSIONS.borderRadius
    },
    updateSeeMoreStyle: {
        borderRadius: 0,
        borderTopRightRadius: DIMENSIONS.borderRadius,
        borderBottomRightRadius: DIMENSIONS.borderRadius
    },
    seeMoreContainer: {
        alignSelf: "flex-end",
        width: DIMENSIONS.halfWidth / 2,
        marginRight: 25
    },
    seeButtonStyle: {
        width: DIMENSIONS.halfWidth / 2,
    },
    seeCitiesContainer: {
        alignSelf: "flex-end",
        width: DIMENSIONS.halfWidth,
        backgroundColor: COLOR.transparent,
    },
    seeCitiesButtonStyle: {
        width: DIMENSIONS.halfWidth,
        backgroundColor: COLOR.transparent,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    citiesButtonTitleStyle: {
        color: COLOR.themeComicBlue,
        textAlign: "right"
    },
    containerHome: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    boldTextHome: {
        fontSize: 25,
        color: "red",
        marginVertical: 16,
    },

    containerMap: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    mapStyle: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    locationModal: {
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: DIMENSIONS.headerTextSize
    },
    profileMapView: {
        height: DIMENSIONS.screenWidth - 150,
        width: DIMENSIONS.screenWidth,
        marginTop: -20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLOR.grey,
        position: "relative",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    roleDropDown: {
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderColor: COLOR.grey,
        borderRadius: DIMENSIONS.borderRadius,
    },
    buttonView: {
        borderRadius: DIMENSIONS.borderRadius,
        overflow: "hidden",
        marginVertical: 30
    },
    profileButtonStyle: {
        backgroundColor: COLOR.themeComicBlue,
        width: "auto",
        paddingVertical: 13
    },
    horizontalCityScroll: {
        minHeight: DIMENSIONS.iconXXL,
        marginTop: -40,
        marginBottom: 10
    },
    citiesButtonScroll: {
        flexDirection: "row",
    },
    horizontalCategoriesScroll: {
        minHeight: DIMENSIONS.iconXXL,
        marginTop: -10,
        marginBottom: 10
    },
    categoriesButtonScroll: {
        flexDirection: "row",
    },
    categoryButtonText: {
        fontSize: DIMENSIONS.textSizeSmall
    },
    subCatContainer: {
        minHeight: DIMENSIONS.screenHeight,
        backgroundColor: COLOR.themeComicBlueULight,
        borderTopRightRadius: DIMENSIONS.borderRadius,
        borderTopLeftRadius: DIMENSIONS.borderRadius,
    },
    subCatHeader: {
        textAlign: "left",
        margin: 15,
        fontWeight: "bold",
        color: COLOR.labelActiveColor,
        fontSize: DIMENSIONS.headerTextSize
    },
    subCatView: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 300
    },
    verticalNameContainer: {
        height: DIMENSIONS.screenHeight,
        flex: 1,
    },
    verticalName: {
        transform: [{ rotate: '270deg' }],
        fontWeight: "bold",
        color: COLOR.labelActiveColor,
        fontSize: DIMENSIONS.xlText,
        letterSpacing: 7,
        width: DIMENSIONS.screenHeight / 3,
        left: -DIMENSIONS.screenWidth / 4,
        top: DIMENSIONS.screenHeight / 4
    },
    subCatCardsContainer: {
        flex: 3,
        overflow: "scroll"
    },
    cityButtonText: {
        fontSize: DIMENSIONS.textSizeSmall
    },
    routesSearchPanelView: {
        alignItems: "center",
        position: "absolute",
        zIndex: 20,
        alignSelf: "center",
        marginTop: 20
    }
});

export default styles;
