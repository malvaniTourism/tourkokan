import { useEffect, useState } from "react";
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
import Ionicons from "react-native-vector-icons/Ionicons";
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

const HomeScreen = ({ navigation, ...props }) => {
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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => exitApp());
        if (props.access_token) {
            callLandingPageAPI();
        }
        LogBox.ignoreAllLogs();
        saveToken();
        SplashScreen.hide();
        return () => {
            backHandler.remove();
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

    const callLandingPageAPI = () => {
        props.setLoader(true);
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
        console.log('list - ', item);
        navigateTo(navigation, "RoutesList", { item });
    };

    const showMore = (page) => {
        console.log('page - - ', page);
        navigateTo(navigation, page);
    }

    const onSearchFocus = () => {
        navigateTo(navigation, "CityPlaceSearch")
    }

    return (
        <ScrollView>
            {
                isLoading ?
                    <Loader />
                    :
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TopComponent navigation={navigation} />
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

                        <View style={styles.stopsSectionView}>
                            <Text style={styles.sectionTitle}>Stops</Text>
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
                                        onPress={() => handleSmallCardClick("StopDetails", stop.id)}
                                    />
                                ))}
                            </View>
                            <View style={styles.flexRow}>
                                <CustomButton
                                    title={'Show More'}
                                    containerStyle={styles.showMore}
                                    onPress={() => showMore('StopList')}
                                    buttonStyle={styles.buttonStyle}
                                />
                                <CustomButton
                                    title={'View on MAP'}
                                    containerStyle={styles.showMore}
                                    onPress={() => showMore('MapScreen')}
                                    buttonStyle={styles.buttonStyle}
                                />
                            </View>
                        </View>

                        <View style={styles.sectionView}>
                            <Text style={styles.sectionTitle}>Categories</Text>
                            <View style={styles.cardsWrap}>
                                {categories.map((category, index) => (
                                    <SmallCard
                                        key={index}
                                        Icon={
                                            <Image
                                                source={{ uri: Path.API_PATH + category.image_url }}
                                                color={COLOR.yellow}
                                                size={DIMENSIONS.iconSize}
                                            />
                                        }
                                        title={category.name}
                                        onPress={() => handleSmallCardClick("CategoryProjects", category.id, category.name)}
                                    />
                                ))}
                            </View>
                        </View>

                        <View style={styles.stopsSectionView}>
                            <Text style={styles.sectionTitle}>Routes</Text>
                            <View style={styles.cardsWrap}>
                                {routes.map((route, index) => (
                                    <SmallCard
                                        style={styles.routesCard}
                                        key={index}
                                        Icon={
                                            <Image
                                                source={{ uri: Path.API_PATH + route.icon }}
                                                color={COLOR.yellow}
                                                size={DIMENSIONS.iconSize}
                                            />
                                        }
                                        title={route.name}
                                        onPress={() => getRoutesList(route)}
                                    />
                                ))}
                            </View>
                            <CustomButton
                                title={'Show More'}
                                containerStyle={styles.showMore}
                                onPress={() => showMore('SearchList')}
                                buttonStyle={styles.buttonStyle}
                            />
                        </View>

                        <View style={styles.sectionView}>
                            <Text style={styles.sectionTitle}>Cities</Text>
                            <View style={styles.cardsWrap}>
                                {cities.map((city, index) => (
                                    <SmallCard
                                        key={index}
                                        Icon={
                                            <Image
                                                source={{ uri: Path.API_PATH + city.image_url }}
                                                color={COLOR.yellow}
                                                size={DIMENSIONS.iconSize}
                                            />
                                        }
                                        title={city.name}
                                        onPress={() => handleSmallCardClick("CityDetails", city.id)}
                                    />
                                ))}
                            </View>
                            <CustomButton
                                title={'Show More'}
                                containerStyle={styles.showMore}
                                onPress={() => showMore('CityList')}
                                buttonStyle={styles.buttonStyle}
                            />
                        </View>

                        <View style={styles.sectionView}>
                            <Text style={styles.sectionTitle}>Projects</Text>
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
                                onPress={() => showMore('ProjectList')}
                                buttonStyle={styles.buttonStyle}
                            />
                        </View>

                        <TabView data={place_category} />

                        <View style={styles.sectionView}>
                            <Text style={styles.sectionTitle}>Places</Text>
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
                                onPress={() => showMore('PlaceList')}
                                buttonStyle={styles.buttonStyle}
                            />
                        </View>
                    </View>
            }
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
