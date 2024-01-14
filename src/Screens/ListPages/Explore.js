import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity, Switch, SafeAreaView, ImageBackground, FlatList } from "react-native";
import SmallCard from "../../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { comnGet, comnPost, dataSync, saveToStorage } from "../../Services/Api/CommonServices";
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
import TextButton from "../../Components/Customs/Buttons/TextButton";
// import InstaStory from 'react-native-insta-story';
import CommentsSheet from "../../Components/Common/CommentsSheet";
import BottomSheet from "../../Components/Customs/BottomSheet";

const Explore = ({ route, navigation, ...props }) => {
  const refRBSheet = useRef();

  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [isEnabled, setIsEnabled] = useState(route.name == STRING.SCREEN.CITIES)
  const [isLandingDataFetched, setIsLandingDataFetched] = useState(false);
  const [nextPage, setNextPage] = useState(1)
  const [offline, setOffline] = useState(false)
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSites, setSelectedSites] = useState([])

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);

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

      // dataSync(STRING.STORAGE.PLACES_RESPONSE, getPlaces())
      //   .then(resp => {
      //     let res = JSON.parse(resp)
      //     if (res.data && res.data.data) {
      //       setPlaces([...places, ...res.data.data.data]);
      //     } else if (resp) {
      //       setOffline(true)
      //     }
      //   })
      // removeFromStorage(STRING.STORAGE.LANDING_RESPONSE)
    });

    return () => {
      backHandler.remove()
      unsubscribe();
    }
  }, []);

  const getPlaces = (ifNext) => {
    comnPost(`v2/places?page=${ifNext ? nextPage : nextPage - 1}`, props.access_token)
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

  const getCities = (selectedCity) => {
    props.setLoader(true)
    let data = {
      apitype: 'list',
      // parent_id: 1,
      category: "city"
    };
    comnPost("v2/sites", data)
      .then((res) => {
        if (res && res.data.data)
          saveToStorage(STRING.STORAGE.CITIES_RESPONSE, JSON.stringify(res))
        setCities(res.data.data.data);
        setSelectedCity(selectedCity || res.data.data.data[0].name)
        setSelectedSites(selectedCity ? cities.find((item) => item.name === selectedCity).sites : res.data.data.data[0].sites)
        // setSelectedSites(res.data.data.data[0].sites)
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
      });
  }

  const goToNext = () => {
    console.log('next');
    // props.setLoader(true)
    getPlaces(true)
  }

  const seeMore = () => {
    navigateTo(navigation, STRING.SCREEN.CITY_LIST, { cities })
  }

  const handleCityPress = (city) => {
    console.log('city: ', city.name);
    setSelectedCity(city.name);
    getCities(city.name)
  };

  const openCommentsSheet = () => {
    refRBSheet.current.open()
  }

  const closeCommentsSheet = () => {
    refRBSheet.current.close()
  }

  const getCityDetails = (id) => {
    navigateTo(navigation, STRING.SCREEN.CITY_DETAILS, { id })
  }

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Loader />
      <CheckNet isOff={offline} />
      <Header name={""}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            color={COLOR.white}
            size={DIMENSIONS.userIconSize}
            onPress={() => backPage(navigation)}
          />
        }
      />
      <View style={styles.horizontalCityScroll}>
        <ScrollView horizontal style={styles.citiesButtonScroll}>
          {cities.map((city) => (
            <ImageButton
              key={city.id}
              onPress={() => handleCityPress(city)}
              isSelected={selectedCity === city.name}
              image={city.image}
              text={
                <GlobalText text={city.name} style={styles.cityButtonText} />
              }
            />
          ))}
        </ScrollView>
        <View style={{paddingBottom: 10}}>
            <TextButton
              title={STRING.BUTTON.SEE_CITIES}
              containerStyle={styles.seeCitiesContainer}
              seeMoreStyle={styles.seeCitiesContainer}
              buttonStyle={styles.seeCitiesButtonStyle}
              titleStyle={styles.citiesButtonTitleStyle}
              raised={false}
              onPress={() => seeMore()}
            />
          </View>
      </View>
      {cities[0] &&
        <View>
          <View style={styles.toggleView}>
            <View style={styles.overlay} />
            <ImageBackground
              source={{ uri: "https://c4.wallpaperflare.com/wallpaper/766/970/409/cities-city-building-cityscape-wallpaper-preview.jpg" }}
              style={styles.exploreHeaderImage} imageStyle={styles.cityImageStyle}
              resizeMode="cover"
            />
            <View style={styles.details}>
              <GlobalText text={STRING.TO_EXPLORE} style={styles.whiteText} />
            </View>
          </View>
        </View>
      }
      <View style={{ minHeight: DIMENSIONS.screenHeight }}>
        {
          selectedSites[0] ?
            <ScrollView
              style={{ marginBottom: 450 }}
            >
              {selectedSites.map((place) => (
                <CityCard data={place} navigation={navigation} reload={() => getPlaces()} onClick={() => getCityDetails(place.id)} />
              ))}
            </ScrollView>
            :
            <View style={{marginTop: 20}}>
              <GlobalText text={STRING.ADDED} style={styles.boldText} />
            </View>
        }
      </View>
      <BottomSheet
        refRBSheet={refRBSheet}
        height={DIMENSIONS.screenHeight - DIMENSIONS.headerSpace}
        Component={<CommentsSheet
          openCommentsSheet={() => openCommentsSheet()}
          closeCommentsSheet={() => closeCommentsSheet()}
        />}
        openCommentsSheet={() => openCommentsSheet()}
        closeCommentsSheet={() => closeCommentsSheet()}
      />
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
