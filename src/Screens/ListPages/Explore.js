import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Switch, SafeAreaView } from "react-native";
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
import { FlatList } from "react-native-gesture-handler";

const Explore = ({ navigation, ...props }) => {
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);
    getPlaces()
    getCities()
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

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled)
  }

  const handleSmallCardClick = (id) => {
    navigateTo(navigation, "PlaceDetails", { id }); // Replace 'CityScreen' with the name of your CityScreen component in your navigation stack
  };

  return (
    <View style={{ flex: (cities[0] || places[0]) ? 1 : 0 }}>
      <Loader />
      <Header name={'Explore'}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            color={COLOR.black}
            size={DIMENSIONS.userIconSize}
            onPress={() => backPage(navigation)}
          />
        }
      />
      <View style={styles.toggleView}>
        <Switch
          trackColor={{ false: '#767577', true: '#f5dd4b' }}
          thumbColor={COLOR.themeComicBlue}
          // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {isEnabled ?
        <SafeAreaView style={{alignItems: "center"}}>
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
        :
        <ScrollView>
          {cities.map((city) => (
            <CityCard data={city} navigation={navigation} />
          ))}
        </ScrollView>
      }
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
