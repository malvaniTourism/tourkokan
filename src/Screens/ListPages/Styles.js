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
        flexDirection: 'row',
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
    }
})

export default styles;