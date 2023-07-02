import React, { useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import styles from './Styles'
import Path from '../../Services/Api/BaseUrl'
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLOR from '../../Services/Constants/COLORS';
import DIMENSIONS from '../../Services/Constants/DIMENSIONS';
import StarRating from 'react-native-star-rating';
import { comnPost } from '../../Services/Api/CommonServices';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CityCard = ({ data, reload }) => {
    const [isFav, setIsFav] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [rating, setRating] = useState(3.5)

    const onStarRatingPress = (rate) => {
        setRating(rate)
    }

    const onHeartClick = () => {
        let data = {
            user_id: AsyncStorage.getItem("userId"),
            favouritable_type: "City",
            favouritable_id: "1"
        }
        setIsFav(!isFav)
        comnPost('v1/favourite', data)
            .then(res => {
                // reload()
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onLikeClick = () => {
        setIsLiked(!isLiked)
        // reload()
    }

    return (
        <View style={styles.cityContainer}>
            <View style={styles.cityImageView}>
                <ImageBackground source={{ uri: Path.FTP_PATH + data.image_url }} style={styles.cityImage} imageStyle={styles.cityImageStyle} resizeMode="cover" />
                <TouchableOpacity style={styles.likeView} onPress={() => onHeartClick()}>
                    {
                        isFav ?
                            <Octicons name='heart-fill' color={COLOR.red} size={DIMENSIONS.iconSize} />
                            :
                            <Octicons name='heart' color={COLOR.black} size={DIMENSIONS.iconSize} />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.cityContentView}>
                <View style={styles.cityContentTop}>
                    <View>
                        <Text style={styles.cityName}>{data.name}</Text>
                        <Text style={styles.cityTag}>{data.tag_line}</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <View style={{ width: '40%' }}>
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
                        <TouchableOpacity onPress={() => onLikeClick()}>
                            {
                                isLiked ?
                                    <FontAwesome name='thumbs-up' color={COLOR.intentColor} size={DIMENSIONS.iconSize} />
                                    :
                                    <FontAwesome name='thumbs-o-up' color={COLOR.black} size={DIMENSIONS.iconSize} />
                            }
                        </TouchableOpacity>
                    </View>
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
