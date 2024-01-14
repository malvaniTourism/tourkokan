import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageBackground, Image } from "react-native";
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
        console.log('cityId:: ', cityId);
        console.log('place:: ', place);
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

    const handleSmallCardClick = (page, id, name) => {
        navigateTo(navigation, page, { id, name });
    };

    return (
        <ScrollView>
            <Loader />
            <Header
                name={STRING.HEADER.CITY}
                startIcon={
                    <Ionicons
                        name="chevron-back-outline"
                        color={COLOR.white}
                        size={DIMENSIONS.userIconSize}
                        onPress={() => backPage(navigation)}
                    />
                }
            />

            {city &&
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={styles.cityImageView}>
                        <ImageBackground source={city.image_url} style={styles.placeImage} />
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
