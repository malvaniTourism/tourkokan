import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView } from "react-native";
import Header from "../../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { connect } from "react-redux";
import {
    comnPost,
    dataSync,
    saveToStorage,
} from "../../Services/Api/CommonServices";
import { setLoader } from "../../Reducers/CommonActions";
import Loader from "../../Components/Customs/Loader";
import {
    backPage,
    checkLogin,
    goBackHandler,
    navigateTo,
} from "../../Services/CommonMethods";
import GlobalText from "../../Components/Customs/Text";
import RouteHeadCard from "../../Components/Cards/RouteHeadCard";
import styles from "../Styles";
import NetInfo from "@react-native-community/netinfo";
import CheckNet from "../../Components/Common/CheckNet";
import RoutesSearchPanel from "../../Components/Common/RoutesSearchPanel";
import RoutesSearchPanelSkeleton from "../../Components/Common/RoutesSearchPanelSkeleton";
import RouteHeadCardSkeleton from "../../Components/Cards/RouteHeadCardSkeleton";
import { useTranslation } from "react-i18next";

const AllRoutesSearch = ({ navigation, route, ...props }) => {
    const { t } = useTranslation();

    const [list, setList] = useState([]);
    const [offline, setOffline] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [nextUrl, setNextUrl] = useState(1);
    const [source, setSource] = useState(route?.params?.source);
    const [destination, setDestination] = useState(route?.params?.destination);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        props.setLoader(true);
        const backHandler = goBackHandler(navigation);
        checkLogin(navigation);
        // searchRoute();

        const unsubscribe = NetInfo.addEventListener((state) => {
            setOffline(false);

            dataSync(t("STORAGE.ROUTES_RESPONSE"), searchRoute()).then(
                (resp) => {
                    let res = JSON.parse(resp);
                    if (res.data && res.data.data) {
                        setList(res.data.data.data);
                    } else if (resp) {
                        setOffline(true);
                    }
                    setIsLoading(false);
                    props.setLoader(false);
                }
            );
            // removeFromStorage(t("STORAGE.LANDING_RESPONSE"))
        });

        return () => {
            backHandler.remove();
            unsubscribe();
        };
    }, []);

    const getRoutesList = (item) => {
        navigateTo(navigation, t("SCREEN.ROUTES_LIST"), { item });
    };

    const searchRoute = (a, b, isNext) => {
        if (nextPage >= 1) {
            setIsLoading(true);
            props.setLoader(true);
            const data = {
                source_place_id: a || source?.id,
                destination_place_id: b || destination?.id,
            };
            comnPost(
                `v2/routes?page=${isNext ? nextPage : 1}`,
                data,
                navigation
            )
                .then((res) => {
                    if (res.data.success) {
                        if (res && res.data.data)
                            saveToStorage(
                                t("STORAGE.ROUTES_RESPONSE"),
                                JSON.stringify(res)
                            );
                        let myNextUrl = res.data.data.next_page_url;
                        setNextUrl(myNextUrl);
                        nextPage !== myNextUrl[myNextUrl.length - 1] && isNext
                            ? setList([...list, ...res.data.data.data])
                            : setList([...res.data.data.data]);
                        setNextPage(myNextUrl[myNextUrl.length - 1]);
                        setIsLoading(false);
                        setIsFirstTime(false);
                        props.setLoader(false);
                    } else {
                        setIsLoading(false);
                        setIsFirstTime(false);
                        props.setLoader(false);
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    setIsFirstTime(false);
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
                        <RouteHeadCard
                            data={route}
                            cardClick={() => getRoutesList(route)}
                        />
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={{ backgroundColor: COLOR.white }}>
            <CheckNet isOff={offline} />
            <Loader />
            <Header
                name={t("HEADER.ROUTES")}
                goBack={() => backPage(navigation)}
                startIcon={
                    <Ionicons
                        name="chevron-back-outline"
                        color={COLOR.black}
                        size={DIMENSIONS.userIconSize}
                        onPress={() => backPage(navigation)}
                    />
                }
            />
            {/* <Loader /> */}
            <View style={styles.routesSearchPanelView}>
                {isFirstTime && isLoading ? (
                    <RoutesSearchPanelSkeleton />
                ) : (
                    <RoutesSearchPanel
                        mySource={source}
                        myDestination={destination}
                        setSourceId={(v) => setSource(v)}
                        setDestinationId={(v) => setDestination(v)}
                        route={route}
                        navigation={navigation}
                        from={t("SCREEN.ALL_ROUTES_SEARCH")}
                        searchRoutes={(a, b) => searchRoute(a, b)}
                        onSwap={(a, b) => searchRoute(a, b)}
                    />
                )}
            </View>
            <SafeAreaView
                style={{
                    paddingBottom: 180,
                    minHeight: DIMENSIONS.screenHeight,
                }}
            >
                {isFirstTime && isLoading ? (
                    <>
                        <RouteHeadCardSkeleton />
                        <RouteHeadCardSkeleton />
                        <RouteHeadCardSkeleton />
                        <RouteHeadCardSkeleton />
                        <RouteHeadCardSkeleton />
                    </>
                ) : list.length > 0 ? (
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={list}
                        onEndReached={() =>
                            searchRoute(source, destination, true)
                        }
                        style={{ marginBottom: 40 }}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => (
                            <RouteHeadCard
                                data={item}
                                cardClick={() => getRoutesList(item)}
                                style={styles.routeHeadCard}
                            />
                        )}
                    />
                ) : (
                    <View style={{ alignItems: "center", padding: 50 }}>
                        <GlobalText
                            style={{ fontWeight: "bold" }}
                            text={offline ? t("NO_INTERNET") : t("NO_DATA")}
                        />
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (data) => {
            dispatch(setLoader(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRoutesSearch);
