import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    cityContainer: {
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        width: DIMENSIONS.bannerWidth,
        height: DIMENSIONS.halfWidth - 20,
        backgroundColor: COLOR.white,
        borderRadius: DIMENSIONS.borderRadius,
        elevation: 5,
        marginVertical: 10
    },
    cityImageView: {
        flex: 1,
    },
    cityImage: {
        flex: 1,
    },
    cityImageStyle: {
        borderTopLeftRadius: DIMENSIONS.borderRadius,
        borderBottomLeftRadius: DIMENSIONS.borderRadius
    },
    cityContentView: {
        flex: 2,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cityName: {
        fontSize: DIMENSIONS.headerTextSize,
        fontWeight: 'bold',
        color: COLOR.black
    },
    cityTag: {
        fontSize: DIMENSIONS.subtitleTextSize,
        fontWeight: 600
    },
    cityMetaView: {
        paddingTop: 10,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: COLOR.grey,
        borderStyle: "dashed"
    },
    vertDivider: {
        borderWidth: 1,
        marginHorizontal: 5,
        borderColor: COLOR.grey
    },
    splitView: {
        padding: 5,
        flexWrap: "wrap",
    },
    lightBlackText: {
        color: COLOR.lightBlack,
    }
})

export default styles