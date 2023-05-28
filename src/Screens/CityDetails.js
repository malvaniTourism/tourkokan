import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import SmallCard from "../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import { comnGet } from "../Services/Api/CommonServices";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setLoader } from "../Reducers/CommonActions";
import Loader from "../Components/Customs/Loader";
import Header from "../Components/Common/Header";

const CityDetails = ({ navigation, route, ...props }) => {
    const [city, setCity] = useState([]); // State to store city
    const [error, setError] = useState(null); // State to store error message

    useEffect(() => {
        props.setLoader(true);
        comnGet(`v1/city/${route.params.id}`, props.access_token)
            .then((res) => {
                if (res.data.success) {
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
    }, []);

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <ScrollView>
            <Loader />
            <Header
                name={city.name}
                startIcon={
                    <Ionicons
                        name="chevron-back-outline"
                        color={COLOR.black}
                        size={DIMENSIONS.userIconSize}
                        onPress={() => goBack()}
                    />
                }
            />
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                    <Text>{city.name}</Text>
                    <Text> {city.tag_line}</Text>
                    {/* <Text>{city.description}</Text>
                    <Text>{city.projects_count}</Text>
                    <Text>{city.places_count}</Text>              */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CityDetails);
