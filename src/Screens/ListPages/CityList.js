import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity, FlatList } from "react-native";
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
import { useTranslation } from "react-i18next";

const CityList = ({ navigation, route, ...props }) => {
  const { t } = useTranslation();
  const refRBSheet = useRef();

  const [cities, setCities] = useState([]); // State to store cities
  const [error, setError] = useState(null); // State to store error message
  const [isLandingDataFetched, setIsLandingDataFetched] = useState(false);
  const [offline, setOffline] = useState(false);
  const [page, setPage] = useState(1)

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);

    if (props.access_token) {
      if (!isLandingDataFetched && props.access_token) {
        // getCities()
        setIsLandingDataFetched(true); // Mark the data as fetched
      }
      props.setLoader(false);
    }

    const unsubscribe = NetInfo.addEventListener(state => {
      setOffline(false)

      dataSync(t("STORAGE.CITIES_RESPONSE"), getCities())
        .then(resp => {
          let res = JSON.parse(resp)
          if (res.data && res.data.data) {
            setCities(res.data.data.data);
          } else if (resp) {
            setOffline(true)
          }
          props.setLoader(false);
        })
      // removeFromStorage(t("STORAGE.LANDING_RESPONSE"))
    });

    return () => {
      backHandler.remove()
      unsubscribe();
    }
  }, []);

  const getCities = () => {
    props.setLoader(true);
    let data = {
      apitype: "list",
      parent_id: route?.params?.parent_id,
      category: route?.params?.subCat?.code || "other"
    };
    comnPost(`v2/sites?page=${page}`, data, navigation)
      .then((res) => {
        if (res && res.data.data)
          saveToStorage(t("STORAGE.CITIES_RESPONSE"), JSON.stringify(res))
        setCities([...cities, res.data.data.data]); // Update cities state with response data
        let nextUrl = res.data.data.next_page_url
        setPage(nextUrl[nextUrl.length - 1])
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
        setError(error.message); // Update error state with error message
      });
  }

  const getCityDetails = (id) => {
    navigateTo(navigation, t("SCREEN.CITY_DETAILS"), { id })
  }

  const renderItem = ({ item }) => (
    <CityCard data={item} navigation={navigation} reload={() => getCities()} onClick={() => getCityDetails(item.id)} />
  );

  return (
    <View style={{ backgroundColor: COLOR.white }}>
      <CheckNet isOff={offline} />
      <Loader />
      <Header name={route?.params?.subCat?.name || t("HEADER.CITIES")}
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
        cities[0] ?
          <View style={{ alignItems: "center", marginBottom: 150 }}>
            <FlatList
              data={cities[0]}
              numColumns={1}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={renderItem}
              onEndReached={() => getCities()}
              onEndReachedThreshold={0.5}
            />
          </View>
          :
          <View style={{ height: DIMENSIONS.screenHeight }}>
            <GlobalText text={t("NO_DATA")} />
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
