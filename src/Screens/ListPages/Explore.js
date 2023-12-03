import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity, Switch, SafeAreaView, ImageBackground, FlatList } from "react-native";
import SmallCard from "../../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { comnGet, dataSync, saveToStorage } from "../../Services/Api/CommonServices";
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
import STRING from "../../Services/Constants/STRINGS";
import NetInfo from '@react-native-community/netinfo';
import CheckNet from "../../Components/Common/CheckNet";
import ImageButton from "../../Components/Customs/Buttons/ImageButton";
// import InstaStory from 'react-native-insta-story';

const Explore = ({ route, navigation, ...props }) => {
  const refRBSheet = useRef();

  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [isEnabled, setIsEnabled] = useState(route.name == STRING.SCREEN.CITIES)
  const [isLandingDataFetched, setIsLandingDataFetched] = useState(false);
  const [nextPage, setNextPage] = useState(1)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);

    if (props.access_token) {
      if (!isLandingDataFetched && props.access_token) {
        // getCities()
        // getPlaces()
        setIsLandingDataFetched(true); // Mark the data as fetched
      }
      props.setLoader(false);
    }

    const unsubscribe = NetInfo.addEventListener(state => {
      setOffline(false)

      dataSync(STRING.STORAGE.CITIES_RESPONSE, getCities())
        .then(resp => {
          let res = JSON.parse(resp)
          if (res.data && res.data.data) {
            setCities(res.data.data.data);
          } else if (resp) {
            setOffline(true)
          }
        })

      dataSync(STRING.STORAGE.PLACES_RESPONSE, getPlaces())
        .then(resp => {
          let res = JSON.parse(resp)
          if (res.data && res.data.data) {
            setPlaces([...places, ...res.data.data.data]);
          } else if (resp) {
            setOffline(true)
          }
        })
      props.setLoader(false);
      // removeFromStorage(STRING.STORAGE.LANDING_RESPONSE)
    });

    return () => {
      backHandler.remove()
      unsubscribe();
    }
  }, []);

  const getPlaces = (ifNext) => {
    comnGet(`v1/places?page=${ifNext ? nextPage : nextPage - 1}`, props.access_token)
      .then((res) => {
        if (res && res.data.data)
          saveToStorage(STRING.STORAGE.PLACES_RESPONSE, JSON.stringify(res))
        setPlaces([...places, ...res.data.data.data]);
        props.setLoader(false);
        let nextUrl = res.data.data.next_page_url
        setNextPage(nextUrl[nextUrl.length - 1])
      })
      .catch((error) => {
        props.setLoader(false);
      });
  }

  const getCities = () => {
    comnGet("v1/cities", props.access_token)
      .then((res) => {
        if (res && res.data.data)
          saveToStorage(STRING.STORAGE.CITIES_RESPONSE, JSON.stringify(res))
        setCities(res.data.data.data);
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
      });
  }

  const renderPlaces = ({ item, index }) => {
    return (
      <PlaceCard data={item} navigation={navigation} reload={() => getPlaces()} />
    )
  }

  const goToNext = () => {
    console.log('next');
    // props.setLoader(true)
    getPlaces(true)
  }

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Loader />
      <CheckNet isOff={offline} />
      <Header name={STRING.HEADER.EXPLORE}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            color={COLOR.white}
            size={DIMENSIONS.userIconSize}
            onPress={() => backPage(navigation)}
          />
        }
      />
      <View style={{ minHeight: DIMENSIONS.iconXXL, marginTop: -10 }}>
        <ScrollView horizontal style={styles.citiesButtonScroll}>
          {cities.map((city) => (
            <ImageButton
              text={
                <GlobalText text={city.name} style={styles.cityButtonText} />
              }
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.toggleView}>
        <View style={styles.overlay} />
        <ImageBackground
          source={{ uri: "https://c4.wallpaperflare.com/wallpaper/766/970/409/cities-city-building-cityscape-wallpaper-preview.jpg" }}
          style={styles.exploreHeaderImage} imageStyle={styles.cityImageStyle}
          resizeMode="cover"
        />
        <View style={styles.details}>
          <GlobalText text={STRING.TO_EXPLORE} style={styles.whiteText} />
          {/* <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
            <TouchableOpacity onPress={() => toggleSwitch(true)}>
              <GlobalText text={"Cities"} style={styles.whiteText} />
            </TouchableOpacity>
            <View style={styles.lineVert} />
            <TouchableOpacity onPress={() => toggleSwitch(false)}>
              <GlobalText text={"Places"} style={styles.whiteText} />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      <View style={{ minHeight: DIMENSIONS.screenHeight }}>
        {isEnabled ?
          <ScrollView
            style={{ marginBottom: 350 }}
          >
            {cities.map((city) => (
              <CityCard data={city} navigation={navigation} reload={() => getCities()} />
            ))}
          </ScrollView>
          :
          <SafeAreaView style={{ alignItems: "center", marginBottom: 270 }}>
            <ScrollView>
              <FlatList
                keyExtractor={(item) => item.id}
                data={places}
                renderItem={renderPlaces}
                // numColumns={2}
                style={{ paddingBottom: 80 }}
                onEndReached={() => goToNext()}
                onEndReachedThreshold={0.5}
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
