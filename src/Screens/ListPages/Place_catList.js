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

const Place_catList = ({ navigation, ...props }) => {
  const [place_cats, setPlace_cats] = useState([]); // State to store place_cats
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    checkLogin()
    props.setLoader(true);
    comnGet("v1/place_cats", props.access_token)
      .then((res) => {
        setPlace_cats(res.data.data.data); // Update place_cats state with response data
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
        setError(error.message); // Update error state with error message
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

  // Function to handle SmallCard click
  const handleSmallCardClick = (id) => {
    navigation.navigate("StopDetails", { id });
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Loader />
        <Header name={'Place Categories'}
          startIcon={
            <Ionicons
              name="chevron-back-outline"
              color={COLOR.black}
              size={DIMENSIONS.userIconSize}
              onPress={() => goBack()}
            />
          }
        />
        <View style={{ flexDirection: "row" }}>
          {place_cats.map((place_cat) => (
              <SmallCard
                Icon={
                  <Ionicons
                    name="bus"
                    color={COLOR.yellow}
                    size={DIMENSIONS.iconSize}
                  />
                }
                title={place_cat.name}
                onPress={() => handleSmallCardClick(place_cat.id)}
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

export default connect (mapStateToProps, mapDispatchToProps) (Place_catList);
