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

const Pricing = ({ navigation, route }) => {
  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    return () => {
      backHandler.remove()
    }
  }, []);

  const showTiming = () => {
    navigateTo(navigation, "BusTimings");
  };

  return (
    <View>
      <Header
        name="Pricing"
        goBack={() => backPage(navigation)}
        startIcon={
          <Ionicons
            name="bus"
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
      <SafeAreaView>
        {/* <FlatList
          keyExtractor={(item) => item.id}
          data={list}
          renderItem={renderItem}
        /> */}
      </SafeAreaView>
    </View>
  );
};

export default Pricing;
