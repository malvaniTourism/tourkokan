import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import styles from './Styles'
import Path from '../../Services/Api/BaseUrl';
import GlobalText from '../Customs/Text';
import { navigateTo } from '../../Services/CommonMethods';

const PlaceCard = ({ data, navigation }) => {

    const getPlace = (id) => {
        // navigateTo(navigation, "PlaceDetails", { id })
    }

    return (
        <TouchableOpacity style={styles.placeCard} onPress={() => getPlace(data.id)}>
            <View style={styles.placeOverlay} />
            <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8kGdHPoV2vPzR7xqSzk5uo3yiLbjPGhUklKp74E3O6NUX_7tWDFW5U_SLwe6Fq3yCLM&usqp=CAU' }} style={styles.placeImage} imageStyle={styles.placeImageStyle} resizeMode="cover" />
            <GlobalText text={data.name} style={styles.placeName} />
            <GlobalText text={data.description} style={styles.placeDesc} />
        </TouchableOpacity>
    )
}

export default PlaceCard
