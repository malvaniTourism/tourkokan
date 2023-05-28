import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView } from "react-native";
import { ListItem } from "@rneui/themed";
import Header from "../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import RouteLine from "../Components/Customs/RouteLine";

const RoutesList = ({ navigation, route }) => {
  const [list, setList] = useState(route.params.item.route_stops);

  useEffect(() => {
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ListItem bottomDivider>
        {/* <Avatar source={{ uri: item.avatar_url }} /> */}
        <RouteLine />
        <ListItem.Content>
          <ListItem.Title>{item.place.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  const showTiming = () => {
    navigation.navigate("BusTimings");
  };

  return (
    <View>
      <Header
        name={route.params.item.name}
        goBack={goBack}
        startIcon={
          <Ionicons
            name="bus"
            color={COLOR.black}
            size={DIMENSIONS.userIconSize}
            onPress={() => goBack()}
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
