import React from "react"
import { TouchableOpacity, View } from "react-native"
import styles from "./Styles"
import GlobalText from "../Customs/Text"
import COLOR from "../../Services/Constants/COLORS"
import Path from "../../Services/Api/BaseUrl"
import { SvgCssUri } from "react-native-svg"
import STRING from "../../Services/Constants/STRINGS"
import Url from "../../Assets/Images/Buses/Shivshahi.svg"
import { Image } from "react-native"
import DIMENSIONS from "../../Services/Constants/DIMENSIONS"
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RouteHeadCard = ({ data, cardClick, style, bus }) => {
    let imagePath = `../../Assets/Images/Buses/OrdinaryExpress.png`;

    return (
        <TouchableOpacity style={[styles.routeHeadCard, style]} onPress={() => cardClick()}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.routeHeadCardImage}>
                    {typeof imagePath === "string" && imagePath.endsWith(".png") ? (
                        <Image source={require(imagePath)} style={styles.busImage} />
                    ) : (
                        <Image source={{ uri: imagePath }} style={styles.busImage} />
                    )}
                </View>
                <View style={{ flex: 3, justifyContent: "space-evenly" }}>
                    <GlobalText text={data.name} style={styles.routeHeadCardTitle} />
                    {/* <GlobalText text={`${data.start_time} - ${data.end_time}`} /> */}
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
                            <View style={styles.flexRow}>
                                <MaterialIcons
                                    name="location-pin"
                                    color={COLOR.themeBlue}
                                    size={DIMENSIONS.smallIcon}
                                    style={styles.routeCardIcons}
                                />
                                <GlobalText text={`${data.distance?.toFixed(2)} ${STRING.KM}`} />
                            </View>
                            <View style={[styles.flexRow]}>
                                <MaterialCommunityIcons
                                    name="bus-stop"
                                    color={COLOR.themeBlue}
                                    size={DIMENSIONS.smallIcon}
                                    style={styles.routeCardIcons}
                                />
                                <GlobalText text={`${data.route_stops.length} ${STRING.STOPS}`} />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
                            <View style={styles.flexRow}>
                                <MaterialCommunityIcons
                                    name="clock-outline"
                                    color={COLOR.themeBlue}
                                    size={DIMENSIONS.smallIcon}
                                    style={styles.routeCardIcons}
                                />
                                <GlobalText text={`${data.start_time}`} />
                            </View>
                            <View style={styles.flexRow}>
                                <Fontisto
                                    name="bus-ticket"
                                    color={COLOR.themeBlue}
                                    size={DIMENSIONS.smallIcon}
                                    style={styles.routeCardIcons}
                                />
                                <GlobalText text={`${STRING.NON_RESERVATION}`} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.routeHeadCardBottom, { backgroundColor: JSON.parse(data.bus_type.meta_data)[0].color_code }]}>
                <GlobalText text={data.bus_type.type} style={{ color: COLOR.white }} />
            </View>
        </TouchableOpacity>
    )
}

export default RouteHeadCard