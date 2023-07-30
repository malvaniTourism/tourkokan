import React, { useEffect, useState } from "react";
import { FlatList, View, SafeAreaView } from "react-native";
import { ListItem } from "@rneui/themed";
import Header from "../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import RouteLine from "../Components/Customs/RouteLines/RouteLine";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../Services/CommonMethods";
import RouteLineFirst from "../Components/Customs/RouteLines/RouteLineFirst";
import RouteLineLast from "../Components/Customs/RouteLines/RouteLineLast";
import GlobalText from "../Components/Customs/Text";
import RouteHeadCard from "../Components/Cards/RouteHeadCard";
import { StyleSheet } from "react-native";
import { Text } from "react-native-svg";

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
      <ListItem bottomDivider style={{ paddingTop: isFirst ? 20 : 0 }}>
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
          <ListItem.Title>
            <GlobalText text={item.place.name} style={{ color: (isFirst || isLast) && COLOR.themeComicBlue }} />
            {/* <GlobalText text={item.dept_time} style={{ color: (isFirst || isLast) && COLOR.themeComicBlue }} />
            <GlobalText text={item.arr_time} style={{ color: (isFirst || isLast) && COLOR.themeComicBlue }} /> */}
            {/* {JSON.stringify({ item })} */}

          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View>
      <Header
        name={route.params.item.bus_type.type}
        goBack={() => backPage(navigation)}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            color={COLOR.white}
            size={DIMENSIONS.userIconSize}
            onPress={() => backPage(navigation)}
          />
        }
        endIcon={
          <></>
        }
      />
      <View style={{ marginVertical: -15 }}>
        <RouteHeadCard data={route.params.item} cardClick={() => console.log('clicked')} />
      </View>
      <SafeAreaView>
        <View style={styles1.flatListContainer}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={list}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    margin: 20,
    borderRadius: 10, // Apply the desired border radius
    borderWidth: 1, // Apply the desired border width
    borderColor: "#000", // Apply the desired border color
    overflow: "hidden", // This will clip the content inside the container with the border radius
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default RoutesList;
