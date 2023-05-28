import { StyleSheet } from "react-native";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";

const styles = StyleSheet.create({
    homeSearchBar: {
        marginTop: -15,
    },
    sectionView: {
        marginVertical: DIMENSIONS.sectionGap,
        alignItems: "center",
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: DIMENSIONS.headerTextSize,
    },
    cardsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    showMore: {
        width: DIMENSIONS.halfWidth,
        alignItems: 'center'
    }
});

export default styles;
