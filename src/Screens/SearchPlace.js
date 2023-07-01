import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import Header from "../Components/Common/Header";
import SearchBar from "../Components/Customs/Search";
import styles from "./Styles";
import { comnPost } from "../Services/Api/CommonServices";
import { ListItem } from "@rneui/themed";
import {
  setDestination,
  setLoader,
  setSource,
} from "../Reducers/CommonActions";
import Loader from "../Components/Customs/Loader";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkLogin, goBackHandler, navigateTo } from "../Services/CommonMethods";

const SearchPlace = ({ navigation, route, ...props }) => {
  const [searchValue, setSearchValue] = useState("");
  const [placesList, setPlacesList] = useState([]);

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    searchPlace("");
    return () => {
      backHandler.remove()
    }
  }, []);

  const searchPlace = (v) => {
    // props.setLoader(true)
    setSearchValue(v);
    let data = {
      search: v,
    };
    comnPost("v1/searchPlace", data)
      .then((res) => {
        if (res.data.success) {
          setPlacesList(res.data.data);
          props.setLoader(false);
        } else {
          props.setLoader(false);
        }
      })
      .catch((err) => {
        props.setLoader(false);
      });
  };

  const setPlace = (place) => {
    if (route.params.type == "Source") {
      props.setSource(place);
    } else {
      props.setDestination(place);
    }
    navigateTo(navigation, "Home");
    setSearchValue("");
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem bottomDivider onPress={() => setPlace(item)}>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View>
      <Loader />
      <Header
        Component={
          <SearchBar
            style={styles.homeSearchBar}
            placeholder={`Enter ${route.params.type}`}
            value={searchValue}
            onChangeText={(v) => searchPlace(v)}
          />
        }
      />

      <GestureHandlerRootView>
        <SafeAreaView>
          <FlatList
            keyExtractor={(item) => item.id}
            data={placesList}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </GestureHandlerRootView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    source: state.commonState.source,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSource: (data) => {
      dispatch(setSource(data));
    },
    setDestination: (data) => {
      dispatch(setDestination(data));
    },
    setLoader: (data) => {
      dispatch(setLoader(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlace);
