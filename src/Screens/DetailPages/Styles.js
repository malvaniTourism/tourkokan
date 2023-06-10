import DIMENSIONS from "../../Services/Constants/DIMENSIONS";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center'
    },
    placeImageView: {
        height: DIMENSIONS.detailsImage,
        width: DIMENSIONS.detailsImage,
        borderRadius: DIMENSIONS.borderRadiusLarge
    },
    placeImage: {

    },
})

export default styles;