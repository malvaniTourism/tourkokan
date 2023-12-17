import React, { useEffect, useState } from "react";
import { FlatList, View, SafeAreaView, ScrollView } from "react-native";
import { ListItem } from "@rneui/themed";
import Header from "../../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import RouteLine from "../../Components/Customs/RouteLines/RouteLine";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";
import RouteLineFirst from "../../Components/Customs/RouteLines/RouteLineFirst";
import RouteLineLast from "../../Components/Customs/RouteLines/RouteLineLast";
import GlobalText from "../../Components/Customs/Text";
import RouteHeadCard from "../../Components/Cards/RouteHeadCard";
import { StyleSheet } from "react-native";
import { Text } from "react-native-svg";
import styles from "./Styles";
import STRING from "../../Services/Constants/STRINGS";

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
            <View style={(isFirst || isLast) ? styles.listItem : styles.listItemMid}>
              <View>
                <GlobalText text={item.site.name} style={{ color: (isFirst || isLast) ? COLOR.themeComicBlue : COLOR.black }} />
              </View>
              <View>
                <GlobalText text={STRING.ETA + item.dept_time.slice(0, -3)} />
                <GlobalText text={STRING.ETD + item.arr_time.slice(0, -3)} />
              </View>
            </View>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Header
        name={STRING.HEADER.ROUTE}
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
        <RouteHeadCard data={route.params.item} cardClick={() => console.log("")} />
      </View>
      <SafeAreaView>
        <View style={styles.flatListContainer}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={list}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default RoutesList;
