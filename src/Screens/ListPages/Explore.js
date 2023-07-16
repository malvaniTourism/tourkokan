import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Switch, SafeAreaView, ImageBackground, FlatList } from "react-native";
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
import PlaceCard from "../../Components/Cards/PlaceCard";
import CityCard from "../../Components/Cards/CityCard";
import GlobalText from "../../Components/Customs/Text";

const Explore = ({ navigation, ...props }) => {
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);
    getCities()
    getPlaces()
    return () => {
      backHandler.remove()
    }
  }, []);

  const getPlaces = () => {
    comnGet("v1/places", props.access_token)
      .then((res) => {
        setPlaces(res.data.data.data);
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
      });
  }

  const getCities = () => {
    comnGet("v1/cities", props.access_token)
      .then((res) => {
        setCities(res.data.data.data);
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
      });
  }

  const renderPlaces = ({ item, index }) => {
    return (
      <PlaceCard data={item} navigation={navigation} />
    )
  }

  const toggleSwitch = (val) => {
    setIsEnabled(val)
  }

  const handleSmallCardClick = (id) => {
    navigateTo(navigation, "PlaceDetails", { id }); // Replace 'CityScreen' with the name of your CityScreen component in your navigation stack
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Loader />
      <Header name={'Explore'}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            color={COLOR.white}
            size={DIMENSIONS.userIconSize}
            onPress={() => backPage(navigation)}
          />
        }
      />
      <View style={styles.toggleView}>
        <View style={styles.overlay} />
        <ImageBackground
          source={{ uri: "https://c4.wallpaperflare.com/wallpaper/766/970/409/cities-city-building-cityscape-wallpaper-preview.jpg" }}
          style={styles.exploreHeaderImage} imageStyle={styles.cityImageStyle}
          resizeMode="cover"
        />
        <View style={styles.details}>
          <GlobalText text={"Click on what would you like to Explore..."} style={styles.whiteText} />
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
            <TouchableOpacity onPress={() => toggleSwitch(true)}>
              <GlobalText text={"Cities"} style={styles.whiteText} />
            </TouchableOpacity>
            <View style={styles.lineVert} />
            <TouchableOpacity onPress={() => toggleSwitch(false)}>
              <GlobalText text={"Places"} style={styles.whiteText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{minHeight: DIMENSIONS.screenHeight}}>
      {isEnabled ?
        <ScrollView>
          {cities.map((city) => (
            <CityCard data={city} navigation={navigation} />
            ))}
        </ScrollView>
        :
        <SafeAreaView style={{ alignItems: "center", marginBottom: 70 }}>
          <ScrollView>
            <FlatList
              keyExtractor={(item) => item.id}
              data={places}
              renderItem={renderPlaces}
              numColumns={2}
              style={{ paddingBottom: 150 }}
              />
          </ScrollView>
        </SafeAreaView>
      }
      </View>
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
