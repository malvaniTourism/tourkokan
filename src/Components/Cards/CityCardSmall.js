import React, { useEffect, useState } from "react"
import { View, Text, ImageBackground, TouchableOpacity, Share } from "react-native"
import styles from "./Styles"
import Path from "../../Services/Api/BaseUrl";
import GlobalText from "../Customs/Text";
import { navigateTo } from "../../Services/CommonMethods";
import ComingSoon from "../Common/ComingSoon";
import Octicons from "react-native-vector-icons/Octicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { comnPost } from "../../Services/Api/CommonServices";
import STRING from "../../Services/Constants/STRINGS";

const CityCardSmall = ({ data, reload, navigation, addComment, onClick }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isFav, setIsFav] = useState(data?.is_favorite)
    const [rating, setRating] = useState(data?.rating_avg_rate)
    const [commentCount, setCommentCount] = useState(data?.comment_count || 0)
    const [rate, setRate] = useState(data?.rate?.rating_avg_rate)
    const [cardType, setCardType] = useState("city")
    // const [cardType, setCardType] = useState(data.category?.code)

    useEffect(() => {
        setRating(data?.rating_avg_rate);
    }, [rate])

    const onHeartClick = async () => {
        let placeData = {
            user_id: await AsyncStorage.getItem(STRING.STORAGE.USER_ID),
            favouritable_type: STRING.TABLE.SITE,
            favouritable_id: data.id
        }
        setIsFav(!isFav)
        comnPost("v2/addDeleteFavourite", placeData)
            .then(res => {
                props.setLoader(false);
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
                console.log("Content shared successfully");
            } else if (result.action === Share.dismissedAction) {
                console.log("Share dismissed");
            }
        } catch (error) {
            console.error("Error sharing content:", error.message);
        }
    };

    const onStarRatingPress = async (rate) => {
        setRating(rate)
        const placeData = {
            user_id: await AsyncStorage.getItem(STRING.STORAGE.USER_ID),
            rateable_type: STRING.TABLE.SITE,
            rateable_id: data.id,
            rate
        }
        comnPost('v2/addUpdateRating', placeData)
            .then(res => {
                reload()
            })
            .catch(err => {
            })
    }

    return (
        <TouchableOpacity style={cardType == "city" ? styles.cityCardSmall : styles.placeCardSmall} onPress={() => onClick()}>
            <View style={styles.cityOverlay} />
            {data.image ?
                <ImageBackground source={{ uri: Path.FTP_PATH + data.image }} style={cardType == "city" ? styles.citySmallImage : styles.placeImage} imageStyle={styles.cityImageStyle} resizeMode="cover" />
                :
                <ImageBackground source={require("../../Assets/Images/nature.jpeg")} style={cardType == "city" ? styles.citySmallImage : styles.placeImage} imageStyle={styles.cityImageStyle} resizeMode="cover" />
            }
            <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity style={styles.citySmallLikeView} onPress={() => onHeartClick()}>
                    {
                        isFav ?
                            <Octicons name="heart-fill" color={COLOR.red} size={DIMENSIONS.iconSize} />
                            :
                            <Octicons name="heart" color={COLOR.black} size={DIMENSIONS.iconSize} />
                    }
                </TouchableOpacity>
                <GlobalText text={commentCount} style={styles.commentCount} />
                <TouchableOpacity style={styles.citySmallLikeView}>
                    <Octicons name="comment" color={COLOR.black} size={DIMENSIONS.iconSize} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.citySmallLikeView}>
                    {rating > 0 &&
                        <GlobalText text={rating.slice(0, 3)} style={styles.avgRating} />
                    }
                    <Octicons name="star" color={COLOR.yellow} size={DIMENSIONS.iconSize} />
                </TouchableOpacity> */}
            </View>

            <View style={cardType == "city" ? styles.citySmallDetailsOverlay : styles.placeDetailsOverlay}>
                <View>
                    <GlobalText text={data.name} style={styles.citySmallName} />
                    <GlobalText text={`${data.tag_line.slice(0, 50)}${data.tag_line.length > 50 ? "..." : ""}`} style={styles.citySmallTagLine} />
                </View>
                <View style={cardType == "city" ? styles.citySmallStarView : styles.placeStarView}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={rating}
                        selectedStar={(rating) => onStarRatingPress(rating)}
                        starSize={13}
                        starStyle={styles.starStyle}
                    />
                </View>
            </View>
            <ComingSoon message={STRING.COMING_SOON} visible={isVisible} />
        </TouchableOpacity>
    )
}

export default CityCardSmall