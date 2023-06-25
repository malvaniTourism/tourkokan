import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import styles from './Styles'
import Path from '../../Services/Api/BaseUrl'

const CityCard = ({ data }) => {
    console.log(Path.FTP_PATH + data.image_url);
    return (
        <View style={styles.cityContainer}>
            <View style={styles.cityImageView}>
                <ImageBackground source={{uri: Path.FTP_PATH + data.image_url}} style={styles.cityImage} imageStyle={styles.cityImageStyle} resizeMode="cover" />
            </View>
            <View style={styles.cityContentView}>
                <View>
                    <Text style={styles.cityName}>{data.name}</Text>
                    <Text style={styles.cityTag}>{data.tag_line}</Text>
                </View>
                <View style={styles.cityMetaView}>
                    <View style={styles.splitView}>
                        <Text style={styles.lightBlackText}>Rs. 2500 for one</Text>
                    </View>
                    <View style={styles.vertDivider}></View>
                    <View style={styles.splitView}>
                        <Text style={styles.lightBlackText}>2 Km</Text>
                        <Text style={styles.lightBlackText}>25 Min</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CityCard
