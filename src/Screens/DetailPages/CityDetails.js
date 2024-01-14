import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
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

const CityDetails = ({ navigation, route, ...props }) => {
    const [city, setCity] = useState([]); // State to store city
    const [error, setError] = useState(null); // State to store error message
    const [cityId, setCityId] = useState(route.params.id)

    useEffect(() => {
        const backHandler = goBackHandler(navigation)
        checkLogin(navigation)
        props.setLoader(true);
        getDetails()
        return () => {
            backHandler.remove()
        }
    }, [cityId]);

    const getDetails = (place) => {
        props.setLoader(true);
        let data = {
            id: place || cityId
        }
        comnPost(`v2/getSite`, data)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.data);
                    setCity(res.data.data);
                    props.setLoader(false);
                } else {
                    setError(res.data.message);
                    props.setLoader(false);
                }
            })
            .catch((error) => {
                setError(error.message); // Update error state with error message
                props.setLoader(false);
            });
    }

    const onHeartClick = async () => {
        let placeData = {
            user_id: await AsyncStorage.getItem(STRING.STORAGE.USER_ID),
            favouritable_type: STRING.TABLE.SITES,
            favouritable_id: city.id
        }
        comnPost('v2/favourite', placeData)
            .then(res => {
                getDetails()
            })
            .catch(err => {
            })
    }

    return (
        <ScrollView>
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
                        <ImageBackground source={{ uri: Path.FTP_PATH + city.image }} style={styles.placeImage} />
                        <View style={{ alignItems: 'flex-end' }}>
                            <TouchableOpacity style={styles.cityLikeView} onPress={() => onHeartClick()}>
                                {
                                    city.is_favorite ?
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
                    </View>
                    <View style={{ flex: 1, padding: 10 }}>
                        <View style={styles.cityImageView}>
                            <GlobalText text={city.name} style={styles.detailTitle} />
                            <GlobalText text={city.tag_line} style={styles.detailTitle} />
                        </View>
                        <GlobalText text={city.description} />
                        <GlobalText text={`projects: ${city.projects_count}`} />
                        <GlobalText text={`places: ${city.places_count}`} />
                        <GlobalText text={`uploads: ${city.photos_count}`} />
                        <GlobalText text={`comments: ${city.comments_count}`} />
                        <GlobalText text={city.latitude} />
                        <GlobalText text={city.longitude} />
                        <GlobalText text={`social: ${JSON.stringify(city.social_media)}`} />
                        <GlobalText text={`contact: ${JSON.stringify(city.contact_details)}`} />
                        <GlobalText text={`comments: ${JSON.stringify(city.comments)}`} />
                        <GlobalText text={`photos: ${JSON.stringify(city.photos)}`} />

                        <View style={styles.sectionView}>
                            <ScrollView showsHorizontalScrollIndicator={false}>
                                {city.sites && city.sites.map((place, index) => (
                                    <CityCard data={place} navigation={navigation} reload={() => getDetails()} onClick={() => getDetails(place.id)} />
                                ))}
                            </ScrollView>
                        </View>

                    </View>
                </View>
            }
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
