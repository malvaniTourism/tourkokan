import React from 'react'
import { View } from 'react-native'
import styles from './Styles'
import GlobalText from '../Customs/Text'
import COLOR from '../../Services/Constants/COLORS'

const RouteHeadCard = ({ data }) => {
    return (
        <View style={styles.routeHeadCard}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>

                </View>
                <View style={{ flex: 3 }}>
                    <GlobalText text={data.name} style={styles.routeHeadCardTitle} />
                </View>
            </View>
            <View style={styles.routeHeadCardBottom}>
                <GlobalText text={"Day Ordinary"} style={{ color: COLOR.white }} />
            </View>
        </View>
    )
}

export default RouteHeadCard