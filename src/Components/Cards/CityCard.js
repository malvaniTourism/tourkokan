import React, { useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Share } from 'react-native'
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

const CityCard = ({ data, reload, navigation, addComment, onClick }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isFav, setIsFav] = useState(data.is_favorite)
    const [rating, setRating] = useState(data.rating)
    const [cardType, setCardType] = useState(data.category?.code)

    const onHeartClick = async () => {
        let placeData = {
            user_id: await AsyncStorage.getItem(STRING.STORAGE.USER_ID),
            favouritable_type: STRING.TABLE.SITES,
            favouritable_id: data.id
        }
        console.log(placeData);
        setIsFav(!isFav)
        comnPost('v2/favourite', placeData)
            .then(res => {
                console.log(res);
                reload()
            })
            .catch(err => {
            })
    }

    const onShareClick = async () => {
        try {
            const deepLink = `awesomeapp://citydetails?id=${data.id}`; // Replace with your custom scheme and path
            const shareMessage = `Explore the details of this amazing city in TourKokan! 🌍🏙️ Check out what makes it unique and discover more about its culture, attractions, and hidden gems. Open the link to dive into the City Details now! 📱👀`;
            const shareUrl = deepLink;
            const result = await Share.share({
                message: shareMessage,
                url: shareUrl,
            });

            if (result.action === Share.sharedAction) {
                console.log('Content shared successfully');
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing content:', error.message);
        }
    };

    const onStarRatingPress = (rate) => {
        setRating(rate)
    }

    return (
        <TouchableOpacity style={cardType == "city" ? styles.cityCard : styles.placeCard} onPress={() => onClick()}>
            <View style={styles.cityOverlay} />
            <ImageBackground source={{ uri: Path.FTP_PATH + data.image }} style={cardType == "city" ? styles.cityImage : styles.placeImage} imageStyle={styles.cityImageStyle} resizeMode="cover" />
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity style={styles.cityLikeView} onPress={() => onHeartClick()}>
                    {
                        isFav ?
                            <Octicons name='heart-fill' color={COLOR.red} size={DIMENSIONS.iconSize} />
                            :
                            <Octicons name='heart' color={COLOR.black} size={DIMENSIONS.iconSize} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.cityLikeView} onPress={() => addComment()}>
                    <Octicons name='comment' color={COLOR.black} size={DIMENSIONS.iconSize} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cityLikeView} onPress={() => onShareClick()}>
                    <Octicons name='share' color={COLOR.black} size={DIMENSIONS.iconSize} />
                </TouchableOpacity>
            </View>

            <View style={cardType == "city" ? styles.cityStarView : styles.placeStarView}>
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

            <View style={cardType == "city" ? styles.cityDetailsOverlay : styles.placeDetailsOverlay}>
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