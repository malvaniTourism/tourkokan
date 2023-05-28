import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import SmallCard from "../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import { comnGet } from "../Services/Api/CommonServices";
import { connect } from "react-redux";
import { setLoader } from "../Reducers/CommonActions";
import Loader from "../Components/Customs/Loader";
import styles from "./Styles";
import Header from "../Components/Common/Header";

const PlaceList = ({ navigation, ...props }) => {
  const [places, setPlaces] = useState([]); // State to store places
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    props.setLoader(true);
    comnGet("v1/places", props.access_token)
      .then((res) => {
        setPlaces(res.data.data.data); // Update places state with response data
        props.setLoader(false);
      })
      .catch((error) => {
        setError(error.message); // Update error state with error message
        props.setLoader(false);
      });
  }, []);

  // Function to handle SmallCard click
  const handleSmallCardClick = (id) => {
    navigation.navigate("PlaceDetails", { id }); // Replace 'CityScreen' with the name of your CityScreen component in your navigation stack
  };

  const goBack = () => {
    navigation.goBack();
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
            onPress={() => goBack()}
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
