import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import styles from './Styles'
import GlobalText from '../Customs/Text'
import COLOR from '../../Services/Constants/COLORS'
import Path from '../../Services/Api/BaseUrl'
import { SvgUri, SvgCssUri } from 'react-native-svg'

const RouteHeadCard = ({ data, cardClick }) => {
    console.log(Path.FTP_PATH1 + data.bus_type.logo);
    return (
        <TouchableOpacity style={styles.routeHeadCard} onPress={() => cardClick()}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.routeHeadCardImage}>
                    <SvgCssUri uri={`${Path.FTP_PATH1}${data.bus_type.logo}`} style={styles.busImage} />
                </View>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <GlobalText text={data.name} style={styles.routeHeadCardTitle} />
                    <GlobalText text={`${data.start_time} - ${data.end_time}`} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%' }}>
                        <GlobalText text={`\u2022 ${data.route_stops.length} Stops`} />
                        <GlobalText text={`\u2022 Non Reservation`} />
                    </View>
                </View>
            </View>
            <View style={[styles.routeHeadCardBottom, {backgroundColor: JSON.parse(data.bus_type.meta_data)[0].color_code}]}>
                <GlobalText text={data.bus_type.type} style={{ color: COLOR.white }} />
            </View>
        </TouchableOpacity>
    )
}

export default RouteHeadCard