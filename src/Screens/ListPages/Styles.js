import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    cardsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    stopsCard: {
    },
    clickChip: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: DIMENSIONS.borderRadiusSmall
    },
    chipEnabled: {
        backgroundColor: COLOR.blueL
    },
    chipDisabled: {
        backgroundColor: COLOR.grey
    },
    chipTitle: {
        color: COLOR.white
    },
    flexRow: {
        flexDirection: "row",
        marginBottom: 10
    },
    container: {
        flex: 1,
    },
    flatListContainer: {
        margin: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
        overflow: "hidden",
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: DIMENSIONS.bannerWidth - 100
    },
    listItemMid: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: DIMENSIONS.bannerWidth - 85
    },
    horizontalCityScroll: {
        minHeight: DIMENSIONS.iconXXL,
        marginTop: -10,
        marginBottom: 10
    },
    citiesButtonScroll: {
        flexDirection: "row",
    },
    cityButtonText: {
        fontSize: DIMENSIONS.textSizeSmall
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
    buttonSkeleton: {
        width: DIMENSIONS.bannerWidth / 2,
        height: 50,
        marginVertical: 10,
        borderRadius: DIMENSIONS.borderRadiusXS,
        alignSelf: "flex-end",
        marginRight: 20
    },
    buttonView: {
        alignItems: "center",
        flexDirection: "row",
        margin: 10,
        width: DIMENSIONS.bannerWidth / 2,
        backgroundColor: COLOR.transparent,
        elevation: 0,
        alignSelf: "flex-end",
        justifyContent: "flex-end"
    },
    titleStyle: {
        color: COLOR.themeBlue,
        textAlign: "right"
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 16
    },
})

export default styles;