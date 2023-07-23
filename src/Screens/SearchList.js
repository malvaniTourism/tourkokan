import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView } from "react-native";
import { ListItem } from "@rneui/themed";
import Header from "../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import RouteLine from "../Components/Customs/RouteLines/RouteLine";
import { connect } from "react-redux";
import { comnPost } from "../Services/Api/CommonServices";
import { setLoader } from "../Reducers/CommonActions";
import Loader from "../Components/Customs/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../Services/CommonMethods";
import GlobalText from "../Components/Customs/Text";
import RouteHeadCard from "../Components/Cards/RouteHeadCard";
import styles from "./Styles";

const SearchList = ({ navigation, route, ...props }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    searchRoute();
    return () => {
      backHandler.remove()
    }
  }, []);

  const getRoutes = (item) => {
    navigateTo(navigation, "RoutesList", { item });
  };

  const getRoutesList = (item) => {
    navigateTo(navigation, "RoutesList", { item });
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
          setList(res.data.data.data);
          console.log(list);
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
      <Header
        name={"Routes"}
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
      <SafeAreaView>
        {list.length > 0 ? (
          route.params && route.params.from === "Search" ? (
            <View style={styles.cardsWrap}>
              {list.map((route) => (
                <RouteHeadCard data={route} cardClick={() => getRoutesList(route)} />
              ))}
            </View>
          ) : (
            <FlatList
              keyExtractor={(item) => item.id}
              data={list}
              renderItem={({ item }) => (
                <RouteHeadCard data={item} cardClick={() => getRoutesList(item)} />
              )}
            />
          )
        ) : (
          <GlobalText text={"No Routes Available"} />
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
