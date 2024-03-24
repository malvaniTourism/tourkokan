import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import SmallCard from "../../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { comnGet, comnPost, dataSync, saveToStorage } from "../../Services/Api/CommonServices";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook from your navigation library
import Loader from "../../Components/Customs/Loader";
import Header from "../../Components/Common/Header";
import { setLoader } from "../../Reducers/CommonActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";
import styles from "./Styles";
import CityCard from "../../Components/Cards/CityCard";
import STRING from "../../Services/Constants/STRINGS";
import NetInfo from "@react-native-community/netinfo";
import CheckNet from "../../Components/Common/CheckNet";
import BottomSheet from "../../Components/Customs/BottomSheet";
import GlobalText from "../../Components/Customs/Text";
import CityCardSkeleton from "../../Components/Cards/CityCardSkeleton";

const CityList = ({ navigation, route, ...props }) => {
  const refRBSheet = useRef();
  const [cities, setCities] = useState([]); // State to store cities
  const [error, setError] = useState(null); // State to store error message
  const [isLandingDataFetched, setIsLandingDataFetched] = useState(false);
  const [offline, setOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    setIsLoading(true);

    if (props.access_token) {
      if (!isLandingDataFetched && props.access_token) {
        // getCities()
        setIsLandingDataFetched(true); // Mark the data as fetched
      }
      setIsLoading(false);
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
          setIsLoading(false);
        })
      // removeFromStorage(STRING.STORAGE.LANDING_RESPONSE)
    });

    return () => {
      backHandler.remove()
      unsubscribe();
    }
  }, []);

  const getCities = () => {
    setIsLoading(true);
    let data = {
      apitype: "list",
      parent_id: route?.params?.parent_id,
      category: route?.params?.subCat || "other"
    };
    comnPost("v2/sites", data, navigation)
      .then((res) => {
        if (res && res.data.data)
          saveToStorage(STRING.STORAGE.CITIES_RESPONSE, JSON.stringify(res))
        setCities(res.data.data.data); // Update cities state with response data
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message); // Update error state with error message
      });
  }

  const getCityDetails = (id) => {
    navigateTo(navigation, STRING.SCREEN.CITY_DETAILS, { id })
  }

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <CheckNet isOff={offline} />
      <Header name={route?.params?.subCat || STRING.HEADER.CITIES}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            color={COLOR.black}
            size={DIMENSIONS.userIconSize}
            onPress={() => backPage(navigation)}
          />
        }
      />
      {
        isLoading ?
          <View style={{ alignItems: "center" }}>
            <CityCardSkeleton type={STRING.TABLE.PLACE} />
            <CityCardSkeleton type={STRING.TABLE.PLACE} />
            <CityCardSkeleton type={STRING.TABLE.PLACE} />
          </View>
          :
          cities[0] ?
            <View style={{ flex: 1, alignItems: "center" }}>
              {cities.map((city) => (
                <CityCard data={city} navigation={navigation} reload={() => getCities()} onClick={() => getCityDetails(city.id)} />
              ))}
            </View>
            :
            <View>
              <GlobalText text={STRING.NO_DATA} />
            </View>
      }
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
