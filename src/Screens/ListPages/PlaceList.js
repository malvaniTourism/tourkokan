import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import SmallCard from "../../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { comnGet } from "../../Services/Api/CommonServices";
import { connect } from "react-redux";
import { setLoader } from "../../Reducers/CommonActions";
import Loader from "../../Components/Customs/Loader";
import styles from "../Styles";
import Header from "../../Components/Common/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";

const PlaceList = ({ navigation, ...props }) => {
  const [places, setPlaces] = useState([]); // State to store places
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);
    getPlaces()
    return () => {
      backHandler.remove()
    }
  }, []);

  const getPlaces = () => {
    comnGet("v1/places", props.access_token)
      .then((res) => {
        setPlaces(res.data.data.data); // Update places state with response data
        props.setLoader(false);
      })
      .catch((error) => {
        setError(error.message); // Update error state with error message
        props.setLoader(false);
      });
  }

  const handleSmallCardClick = (id) => {
    navigateTo(navigation, "PlaceDetails", { id }); // Replace 'CityScreen' with the name of your CityScreen component in your navigation stack
  };

  return (
    <ScrollView>
      <Loader />
      <Header name={'Places'}
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
        <View style={styles.cardsWrap}>
          {places.map((place) => (
              <SmallCard
                Icon={
                  <Ionicons
                    name="bus"
                    color={COLOR.yellow}
                    size={DIMENSIONS.iconSize}
                  />
                }
                title={place.name} // Update the title prop to reference the appropriate property from the city object
                onPress={() => handleSmallCardClick(place.id)}
              />
          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);
