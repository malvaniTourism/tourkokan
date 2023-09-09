import { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, LogBox, Image, BackHandler, SafeAreaView, FlatList } from "react-native";
import { ListItem } from "@rneui/themed";
import SearchPanel from "../Components/Common/SearchPanel";
import TopComponent from "../Components/Common/TopComponent";
import Banner from "../Components/Customs/Banner";
import SearchBar from "../Components/Customs/Search";
import SmallCard from "../Components/Customs/SmallCard";
import { CityName } from "../Services/Constants/FIELDS";
import styles from "./Styles";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import Feather from "react-native-vector-icons/Feather";
import { comnGet, comnPost, dataSync, login, removeFromStorage, saveToStorage } from "../Services/Api/CommonServices";
import { connect } from "react-redux";
import { saveAccess_token, setLoader } from "../Reducers/CommonActions";
import Loader from "../Components/Customs/Loader";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Path from "../Services/Api/BaseUrl";
import CustomButton from "../Components/Customs/Button";
import { exitApp, navigateTo } from "../Services/CommonMethods";
import TabView from "../Components/Common/TabView";
import CityCard from "../Components/Cards/CityCard";
import CategoryCard from "../Components/Cards/CategoryCard";
import GlobalText from "../Components/Customs/Text";
import BottomSheet from "../Components/Customs/BottomSheet";
import LocationSheet from "../Components/Common/LocationSheet";
import RouteHeadCard from "../Components/Cards/RouteHeadCard";
import STRING from "../Services/Constants/STRINGS";
import CheckNet from "../Components/Common/CheckNet";
import NetInfo from '@react-native-community/netinfo';
import MyAnimatedLoader from "../Components/Customs/AnimatedLoader";

const HomeScreen = ({ navigation, ...props }) => {
    const refRBSheet = useRef();

    const [searchValue, setSearchValue] = useState("");
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [projects, setProjects] = useState([]);
    const [stops, setStops] = useState([]);
    const [place_category, setPlace_category] = useState([]);
    const [places, setPlaces] = useState([]);
    const [routes, setRoutes] = useState([])
    const [error, setError] = useState(null);
    const [cityList, setCityList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLandingDataFetched, setIsLandingDataFetched] = useState(false);
    const [offline, setOffline] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [bannerImages, setBannerImages] = useState([
        "https://c4.wallpaperflare.com/wallpaper/766/970/409/cities-city-building-cityscape-wallpaper-preview.jpg",
        "https://c4.wallpaperflare.com/wallpaper/631/683/713/nature-bridge-sky-city-wallpaper-preview.jpg",
        "https://c4.wallpaperflare.com/wallpaper/977/138/381/tbilisi-georgia-wallpaper-preview.jpg",
        "https://4kwallpapers.com/images/walls/thumbs_3t/912.jpg",
    ]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(STRING.EVENT.HARDWARE_BACK_PRESS, () => exitApp());
        if (props.access_token) {
            if (!isLandingDataFetched && props.access_token) {
                // callLandingPageAPI();
                setIsLandingDataFetched(true);
                getUserProfile();
            }
        }
        LogBox.ignoreAllLogs();
        saveToken();
        SplashScreen.hide();
        const unsubscribe = NetInfo.addEventListener(state => {
            setOffline(false)

            dataSync(STRING.STORAGE.LANDING_RESPONSE, callLandingPageAPI())
                .then(resp => {
                    let res = JSON.parse(resp)
                    if (res.data && res.data.data) {
                        setCities(res.data.data.cities);
                        setRoutes(res.data.data.routes)
                        setIsFetching(false)
                        setIsLoading(false)
                        // setCategories(res.data.data.categories);
                        // setProjects(res.data.data.projects);
                        // setStops(res.data.data.stops);
                        // setPlace_category(res.data.data.place_category);
                        // setPlaces(res.data.data.places);
                    } else if (resp) {
                        setOffline(true)
                        setIsFetching(false)
                        setIsLoading(false)
                    }
                    props.setLoader(false);
                })
            // removeFromStorage(STRING.STORAGE.LANDING_RESPONSE)
        });


        return () => {
            backHandler.remove();
            AsyncStorage.setItem(STRING.STORAGE.IS_FIRST_TIME, JSON.stringify(false))
            unsubscribe();
        };
    }, [props.access_token]);

    const saveToken = async () => {
        props.saveAccess_token(await AsyncStorage.getItem(STRING.STORAGE.ACCESS_TOKEN));
        if (
            (await AsyncStorage.getItem(STRING.STORAGE.ACCESS_TOKEN)) == null ||
            (await AsyncStorage.getItem(STRING.STORAGE.ACCESS_TOKEN)) == ""
        ) {
            navigateTo(navigation, STRING.SCREEN.LOGIN);
        }
    };

    const callLandingPageAPI = async () => {
        props.setLoader(true);
        let isFirstTime = await AsyncStorage.getItem(STRING.STORAGE.IS_FIRST_TIME)
        comnGet("v1/landingpage", props.access_token)
            .then((res) => {
                if (res && res.data.data)
                    saveToStorage(STRING.STORAGE.LANDING_RESPONSE, JSON.stringify(res))
                setCities(res.data.data.cities);
                setRoutes(res.data.data.routes)
                setIsFetching(false)
                setIsLoading(false)
                props.setLoader(false);
                // setCategories(res.data.data.categories);
                // setProjects(res.data.data.projects);
                // setStops(res.data.data.stops);
                // setPlace_category(res.data.data.place_category);
                // setPlaces(res.data.data.places);

                if (isFirstTime == "true") {
                    refRBSheet.current.open()
                    AsyncStorage.setItem(STRING.STORAGE.IS_FIRST_TIME, JSON.stringify(false))
                }
            })
            .catch((error) => {
                setIsFetching(false);
                setIsLoading(false);
                props.setLoader(false);
                setError(error.message);
            });
    };

    const getUserProfile = () => {
        comnGet("v1/user-profile", props.access_token)
            .then((res) => {
                props.setLoader(false);
                AsyncStorage.setItem(STRING.STORAGE.USER_NAME, res.data.data.name)
                AsyncStorage.setItem(STRING.STORAGE.USER_ID, JSON.stringify(res.data.data.id))
            })
            .catch((error) => {
                setError(error.message);
                props.setLoader(false);
            });
    }

    const getRoutesList = (item) => {
        navigateTo(navigation, STRING.SCREEN.ROUTES_LIST, { item });
    };

    const showMore = (page) => {
        navigateTo(navigation, page, { from: STRING.SCREEN.HOME });
    }

    const onSearchFocus = () => {
        navigateTo(navigation, STRING.SCREEN.CITY_PLACE_SEARCH)
    }

    const openLocationSheet = () => {
        refRBSheet.current.open()
    }

    const closeLocationSheet = () => {
        refRBSheet.current.close()
    }

    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <TopComponent navigation={navigation} openLocationSheet={() => openLocationSheet()} />
            <CheckNet isOff={offline} />
            <MyAnimatedLoader isVisible={isLoading} />
            {
                isLoading ?
                    // <Loader />
                    <></>
                    :
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Banner bannerImages={bannerImages} />
                        {CityName.map((field, index) => {
                            return (
                                <SearchBar
                                    style={styles.homeSearchBar}
                                    placeholder={field.placeholder}
                                    value={searchValue}
                                    onFocus={onSearchFocus}
                                />
                            );
                        })}
                        <SearchPanel navigation={navigation} />

                        <View style={styles.sectionView}>
                            <GlobalText text={STRING.SCREEN.ROUTES} style={styles.sectionTitle} />
                            <View style={styles.cardsWrap}>
                                {routes.map((route, index) => (
                                    <RouteHeadCard data={route} cardClick={() => getRoutesList(route)} />
                                ))}
                            </View>
                            <CustomButton
                                title={STRING.BUTTON.SEE_MORE}
                                onPress={() => showMore(STRING.SCREEN.SEARCH_LIST)}
                                containerStyle={styles.showMore}
                                seeMoreStyle={styles.seeMoreStyle}
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                endIcon={
                                    <Feather
                                        name="chevrons-right"
                                        size={24}
                                        color={COLOR.themeComicBlue}
                                    />
                                }
                            />
                        </View>

                        <View style={styles.sectionView}>
                            <GlobalText text={STRING.SCREEN.CITIES} style={styles.sectionTitle} />
                            <View >
                                {cities.map((city, index) => (
                                    <CityCard
                                        data={city}
                                        reload={() => {
                                            callLandingPageAPI()
                                        }}
                                        navigation={navigation} />
                                ))}
                            </View>
                            <CustomButton
                                title={STRING.BUTTON.SEE_MORE}
                                onPress={() => showMore(STRING.SCREEN.CITY_LIST)}
                                containerStyle={styles.showMore}
                                seeMoreStyle={styles.seeMoreStyle}
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                endIcon={
                                    <Feather
                                        name="chevrons-right"
                                        size={24}
                                        color={COLOR.themeComicBlue}
                                    />
                                }
                            />
                        </View>
                    </View>
            }
            <BottomSheet
                refRBSheet={refRBSheet}
                height={300}
                Component={<LocationSheet
                    openLocationSheet={() => openLocationSheet()}
                    closeLocationSheet={() => closeLocationSheet()}
                />}
                openLocationSheet={() => openLocationSheet()}
                closeLocationSheet={() => closeLocationSheet()}
            />
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return {
        access_token: state.commonState.access_token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveAccess_token: (data) => {
            dispatch(saveAccess_token(data));
        },
        setLoader: (data) => {
            dispatch(setLoader(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
