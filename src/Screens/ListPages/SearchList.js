import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView } from "react-native";
import { ListItem } from "@rneui/themed";
import Header from "../../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import RouteLine from "../../Components/Customs/RouteLines/RouteLine";
import { connect } from "react-redux";
import { comnPost } from "../../Services/Api/CommonServices";
import { setLoader } from "../../Reducers/CommonActions";
import Loader from "../../Components/Customs/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";
import GlobalText from "../../Components/Customs/Text";
import RouteHeadCard from "../../Components/Cards/RouteHeadCard";
import styles from "../Styles";
import STRING from "../../Services/Constants/STRINGS";
import NetInfo from '@react-native-community/netinfo';
import CheckNet from "../../Components/Common/CheckNet";

const SearchList = ({ navigation, route, ...props }) => {
  const [list, setList] = useState([]);
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    // searchRoute();

    const unsubscribe = NetInfo.addEventListener(state => {
      setOffline(false)

      dataSync(STRING.STORAGE.ROUTES_RESPONSE, searchRoute())
        .then(resp => {
          let res = JSON.parse(resp)
          if (res.data && res.data.data) {
            setList(res.data.data.data);
          } else if (resp) {
            setOffline(true)
          }
          props.setLoader(false);
        })
      // removeFromStorage(STRING.STORAGE.LANDING_RESPONSE)
    });

    return () => {
      backHandler.remove()
      unsubscribe();
    }
  }, []);

  const getRoutes = (item) => {
    navigateTo(navigation, STRING.SCREEN.ROUTES_LIST, { item });
  };

  const getRoutesList = (item) => {
    navigateTo(navigation, STRING.SCREEN.ROUTES_LIST, { item });
  };

  const searchRoute = () => {
    props.setLoader(true);
    const data = {
      source_place_id: props.source.id,
      destination_place_id: props.destination.id,
    };
    comnPost("v1/routes", data)
      .then((res) => {
        if (res.data.success) {
          if (res && res.data.data)
            saveToStorage(STRING.STORAGE.ROUTES_RESPONSE, JSON.stringify(res))
          setList(res.data.data.data);
          props.setLoader(false);
        } else {
          props.setLoader(false);
        }
      })
      .catch((err) => {
        props.setLoader(false);
      });
  };

  const renderItem = ({ item }) => {
    return (
      // <ListItem bottomDivider onPress={() => getRoutes(item)}>
      //   {/* <Avatar source={{ uri: item.avatar_url }} /> */}
      //   <RouteLine />
      //   <GlobalText text={item.id} />
      //   <ListItem.Content>
      //     {/* <ListItem.Title>{item.number}</ListItem.Title> */}
      //     <ListItem.Title>{item.name}</ListItem.Title>
      //   </ListItem.Content>
      //   <ListItem.Chevron />
      // </ListItem>
      <View style={styles.sectionView}>
        {list.map((route, index) => (
          <View style={styles.cardsWrap}>
            <RouteHeadCard data={route} cardClick={() => getRoutesList(route)} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View>
      <CheckNet isOff={offline} />
      <Header
        name={STRING.HEADER.ROUTES}
        goBack={() => backPage(navigation)}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            color={COLOR.white}
            size={DIMENSIONS.userIconSize}
            onPress={() => backPage(navigation)}
          />
        }
      />
      <Loader />
      <SafeAreaView style={{ paddingBottom: 150 }}>
        {list.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.id}
            data={list}
            renderItem={({ item }) => (
              <RouteHeadCard data={item} cardClick={() => getRoutesList(item)} />
            )}
          />
        ) : (
          <GlobalText text={STRING.NO_ROUTES} />
        )}
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    source: state.commonState.source,
    destination: state.commonState.destination,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (data) => {
      dispatch(setLoader(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
