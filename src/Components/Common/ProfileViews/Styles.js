import { StyleSheet } from "react-native";
import COLOR from "../../../Services/Constants/COLORS.js";
import DIMENSIONS from "../../../Services/Constants/DIMENSIONS.js";

const styles = StyleSheet.create({
    chipIcon: {
        height: 30,
        width: 30,
        backgroundColor: COLOR.black,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: DIMENSIONS.borderRadius,
        marginHorizontal: 10
    },
    dropdown: {
        width: DIMENSIONS.bannerWidth,
        height: 46,
        borderWidth: 1,
        borderColor: COLOR.themeBlue,
        borderRadius: DIMENSIONS.borderRadiusXS,
        marginTop: 15,
        paddingLeft: 10
    },
    dropdownIcon: {
        width: 30,
        height: 30,
    },
    searchButtonStyle: {
        height: 50,
        width: DIMENSIONS.bannerWidth / 3,
        backgroundColor: COLOR.themeBlue,
        borderRadius: DIMENSIONS.borderRadiusXS,
        alignSelf: "flex-end",
        marginTop: 200,
        marginRight: 20
    },
    buttonTitleStyle: {
        color: COLOR.white,
        fontWeight: "bold",
    },
});

export default styles;
