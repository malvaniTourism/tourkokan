import { StyleSheet } from "react-native";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import COLOR from "../Services/Constants/COLORS";

const styles = StyleSheet.create({
    homeSearchBar: {
        marginTop: -15,
    },
    cityListView: {
        zIndex: 1,
        position: 'absolute',
        top: 240,
        width: DIMENSIONS.bannerWidth
    },
    placeImageView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: DIMENSIONS.detailsImage,
    },
    detailTitle: {
        fontSize: DIMENSIONS.headerTextSize,
        fontWeight: 'bold',
        color: COLOR.headingColor2
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
        backgroundColor: COLOR.themeDarkGreen,
    },
    showMore: {
        width: DIMENSIONS.halfWidth - 40,
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
