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
    }
})

export default styles;