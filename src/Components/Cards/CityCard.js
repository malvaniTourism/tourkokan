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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { comnPost } from '../../Services/Api/CommonServices';
import STRING from '../../Services/Constants/STRINGS';

const CityCard = ({ data, reload, navigation }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isFav, setIsFav] = useState(data.is_favorite)
    const [rating, setRating] = useState(data.rating)

    const getCity = (id) => {
        // navigateTo(navigation, STRING.SCREEN.CITY_DETAILS, { id })
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
        }, 2000)
    }

    const onHeartClick = async () => {
        let placeData = {
            user_id: await AsyncStorage.getItem(STRING.STORAGE.USER_ID),
            favouritable_type: STRING.TABLE.CITY,
            favouritable_id: data.id
        }
        setIsFav(!isFav)
        comnPost('v2/favourite', placeData)
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
        <TouchableOpacity style={styles.cityCard} onPress={() => getCity(data.id)}>
            <View style={styles.cityOverlay} />
            <ImageBackground source={{ uri: Path.FTP_PATH1 + data.image }} style={styles.cityImage} imageStyle={styles.cityImageStyle} resizeMode="cover" />
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity style={styles.cityLikeView} onPress={() => onHeartClick()}>
                    {
                        isFav ?
                            <Octicons name='heart-fill' color={COLOR.red} size={DIMENSIONS.iconSize} />
                            :
                            <Octicons name='heart' color={COLOR.black} size={DIMENSIONS.iconSize} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.cityLikeView} onPress={() => onHeartClick()}>
                    <Octicons name='comment' color={COLOR.black} size={DIMENSIONS.iconSize} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cityLikeView} onPress={() => onHeartClick()}>
                    <Octicons name='share' color={COLOR.black} size={DIMENSIONS.iconSize} />
                </TouchableOpacity>
            </View>

            <View style={styles.cityStarView}>
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

            <View style={styles.cityDetailsOverlay}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <GlobalText text={data.name} style={styles.cityName} />
                    <View>
                        <GlobalText text={data.latitude} />
                        <GlobalText text={data.longitude} />
                    </View>
                </View>
                <View>
                    <GlobalText text={data.tag_line} style={styles.cityDesc} />
                </View>
            </View>
            <ComingSoon message={STRING.COMING_SOON} visible={isVisible} />
        </TouchableOpacity>
    )
}

export default CityCard