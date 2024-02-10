import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView } from "react-native";
import { ListItem } from "@rneui/themed";
import Header from "../../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import RouteLine from "../../Components/Customs/RouteLines/RouteLine";
import { connect } from "react-redux";
import { comnPost, dataSync, saveToStorage } from "../../Services/Api/CommonServices";
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
import SearchPanel from "../../Components/Common/SearchPanel";
import RoutesSearchPanel from "../../Components/Common/RoutesSearchPanel";

const AllRoutesSearch = ({ navigation, route, ...props }) => {
  const [list, setList] = useState([]);
  const [offline, setOffline] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(1)
  const [source, setSource] = useState();
  const [destination, setDestination] = useState()

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

  const searchRoute = (a, b, isNext) => {
    if (nextPage >= 1) {
      props.setLoader(true);
      const data = {
        source_place_id: a || source,
        destination_place_id: b || destination,
      };
      console.log('data:: ', data);
      comnPost(`v2/routes?page=${isNext ? nextPage : 1}`, data)
        .then((res) => {
          if (res.data.success) {
            if (res && res.data.data)
              saveToStorage(STRING.STORAGE.ROUTES_RESPONSE, JSON.stringify(res))
            let myNextUrl = res.data.data.next_page_url
            console.log('myNextUrl:: ', myNextUrl);
            setNextUrl(myNextUrl)
            isNext ?
              setList([...list, ...res.data.data.data])
              :
              setList([...res.data.data.data])
            setNextPage(myNextUrl[myNextUrl.length - 1])
            props.setLoader(false);
          } else {
            props.setLoader(false);
          }
        })
        .catch((err) => {
          props.setLoader(false);
        });
    }
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
      <View style={styles.routesSearchPanelView}>
        <RoutesSearchPanel source={source} destination={destination} setSourceId={(v) => setSource(v)} setDestinationId={(v) => setDestination(v)} route={route} navigation={navigation} from={STRING.SCREEN.ALL_ROUTES_SEARCH} searchRoutes={() => searchRoute()} onSwap={(a, b) => searchRoute(a, b)} />
      </View>
      <SafeAreaView style={{ paddingBottom: 150, position: "relative", marginTop: 150 }}>
        {list.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.id}
            data={list}
            onEndReached={() => searchRoute("", "", true)}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <RouteHeadCard data={item} cardClick={() => getRoutesList(item)} style={styles.routeHeadCard} />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (data) => {
      dispatch(setLoader(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRoutesSearch);
