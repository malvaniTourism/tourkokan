import React, { useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import styles from './Styles'
import Path from '../../Services/Api/BaseUrl';
import GlobalText from '../Customs/Text';
import { navigateTo } from '../../Services/CommonMethods';
import ComingSoon from '../Common/ComingSoon';
import Octicons from "react-native-vector-icons/Octicons";
import COLOR from '../../Services/Constants/COLORS';
import DIMENSIONS from '../../Services/Constants/DIMENSIONS';
import StarRating from 'react-native-star-rating';

const PlaceCard = ({ data, navigation }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isFav, setIsFav] = useState(data.is_favorite)
    const [rating, setRating] = useState(3.5)

    const getPlace = (id) => {
        // navigateTo(navigation, "PlaceDetails", { id })
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
        }, 2000)
    }

    const onHeartClick = async () => {
        let placeData = {
            user_id: await AsyncStorage.getItem("userId"),
            favouritable_type: "Place",
            favouritable_id: data.id
        }
        setIsFav(!isFav)
        comnPost('v1/favourite', placeData)
            .then(res => {
                reload()
            })
            .catch(err => {
            })
    }

    const onStarRatingPress = (rate) => {
        setRating(rate)
    }

    return (
        <TouchableOpacity style={styles.placeCard} onPress={() => getPlace(data.id)}>
            <View style={styles.placeOverlay} />
            <ImageBackground source={{ uri: Path.FTP_PATH + data.image_url }} style={styles.placeImage} imageStyle={styles.placeImageStyle} resizeMode="cover" />
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity style={styles.placeLikeView} onPress={() => onHeartClick()}>
                    {
                        isFav ?
                            <Octicons name='heart-fill' color={COLOR.red} size={DIMENSIONS.iconSize} />
                            :
                            <Octicons name='heart' color={COLOR.black} size={DIMENSIONS.iconSize} />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.placeStarView}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={rating}
                    selectedStar={(rating) => onStarRatingPress(rating)}
                    starSize={14}
                    starStyle={styles.starStyle}
                    halfStarEnabled
                />
            </View>

            <View style={styles.placeDetailsOverlay}>
                <View style={{ flex: 1 }}>
                    <GlobalText text={data.name} style={styles.placeName} />
                    <GlobalText text={data.description} style={styles.placeDesc} />
                </View>
                <View style={{ flex: 1 }}>
                    <GlobalText text={data.latitude} />
                    <GlobalText text={data.longitude} />
                </View>
            </View>
            <ComingSoon message={"Coming Soon..."} visible={isVisible} />
        </TouchableOpacity>
    )
}

export default PlaceCard
