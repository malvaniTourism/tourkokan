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

const PlaceDetails = ({ navigation, route, ...props }) => {
    const [place, setPlace] = useState([]); // State to store city
    const [error, setError] = useState(null); // State to store error message

    useEffect(() => {
        checkLogin()
        props.setLoader(true);
        comnGet(`v1/place/${route.params.id}`, props.access_token)
            .then((res) => {
                console.log('log ', res.data.data);
                setPlace(res.data.data); // Update city state with response data
                props.setLoader(false);
            })
            .catch((error) => {
                setError(error.message); // Update error state with error message
                props.setLoader(false);
            });
    }, []);

    const checkLogin = async () => {
        if (
            (await AsyncStorage.getItem("access_token")) == null ||
            (await AsyncStorage.getItem("access_token")) == ""
        ) {
            navigation.navigate("Login");
        }
    }

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <ScrollView>
            <Loader />
            <Header
                name={place.name}
                startIcon={
                    <Ionicons
                        name="chevron-back-outline"
                        color={COLOR.black}
                        size={DIMENSIONS.userIconSize}
                        onPress={() => goBack()}
                    />
                }
            />
            <View style={{ flex: 1 }}>
                <View style={styles.center}>
                    <View style={styles.placeImageView}>
                        <ImageBackground source={place.image_url} style={styles.placeImage} />
                        <Text>{place.name}</Text>
                    </View>
                </View>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
