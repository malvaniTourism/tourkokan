import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView } from "react-native";
import { ListItem } from "@rneui/themed";
import Header from "../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import RouteLine from "../Components/Customs/RouteLines/RouteLine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../Services/CommonMethods";
import RouteLineFirst from "../Components/Customs/RouteLines/RouteLineFirst";
import RouteLineLast from "../Components/Customs/RouteLines/RouteLineLast";
import GlobalText from "../Components/Customs/Text";
import RouteHeadCard from "../Components/Cards/RouteHeadCard";

const RoutesList = ({ navigation, route }) => {
  const [list, setList] = useState(route.params.item.route_stops);

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    return () => {
      backHandler.remove()
    }
  }, []);

  const renderItem = ({ item, index }) => {
    let isFirst = index === 0;
    let isLast = index === list.length - 1;

    return (
      <ListItem bottomDivider style={{paddingTop: isFirst ? 20 : 0}}>
        {
          isFirst ?
            <RouteLineFirst />
            :
            isLast ?
              <RouteLineLast />
              :
              <RouteLine />
        }
        <ListItem.Content>
          <ListItem.Title><GlobalText text={item.place.name} style={{color: (isFirst || isLast) && COLOR.themeComicBlue}} /></ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  const showTiming = () => {
    navigateTo(navigation, "BusTimings");
  };

  return (
    <View>
      <Header
        name={""}
        goBack={() => backPage(navigation)}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            color={COLOR.black}
            size={DIMENSIONS.userIconSize}
            onPress={() => backPage(navigation)}
          />
        }
        endIcon={
          <Feather
            name="clock"
            color={COLOR.black}
            size={DIMENSIONS.userIconSize}
            onPress={() => showTiming()}
          />
        }
      />
      <RouteHeadCard data={route.params.item} />
      <SafeAreaView>
        <FlatList
          keyExtractor={(item) => item.id}
          data={list}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};

export default RoutesList;
