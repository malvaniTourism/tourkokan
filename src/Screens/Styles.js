import { StyleSheet } from "react-native";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import COLOR from "../Services/Constants/COLORS";

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
    buttonStyle: {
        backgroundColor: COLOR.themeDarkGreen,
    },
    showMore: {
        width: DIMENSIONS.halfWidth,
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
    profileDetails :{
        padding: 15
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default styles;
