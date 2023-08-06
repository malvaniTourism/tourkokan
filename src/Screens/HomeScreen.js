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
import { comnGet, comnPost, login } from "../Services/Api/CommonServices";
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
    const [bannerImages, setBannerImages] = useState([
        "https://c4.wallpaperflare.com/wallpaper/766/970/409/cities-city-building-cityscape-wallpaper-preview.jpg",
        "https://c4.wallpaperflare.com/wallpaper/631/683/713/nature-bridge-sky-city-wallpaper-preview.jpg",
        "https://c4.wallpaperflare.com/wallpaper/977/138/381/tbilisi-georgia-wallpaper-preview.jpg",
        "https://4kwallpapers.com/images/walls/thumbs_3t/912.jpg",
    ]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => exitApp());
        if (props.access_token) {
            if (!isLandingDataFetched && props.access_token) {
                callLandingPageAPI();
                setIsLandingDataFetched(true); // Mark the data as fetched
            }
        }
        LogBox.ignoreAllLogs();
        saveToken();
        SplashScreen.hide();

        return () => {
            backHandler.remove();
            AsyncStorage.setItem("isFirstTime", JSON.stringify(false))
        };
    }, [props.access_token]);

    const saveToken = async () => {
        props.saveAccess_token(await AsyncStorage.getItem("access_token"));
        if (
            (await AsyncStorage.getItem("access_token")) == null ||
            (await AsyncStorage.getItem("access_token")) == ""
        ) {
            navigateTo(navigation, "Login");
        }
    };

    const callLandingPageAPI = async () => {
        props.setLoader(true);
        let isFirstTime = await AsyncStorage.getItem("isFirstTime")
        comnGet("v1/landingpage", props.access_token)
            .then((res) => {
                setCategories(res.data.data.categories);
                setCities(res.data.data.cities);
                setProjects(res.data.data.projects);
                setStops(res.data.data.stops);
                setPlace_category(res.data.data.place_category);
                setPlaces(res.data.data.places);
                setRoutes(res.data.data.routes)
                setIsLoading(false)
                props.setLoader(false);

                if (isFirstTime == "true") {
                    refRBSheet.current.open()
                    AsyncStorage.setItem("isFirstTime", JSON.stringify(false))
                }
            })
            .catch((error) => {
                setIsLoading(false)
                props.setLoader(false);
                setError(error.message);
            });
    };

    const handleSmallCardClick = (page, id, name) => {
        navigateTo(navigation, page, { id, name });
    };

    const getRoutesList = (item) => {
        navigateTo(navigation, "RoutesList", { item });
    };

    const showMore = (page) => {
        navigateTo(navigation, page, { from: "Home" });
    }

    const onSearchFocus = () => {
        navigateTo(navigation, "CityPlaceSearch")
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
            {
                isLoading ?
                    <Loader />
                    :
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Banner bannerImages={bannerImages} />
                        {CityName.map((field, index) => {
                            return (
                                <SearchBar
                                    style={styles.homeSearchBar}
                                    placeholder={field.placeholder}
                                    value={searchValue}
                                    // onChangeText={(v) => searchPlace(v)}
                                    onFocus={onSearchFocus}
                                />
                            );
                        })}
                        <SearchPanel navigation={navigation} />

                        {/* <View style={styles.stopsSectionView}>
                            <GlobalText text={"Stops"} style={styles.sectionTitle} />
                            <View style={styles.cardsWrap}>
                                {stops.map((stop, index) => (
                                    <SmallCard
                                        style={styles.stopsCard}
                                        key={index}
                                        Icon={
                                            <Image
                                                source={{ uri: Path.API_PATH + stop.icon }}
                                                color={COLOR.yellow}
                                                size={DIMENSIONS.iconSize}
                                            />
                                        }
                                        title={stop.name}
                                        onPress={() => handleSmallCardClick("PlaceDetails", stop.id)}
                                    />
                                ))}
                            </View>
                            <View style={styles.flexRow}>
                                <CustomButton
                                    title={'Show More'}
                                    containerStyle={styles.showMore}
                                    seeMoreStyle={styles.seeMoreStyle}
                                    onPress={() => showMore('StopList')}
                                    buttonStyle={styles.buttonStyle}
                                />
                                <CustomButton
                                    title={'View on MAP'}
                                    containerStyle={styles.showMore}
                                    seeMoreStyle={styles.seeMoreStyle}
                                    onPress={() => showMore('MapScreen')}
                                    buttonStyle={styles.buttonStyle}
                                />
                            </View>
                        </View> */}

                        {/* <View style={styles.sectionView}>
                            <GlobalText text={"Categories"} style={styles.sectionTitle} />
                            <View style={styles.cardsWrap}>
                                {categories.map((category, index) => (
                                    <View>
                                        <CategoryCard data={category} getCategory={() => handleSmallCardClick("CategoryProjects", category.id, category.name)} />
                                        <GlobalText text={category.name} style={{ textAlign: 'center' }} />
                                    </View>
                                ))}
                            </View>
                        </View> */}

                        <View style={styles.sectionView}>
                            <GlobalText text={"Routes"} style={styles.sectionTitle} />
                            <View style={styles.cardsWrap}>
                                {routes.map((route, index) => (
                                    <RouteHeadCard data={route} cardClick={() => getRoutesList(route)} />
                                ))}
                            </View>
                            <CustomButton
                                title={'See More'}
                                onPress={() => showMore('SearchList')}
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
                            <GlobalText text={"Cities"} style={styles.sectionTitle} />
                            <View >
                                {cities.map((city, index) => (
                                    <CityCard data={city} reload={() => callLandingPageAPI()} navigation={navigation} />
                                    // onPress={() => handleSmallCardClick("CityDetails", city.id)}
                                ))}
                            </View>
                            <CustomButton
                                title={'See More'}
                                onPress={() => showMore('CityList')}
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

                        {/* <View style={styles.sectionView}>
                            <GlobalText text={"Projects"} style={styles.sectionTitle} />
                            <View style={styles.cardsWrap}>
                                {projects.map((project, index) => (
                                    <SmallCard
                                        key={index}
                                        Icon={
                                            <Image
                                                source={{ uri: Path.API_PATH + project.image_url }}
                                                color={COLOR.yellow}
                                                size={DIMENSIONS.iconSize}
                                            />
                                        }
                                        title={project.name}
                                        onPress={() => handleSmallCardClick("ProjectDetails", project.id)}
                                    />
                                ))}
                            </View>
                            <CustomButton
                                title={'Show More'}
                                containerStyle={styles.showMore}
                                seeMoreStyle={styles.seeMoreStyle}
                                onPress={() => showMore('ProjectList')}
                                buttonStyle={styles.buttonStyle}
                            />
                        </View> */}

                        {/* <TabView data={place_category} /> */}

                        {/* <View style={styles.sectionView}>
                            <GlobalText text={"Places"} style={styles.sectionTitle} />
                            <View style={styles.cardsWrap}>
                                {places.map((place, index) => (
                                    <SmallCard
                                        key={index}
                                        Icon={
                                            <Image
                                                source={{ uri: Path.API_PATH + place.icon }}
                                                color={COLOR.yellow}
                                                size={DIMENSIONS.iconSize}
                                            />
                                        }
                                        title={place.name}
                                        onPress={() => handleSmallCardClick("PlaceDetails", place.id)}
                                    />
                                ))}
                            </View>
                            <CustomButton
                                title={'Show More'}
                                containerStyle={styles.showMore}
                                seeMoreStyle={styles.seeMoreStyle}
                                onPress={() => showMore('Explore')}
                                buttonStyle={styles.buttonStyle}
                            />
                        </View> */}
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
