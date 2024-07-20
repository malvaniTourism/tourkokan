import { StyleSheet } from "react-native";
import COLOR from "../../Services/Constants/COLORS.js";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS.js";

const styles = StyleSheet.create({
    topComponentSkeleton: {
        width: DIMENSIONS.windowWidth,
        height: DIMENSIONS.headerHeight,
    },
    topComponent: {
        width: DIMENSIONS.windowWidth,
        zIndex: 10,
    },
    userIcon: {
        margin: 10,
    },
    topMenu: {
        backgroundColor: COLOR.white,
        width: DIMENSIONS.windowWidth,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
    },
    locationView: {
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    fontBold: {
        fontWeight: "bold",
        fontSize: DIMENSIONS.headerTextSize,
        marginRight: 5,
    },
    whiteBold: {
        fontWeight: "bold",
        fontSize: DIMENSIONS.headerTextSize,
        marginRight: 5,
        color: COLOR.white,
    },
    listView: {
        zIndex: 1,
        height: 200,
        top: 70,
        position: "absolute",
        width: DIMENSIONS.screenWidth,
    },
    currLocView: {
        zIndex: 0,
        padding: 10,
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
    },
    recentsView: {
        marginTop: 10,
        padding: 20,
        borderTopWidth: 1,
        borderColor: COLOR.grey,
    },
    recentsListView: {
        marginTop: 10,
        flexDirection: "row",
    },
    fieldsViewSkeleton: {
        height: DIMENSIONS.bannerHeight / 2 - 30,
        width: DIMENSIONS.bannerWidth,
        borderRadius: DIMENSIONS.borderRadius,
        marginTop: 10,
    },
    smallFieldsViewSkeleton: {
        height: DIMENSIONS.bannerHeight / 2,
        width: DIMENSIONS.bannerWidth,
        borderRadius: DIMENSIONS.borderRadius,
        marginTop: 20,
    },
    fieldsView: {
        width: DIMENSIONS.bannerWidth,
    },
    textContainerStyle: {
        width: DIMENSIONS.bannerWidth,
        marginBottom: -32,
    },
    inputContainerStyle: {
        borderRadius: DIMENSIONS.borderRadiusSmall,
        backgroundColor: COLOR.white,
        width: DIMENSIONS.bannerWidth,
        borderColor: COLOR.lightGrey,
    },
    searchPanelField: {
        borderWidth: 1,
        borderRadius: DIMENSIONS.borderRadiusSmall,
        borderColor: COLOR.themeBlue,
        height: 45,
    },
    routesFieldsView: {},
    routesTextContainerStyle: {
        width: DIMENSIONS.bannerWidth / 2,
        marginBottom: -32,
    },
    routesInputContainerStyle: {
        borderWidth: 0.5,
        borderRadius: DIMENSIONS.borderRadius,
        borderColor: COLOR.grey,
        width: DIMENSIONS.bannerWidth / 2 - 10,
    },
    routesSearchPanelField: {
        borderWidth: 0,
        paddingLeft: 40,
    },
    searchButtonSkeleton: {
        height: 50,
        width: DIMENSIONS.bannerWidth / 2,
        borderRadius: DIMENSIONS.borderRadiusXS,
        marginTop: 10,
        alignSelf: "flex-end",
    },
    searchButtonStyle: {
        width: DIMENSIONS.bannerWidth / 3,
        backgroundColor: COLOR.themeBlue,
        borderRadius: DIMENSIONS.borderRadiusXS,
        alignSelf: "flex-end",
        alignContent: "center",
    },
    searchButtonDisable: {
        height: 50,
        backgroundColor: COLOR.grey,
        borderRadius: DIMENSIONS.borderRadiusXS,
    },
    buttonTitleStyle: {
        color: COLOR.white,
        fontWeight: "bold",
    },
    headerMain: {
        // flex: 1,
        height: DIMENSIONS.headerHeight,
        width: DIMENSIONS.screenWidth,
        backgroundColor: COLOR.white,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: DIMENSIONS.headerTextSize,
        textAlign: "center",
        color: COLOR.black,
    },
    inputBusIcon: {
        position: "absolute",
        top: 16,
        left: 3,
    },
    pannelIcons: {
        position: "absolute",
        justifyContent: "flex-end",
        flexDirection: "row",
        width: "100%",
    },
    swapIcon: {
        position: "absolute",
        top: 83,
        right: 40,
    },
    refreshIcon: {
        position: "absolute",
        top: 83,
    },
    routesSwapIcon: {
        position: "absolute",
        top: 45,
        right: 40,
    },
    routesRefreshIcon: {
        position: "absolute",
        top: 45,
    },
    errorText: {
        color: COLOR.red,
        textAlign: "center",
        fontWeight: "bold",
        lineHeight: 20,
        paddingBottom: 5,
    },
    tabView: {
        width: DIMENSIONS.screenWidth,
        marginBottom: 30,
    },
    tabPanel: {
        alignSelf: "center",
        width: DIMENSIONS.bannerWidth,
        marginTop: 2,
    },
    tabContent: {},
    placeCard: {
        elevation: 5,
        borderColor: COLOR.intentColor,
        borderRadius: DIMENSIONS.borderRadiusLarge,
        marginBottom: 5,
    },
    overlay: {
        height: DIMENSIONS.bannerHeight,
        width: DIMENSIONS.bannerWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    overlayMessage: {
        fontWeight: "bold",
        fontSize: DIMENSIONS.headerTextSize,
        marginVertical: 20,
    },
    popupView: {
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
    },
    searchDropView: {
        zIndex: 100,
        borderWidth: 2,
        borderRadius: DIMENSIONS.borderRadiusSmall,
        borderColor: COLOR.themeBlue,
        backgroundColor: COLOR.cardBackground,
        height: 400,
    },
    dropCloseIcon: {
        alignSelf: "flex-end",
    },
    commentsHeader: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR.grey,
        paddingBottom: 15,
    },
    noComments: {
        justifyContent: "center",
        height: "83%",
    },
    commentUser: {
        height: DIMENSIONS.userIconSize,
        width: DIMENSIONS.userIconSize,
        borderRadius: DIMENSIONS.borderRadiusLarge,
        borderWidth: 4,
        borderColor: COLOR.grey,
        justifyContent: "center",
        alignItems: "center",
    },
    commentUserIcon: {
        height: DIMENSIONS.userIconSize,
        width: DIMENSIONS.userIconSize,
        borderRadius: DIMENSIONS.borderRadiusLarge,
        resizeMode: "cover",
    },
    commentUserName: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: DIMENSIONS.textSizeSmall,
    },
    userComment: {
        textAlign: "left",
    },
    deleteComment: {
        marginLeft: 20,
        fontWeight: "bold",
        color: COLOR.greyDark,
    },
    commentInputBox: {
        // position: "absolute",
        zIndex: 10,
        backgroundColor: COLOR.white,
        paddingBottom: 10,
    },
    commentTextContainerStyle: {
        width: DIMENSIONS.screenWidth,
        marginBottom: -32,
    },
    commentInputContainerStyle: {
        borderWidth: 0.5,
        borderRadius: DIMENSIONS.borderRadius,
        borderColor: COLOR.grey,
        width: DIMENSIONS.screenWidth - 10,
    },
    sendIcon: {
        position: "absolute",
        left: -40,
    },
    profilePhoto: {
        height: DIMENSIONS.iconXXL,
        width: DIMENSIONS.iconXXL,
        resizeMode: "contain",
    },
    instructionText: {
        textAlign: "justify",
        fontSize: 16,
        color: COLOR.black,
        flexWrap: "wrap",
    },
    locationPill: {
        backgroundColor: COLOR.lightGrey,
        borderRadius: DIMENSIONS.borderRadiusSmall,
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "space-between",
        width: DIMENSIONS.halfWidth - 40,
    },
    profileIconView: {
        width: DIMENSIONS.iconX,
        height: DIMENSIONS.iconX,
        borderRadius: DIMENSIONS.borderRadiusXXS,
        borderWidth: 3,
        borderColor: COLOR.lightGrey,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    profileIcon: {
        width: DIMENSIONS.iconLarge,
        height: DIMENSIONS.iconLarge,
        resizeMode: "cover",
        borderRadius: DIMENSIONS.borderRadiusXXS,
        backgroundColor: COLOR.greyDark,
    },
    citiesDropdown: {
        zIndex: 10,
        top: 0.5,
        left: 20,
        borderWidth: 2,
        borderRadius: DIMENSIONS.borderRadiusSmall,
        borderColor: COLOR.themeBlue,
        backgroundColor: COLOR.cardBackground,
        position: "absolute",
        width: DIMENSIONS.halfWidth,
        height: "auto",
    },
    profileChip: {
        width: DIMENSIONS.bannerWidth,
        height: 46,
        borderWidth: 1,
        borderColor: COLOR.themeBlue,
        borderRadius: DIMENSIONS.borderRadiusXS,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15,
    },
    chipName: {
        fontSize: DIMENSIONS.buttonText,
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    spaceBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    profileMapView: {
        height: DIMENSIONS.bannerHeight - 30,
        width: DIMENSIONS.bannerWidth,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLOR.grey,
        position: "relative",
        borderRadius: DIMENSIONS.borderRadiusXS,
        overflow: "hidden",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        textAlign: "justify",
        marginBottom: 20,
    },
    textContainer: {
        textAlign: "justify",
        marginBottom: 20,
    },
    heading: {
        fontSize: DIMENSIONS.headerTextSize,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "justify",
    },
    subheading: {
        fontSize: DIMENSIONS.subtitleTextSize,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        textAlign: "justify",
    },
    paragraph: {
        fontSize: DIMENSIONS.textSize,
        marginBottom: 10,
        textAlign: "justify",
    },
    list: {
        paddingLeft: 20,
        textAlign: "justify",
        fontSize: DIMENSIONS.textSize,
    },
    listItem: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: "justify",
        fontSize: DIMENSIONS.textSize,
    },
    link: {
        color: "blue",
        textDecorationLine: "underline",
        textAlign: "justify",
        fontSize: DIMENSIONS.textSize,
        marginTop: -10,
        marginBottom: 10,
    },
    privacyButtons: {
        width: DIMENSIONS.halfWidth - 80,
    },
    galleryContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mainImage: {
        width: DIMENSIONS.screenWidth,
        height: (DIMENSIONS.screenHeight / 100) * 40,
        resizeMode: "cover",
    },
    thumbnailView: {
        position: "absolute",
        alignItems: "flex-end",
        flexDirection: "row",
        height: (DIMENSIONS.screenHeight / 100) * 40,
        bottom: 30,
        maxWidth: DIMENSIONS.bannerWidth,
    },
    thumbnailList: {
        backgroundColor: COLOR.white,
        padding: 5,
        borderRadius: DIMENSIONS.borderRadiusXXS,
    },
    thumbnail: {
        width: DIMENSIONS.iconX,
        height: DIMENSIONS.iconX,
        marginHorizontal: 5,
        resizeMode: "cover",
    },
});

export default styles;
