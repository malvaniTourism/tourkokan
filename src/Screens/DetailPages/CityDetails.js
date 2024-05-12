import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, ImageBackground, Image, TouchableOpacity, Share, Linking } from "react-native";
import SmallCard from "../../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { comnGet, comnPost } from "../../Services/Api/CommonServices";
import { connect } from "react-redux";
import { setLoader } from "../../Reducers/CommonActions";
import Loader from "../../Components/Customs/Loader";
import Header from "../../Components/Common/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";
import GlobalText from "../../Components/Customs/Text";
import styles from "./Styles";
import TabView from "../../Components/Common/TabView";
import Path from "../../Services/Api/BaseUrl";
import STRING from "../../Services/Constants/STRINGS";
import PlaceCard from "../../Components/Cards/PlaceCard";
import CityCard from "../../Components/Cards/CityCard";
import Octicons from "react-native-vector-icons/Octicons";
import CommentsSheet from "../../Components/Common/CommentsSheet";
import BottomSheet from "../../Components/Customs/BottomSheet";
import StarRating from "react-native-star-rating";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ReadMore from 'react-native-read-more-text';
import TextButton from "../../Components/Customs/Buttons/TextButton";
import CityCardSkeleton from "../../Components/Cards/CityCardSkeleton";
import { Skeleton } from "@rneui/themed";
import MapView, { Marker, Polygon } from "react-native-maps";
import MapContainer from "../../Components/Common/MapContainer";
import MapSkeleton from "../../Components/Common/MapSkeleton";

const CityDetails = ({ navigation, route, ...props }) => {
    const refRBSheet = useRef();
    const [city, setCity] = useState([]); // State to store city
    const [error, setError] = useState(null); // State to store error message
    const [cityId, setCityId] = useState(route.params.id);
    const [isFav, setIsFav] = useState(false);
    const [rating, setRating] = useState(0)
    const [commentCount, setCommentCount] = useState(0);
    const [isLoading, setLoader] = useState(true);
    const [initialRegion, setInitialRegion] = useState({});
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();

    useEffect(() => {
        const backHandler = goBackHandler(navigation)
        checkLogin(navigation)
        setLoader(true);
        getDetails()
        return () => {
            backHandler.remove()
        }
    }, [cityId]);

    const getDetails = (place) => {
        setLoader(true);
        let data = {
            id: place || cityId
        }
        comnPost(`v2/getSite`, data)
            .then((res) => {
                if (res.data.success) {
                    setCity(res.data.data);
                    setIsFav(res.data.data.is_favorite)
                    setRating(res.data.data.rating_avg_rate)
                    setCommentCount(res.data.data.comment_count)
                    setLocationMap(res.data.data.latitude, res.data.data.longitude)
                    setLoader(false);
                } else {
                    setError(res.data.message);
                    setLoader(false);
                }
            })
            .catch((error) => {
                setError(error.message); // Update error state with error message
                setLoader(false);
            });
    }

    const setInitialLocation = (lat, long) => {
        let myInitialRegion = {
            latitude: parseFloat(lat) || 47.4220936,
            longitude: parseFloat(long) || -122.083922,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        console.log(myInitialRegion);
        setInitialRegion(myInitialRegion)
    }

    const setLocationMap = (lat, long) => {
        setInitialLocation(lat, long)
        setCurrentLatitude(parseFloat(lat));
        setCurrentLongitude(parseFloat(long))
    }

    const onHeartClick = async () => {
        setLoader(true)
        let placeData = {
            user_id: await AsyncStorage.getItem(STRING.STORAGE.USER_ID),
            favouritable_type: STRING.TABLE.SITES,
            favouritable_id: city.id
        }
        setIsFav(!isFav)
        comnPost("v2/addDeleteFavourite", placeData)
            .then(res => {
                getDetails()
            })
            .catch(err => {
            })
    }

    const onStarRatingPress = async (rate) => {
        const placeData = {
            user_id: await AsyncStorage.getItem(STRING.STORAGE.USER_ID),
            rateable_type: STRING.TABLE.SITE,
            rateable_id: city.id,
            rate
        }
        comnPost('v2/addUpdateRating', placeData)
            .then(res => {
                getDetails()
            })
            .catch(err => {
            })
    }

    const openCommentsSheet = () => {
        refRBSheet.current.open()
    }

    const closeCommentsSheet = () => {
        refRBSheet.current.close()
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

    const renderTruncatedFooter = (handlePress) => {
        return (
            <TextButton
                title={STRING.BUTTON.READ_MORE}
                onPress={handlePress}
                buttonView={styles.readMoreStyle}
                titleStyle={styles.titleStyle}
                endIcon={
                    <Ionicons
                        name="chevron-down"
                        color={COLOR.themeBlue}
                        size={DIMENSIONS.iconMedium}
                    />
                }
            />
        );
    }

    const renderRevealedFooter = (handlePress) => {
        return (
            <TextButton
                title={STRING.BUTTON.READ_LESS}
                onPress={handlePress}
                buttonView={styles.readMoreStyle}
                titleStyle={styles.titleStyle}
                endIcon={
                    <Ionicons
                        name="chevron-up"
                        color={COLOR.themeBlue}
                        size={DIMENSIONS.iconMedium}
                    />
                }
            />
        );
    }

    const handleTextReady = () => {
        // ...
    }

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <Loader />
            <Header
                name={""}
                startIcon={
                    <Ionicons
                        name="chevron-back-outline"
                        color={COLOR.black}
                        size={DIMENSIONS.userIconSize}
                        onPress={() => backPage(navigation)}
                        style={styles.backIcon}
                    />
                }
                style={styles.cityHeader}
            />

            {city &&
                <View>
                    <View style={styles.placeImageView}>
                        {
                            isLoading ?
                                <Skeleton animation="pulse" variant="text" style={styles.placeImage} />
                                :
                                city.image ?
                                    <ImageBackground source={{ uri: Path.FTP_PATH + city.image }} style={styles.placeImage} />
                                    :
                                    <ImageBackground source={require("../../Assets/Images/nature.jpeg")} style={styles.placeImage} imageStyle={styles.cityImageStyle} resizeMode="cover" />
                        }
                    </View>
                    <View style={{ padding: 10 }}>
                        {
                            isLoading ?
                                <>
                                    <Skeleton animation="pulse" variant="text" style={{ width: 130, height: 20 }} />
                                    <Skeleton animation="pulse" variant="text" style={{ marginTop: 5, width: 190 }} />
                                </>
                                :
                                <View>
                                    <View style={styles.flexBetween}>
                                        <View style={styles.flexRow}>
                                            <MaterialIcons
                                                name="location-pin"
                                                color={COLOR.themeBlue}
                                                size={DIMENSIONS.iconSize}
                                            />
                                            <GlobalText text={city.name} style={styles.detailTitle} />
                                        </View>
                                        <TouchableOpacity style={styles.cityLikeView} onPress={() => onHeartClick()}>
                                            {
                                                isFav ?
                                                    <Octicons name="heart-fill" color={COLOR.red} size={DIMENSIONS.iconSize} />
                                                    :
                                                    <Octicons name="heart" color={COLOR.black} size={DIMENSIONS.iconSize} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <GlobalText text={city.tag_line} style={styles.detailSubTitle} />
                                </View>
                        }

                        <View style={styles.detailsTitleView}>
                            <View>
                                {
                                    isLoading ?
                                        <>
                                            <Skeleton animation="pulse" variant="text" style={{ marginTop: 12, width: 100 }} />
                                        </>
                                        :
                                        <>
                                            <View style={styles.cityStarView}>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={rating}
                                                    selectedStar={(rating) => onStarRatingPress(rating)}
                                                    starSize={14}
                                                    starStyle={styles.starStyle}
                                                    halfStarEnabled
                                                    emptyStarColor={COLOR.grey}
                                                />
                                                {rating > 0 &&
                                                    <GlobalText text={rating.slice(0, 3)} style={styles.avgRating} />
                                                }
                                                <GlobalText text={`( ${commentCount} Reviews )`} />
                                            </View>
                                        </>
                                }
                            </View>
                        </View>

                        {
                            isLoading ?
                                <>
                                    <Skeleton animation="pulse" variant="text" style={{ width: 300 }} />
                                    <Skeleton animation="pulse" variant="text" style={{ marginTop: 5, width: 320 }} />
                                    <Skeleton animation="pulse" variant="text" style={{ marginTop: 5, width: 200 }} />
                                    <Skeleton animation="pulse" variant="text" style={{ marginTop: 5, width: 300 }} />
                                    <Skeleton animation="pulse" variant="text" style={{ marginTop: 5, width: 250 }} />
                                </>
                                :
                                <ReadMore
                                    numberOfLines={5}
                                    renderTruncatedFooter={renderTruncatedFooter}
                                    renderRevealedFooter={renderRevealedFooter}
                                    onReady={handleTextReady}>
                                    <GlobalText text={city.description} />
                                </ReadMore>
                        }

                        <View style={styles.sectionView}>
                        {initialRegion.latitude ?
                            <MapContainer initialRegion={initialRegion} currentLatitude={currentLatitude} currentLongitude={currentLongitude} />
                            :
                            <MapSkeleton />
                        }
                        </View>

                        <View style={styles.sectionView}>
                            <GlobalText text={STRING.SCREEN.PLACES} style={styles.sectionTitle} />
                            <ScrollView showsHorizontalScrollIndicator={false}>
                                {
                                    isLoading ?
                                        <>
                                            <CityCardSkeleton />
                                            <CityCardSkeleton />
                                            <CityCardSkeleton />
                                        </>
                                        :
                                        city.sites && city.sites.map((place, index) => (
                                            <CityCard data={place} navigation={navigation} reload={() => console.log('getDetails()')} onClick={() => console.log('getDetails()')} />
                                        ))
                                }
                            </ScrollView>
                        </View>

                    </View>
                </View>
            }
            <BottomSheet
                refRBSheet={refRBSheet}
                height={DIMENSIONS.halfHeight + 50}
                Component={<CommentsSheet
                    key={city.comment?.length}
                    commentable_type={STRING.TABLE.SITE}
                    commentable_id={city.id}
                    reload={() => getDetails()}
                    setLoader={(v) => setLoader(v)}
                    openCommentsSheet={() => openCommentsSheet()}
                    closeCommentsSheet={() => closeCommentsSheet()}
                />}
                openCommentsSheet={() => openCommentsSheet()}
                closeCommentsSheet={() => closeCommentsSheet()}
            />
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return {
        access_token: state.commonState.access_token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (data) => {
            dispatch(setLoader(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityDetails);
