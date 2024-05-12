import React from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import styles from './Styles'

const MapContainer = ({ initialRegion, currentLatitude, currentLongitude }) => {
    return (
        <View style={styles.profileMapView}>
            <MapView style={styles.map} initialRegion={initialRegion}>
                <Marker
                    coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
                />
            </MapView>
        </View>
    )
}

export default MapContainer
