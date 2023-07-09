import React from 'react'
import { Image, View } from 'react-native'
import styles from './Styles'
import GlobalText from '../Customs/Text'
import COLOR from '../../Services/Constants/COLORS'

const RouteHeadCard = ({ data }) => {
    return (
        <View style={styles.routeHeadCard}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.routeHeadCardImage}>
                    <Image source={require('../../Assets/Images/Bus1_png_high.png')} style={styles.busImage} />
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
            <View style={styles.routeHeadCardBottom}>
                <GlobalText text={data.bus_type.type} style={{ color: COLOR.white }} />
            </View>
        </View>
    )
}

export default RouteHeadCard