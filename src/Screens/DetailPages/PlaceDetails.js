import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageBackground } from "react-native";
import SmallCard from "../../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { comnGet } from "../../Services/Api/CommonServices";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setLoader } from "../../Reducers/CommonActions";
import Loader from "../../Components/Customs/Loader";
import Header from "../../Components/Common/Header";
import { Image } from "@rneui/themed";
import styles from "../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler } from "../../Services/CommonMethods";
import CityCard from "../../Components/Cards/CityCard";
// import SkeletonContent from 'react-native-skeleton-content';

const PlaceDetails = ({ navigation, route, ...props }) => {
    const [place, setPlace] = useState([]); // State to store city
    const [error, setError] = useState(null); // State to store error message
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        props.setLoader(true);
        const backHandler = goBackHandler(navigation)
        checkLogin(navigation)
        props.setLoader(true);
        getDetails()
        return () => {
            backHandler.remove()
        }
    }, []);

    const getDetails = () => {
        comnGet(`v1/place/${route.params.id}`, props.access_token)
            .then((res) => {
                console.log('log ', res.data.data);
                setPlace(res.data.data); // Update city state with response data
                setIsLoading(false)
                props.setLoader(false);
            })
            .catch((error) => {
                setError(error.message); // Update error state with error message
                setIsLoading(false)
                props.setLoader(false);
            });
    }

    return (
        <ScrollView>
            {
                isLoading ?
                    <Loader />
                    :
                    <View>
                        {/* <SkeletonContent containerStyle={{flex: 1, width: 300}}
            animationDirection="horizontalLeft"
            layout={[
            { width: 220, height: 20, marginBottom: 6 },
            { width: 180, height: 20, marginBottom: 6 },
            ]} isLoading={true}> */}
                        <Header
                            name={'Place'}
                            startIcon={
                                <Ionicons
                                    name="chevron-back-outline"
                                    color={COLOR.black}
                                    size={DIMENSIONS.userIconSize}
                                    onPress={() => backPage(navigation)}
                                />
                            }
                        />
                        {place &&
                            <View style={{ flex: 1, padding: 10 }}>
                                <View style={styles.placeImageView}>
                                    <ImageBackground source={place.image_url} style={styles.placeImage} />
                                    <Text style={styles.detailTitle}>{place.name}</Text>
                                </View>
                                <Text>{place.description}</Text>
                                <Text>rating: {place.rating}</Text>
                                <Text>visitors: {place.visitors_count}</Text>
                                <Text>uploads: {place.photos_count}</Text>
                                <Text>comments: {place.comments_count}</Text>
                                <Text>{place.latitude}</Text>
                                <Text>{place.longitude}</Text>
                                <Text>social: {JSON.stringify(place.social_media)}</Text>
                                <Text>contact: {JSON.stringify(place.contact_details)}</Text>

                                <View style={styles.sectionView}>
                                    <Text style={styles.sectionTitle}>Located In:</Text>
                                    <CityCard data={place.city} />
                                </View>
                                {/* <Text style={{marginTop: 50}}> {JSON.stringify(place)}</Text> */}
                            </View>
                        }
                    </View>
            }
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return {
        access_token: state.commonState.access_token,
        isLoading: state.commonState.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (data) => {
            dispatch(setLoader(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
