import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler } from "../../Services/CommonMethods";

const Place_catDetails = ({ navigation, route, ...props }) => {
    const [place_cat, setPlace_cat] = useState([]); // State to store city
    const [error, setError] = useState(null); // State to store error message

    useEffect(() => {
        const backHandler = goBackHandler(navigation)
        checkLogin(navigation)
        props.setLoader(true);
        getDetails()
        return () => {
            backHandler.remove()
        }
    }, []);

    const getDetails = () => {
        comnGet(`v1/place_cat/${route.params.id}`, props.access_token)
            .then((res) => {
                setPlace_cat(res.data.data);
                props.setLoader(false);
            })
            .catch((error) => {
                setError(error.message);
                props.setLoader(false);
            });
    }

    return (
        <ScrollView>
            <Loader />
            <Header
                name={place_cat.name}
                startIcon={
                    <Ionicons
                        name="chevron-back-outline"
                        color={COLOR.black}
                        size={DIMENSIONS.userIconSize}
                        onPress={() => backPage(navigation)}
                    />
                }
            />
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                    <Text>{place_cat.name}</Text>
                    <Text> {JSON.stringify(place_cat)}</Text>

                    {/* <Text> {place_cat.tag_line}</Text> */}
                    {/* <Text>{city.description}</Text>
                    <Text>{city.place_cats_count}</Text>
                    <Text>{city.place_cats_count}</Text>              */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Place_catDetails);
