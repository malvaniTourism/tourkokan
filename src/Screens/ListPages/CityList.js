import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import {
    comnPost,
    dataSync,
    saveToStorage,
} from "../../Services/Api/CommonServices";
import { connect } from "react-redux";
import Loader from "../../Components/Customs/Loader";
import Header from "../../Components/Common/Header";
import { setLoader } from "../../Reducers/CommonActions";
import {
    backPage,
    checkLogin,
    goBackHandler,
    navigateTo,
} from "../../Services/CommonMethods";
import CityCard from "../../Components/Cards/CityCard";
import NetInfo from "@react-native-community/netinfo";
import CheckNet from "../../Components/Common/CheckNet";
import GlobalText from "../../Components/Customs/Text";
import { useTranslation } from "react-i18next";
import styles from "./Styles";

const CityList = ({ navigation, route, ...props }) => {
    const { t } = useTranslation();
    const refRBSheet = useRef();

    const [cities, setCities] = useState([]); // State to store cities
    const [error, setError] = useState(null); // State to store error message
    const [isLandingDataFetched, setIsLandingDataFetched] = useState(false);
    const [offline, setOffline] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [lastPage, setLastPage] = useState(null);

    useEffect(() => {
        const backHandler = goBackHandler(navigation);
        checkLogin(navigation);
        props.setLoader(true);

        const unsubscribe = NetInfo.addEventListener((state) => {
            setOffline(!state.isConnected);
            if (state.isConnected) {
                fetchCities(1, true);
            }
        });

        return () => {
            backHandler.remove();
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        fetchCities(1, true);
    }, [route.params]);

    const fetchCities = (page, reset = false) => {
        setLoading(true);
        let data = {
            apitype: "list",
            parent_id: route?.params?.parent_id,
            category: route?.params?.subCat?.code || "other",
            per_page: 20,
            page: page,
        };
        comnPost(`v2/sites`, data, navigation)
            .then((res) => {
                if (res && res.data.data) {
                    if (reset) {
                        setCities(res.data.data.data);
                    } else {
                        setCities((prevCities) => [...prevCities, ...res.data.data.data]);
                    }
                    setNextPage(res.data.data.current_page + 1);
                    setLastPage(res.data.data.last_page);
                    saveToStorage(
                        t("STORAGE.CITIES_RESPONSE"),
                        JSON.stringify(res)
                    );
                }
                setLoading(false);
                props.setLoader(false);
            })
            .catch((error) => {
                setLoading(false);
                props.setLoader(false);
                setError(error.message); // Update error state with error message
            });
    };
    

    const getCityDetails = (id) => {
        navigateTo(navigation, t("SCREEN.CITY_DETAILS"), { id });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            // onPress={() => getCityDetails(item.id)}
            style={styles.cityListView}
        >
            <GlobalText style={styles.cityListName} text={item.name} />
        </TouchableOpacity>
    );

    const loadMoreCities = () => {
        if (!loading && nextPage <= lastPage) {
            fetchCities(nextPage);
        }
    };
    
    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="small" color={COLOR.primary} />
            </View>
        );
    };
    

    return (
        <View style={{ backgroundColor: COLOR.white }}>
            <CheckNet isOff={offline} />
            <Loader />
            <Header
                name={route?.params?.subCat?.name || t("HEADER.CITIES")}
                startIcon={
                    <Ionicons
                        name="chevron-back-outline"
                        color={COLOR.black}
                        size={DIMENSIONS.userIconSize}
                        onPress={() => backPage(navigation)}
                    />
                }
            />
            {cities.length > 0 ? (
                <View style={{ alignItems: "center", marginBottom: 150 }}>
                    <FlatList
                        data={cities}
                        numColumns={1}
                        keyExtractor={(item) => item.id?.toString()}
                        renderItem={renderItem}
                        onEndReached={loadMoreCities}
                        onEndReachedThreshold={0.5}
                        // ListFooterComponent={loading ? <Loader /> : null}
                        ListFooterComponent={renderFooter}

                    />
                </View>
            ) : (
                <View style={{ height: DIMENSIONS.screenHeight, justifyContent: "center", alignItems: "center" }}>
                    <GlobalText text={t("NO_DATA")} />
                </View>
            )}
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        access_token: state.commonState.access_token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (data) => {
            dispatch(setLoader(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
