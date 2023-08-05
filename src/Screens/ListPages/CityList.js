import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import SmallCard from "../../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { comnGet } from "../../Services/Api/CommonServices";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook from your navigation library
import Loader from "../../Components/Customs/Loader";
import Header from "../../Components/Common/Header";
import { setLoader } from "../../Reducers/CommonActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";
import styles from "./Styles";
import CityCard from "../../Components/Cards/CityCard";

const CityList = ({ navigation, ...props }) => {
  const [cities, setCities] = useState([]); // State to store cities
  const [error, setError] = useState(null); // State to store error message
  const [isLandingDataFetched, setIsLandingDataFetched] = useState(false);

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);

    if (props.access_token) {
      if (!isLandingDataFetched && props.access_token) {
        getCities()
        setIsLandingDataFetched(true); // Mark the data as fetched
      }
    }

    return () => {
      backHandler.remove()
    }
  }, []);

  const getCities = () => {
    comnGet("v1/cities", props.access_token)
      .then((res) => {
        setCities(res.data.data.data); // Update cities state with response data
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
        setError(error.message); // Update error state with error message
      });
  }

  const handleSmallCardClick = (id) => {
    navigateTo(navigation, "CityDetails", { id });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Loader />
        <Header name={'Cities'}
          startIcon={
            <Ionicons
              name="chevron-back-outline"
              color={COLOR.white}
              size={DIMENSIONS.userIconSize}
              onPress={() => backPage(navigation)}
            />
          }
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <View>
            {cities.map((city) => (
              <CityCard data={city} navigation={navigation} />
            ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
