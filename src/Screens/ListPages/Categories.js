import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity, Switch, SafeAreaView, ImageBackground, FlatList } from "react-native";
import SmallCard from "../../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { comnGet, comnPost, dataSync, saveToStorage } from "../../Services/Api/CommonServices";
import { connect } from "react-redux";
import { setLoader } from "../../Reducers/CommonActions";
import Loader from "../../Components/Customs/Loader";
import styles from "../Styles";
import Header from "../../Components/Common/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";
import PlaceCard from "../../Components/Cards/PlaceCard";
import CityCard from "../../Components/Cards/CityCard";
import GlobalText from "../../Components/Customs/Text";
import STRING from "../../Services/Constants/STRINGS";
import NetInfo from "@react-native-community/netinfo";
import CheckNet from "../../Components/Common/CheckNet";
import ImageButton from "../../Components/Customs/Buttons/ImageButton";
import SubCatCard from "../../Components/Cards/SubCatCard";
import ImageButtonSkeleton from "../../Components/Customs/Buttons/ImageButtonSkeleton";

const Categories = ({ route, navigation, ...props }) => {
    const refRBSheet = useRef();

    const [places, setPlaces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isEnabled, setIsEnabled] = useState(route.name == STRING.SCREEN.CATEGORIES)
    const [isLandingDataFetched, setIsLandingDataFetched] = useState(false);
    const [nextPage, setNextPage] = useState(1)
    const [offline, setOffline] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const backHandler = goBackHandler(navigation)
        checkLogin(navigation)
        setIsLoading(true);

        const unsubscribe = NetInfo.addEventListener(state => {
            setOffline(false)

            dataSync(STRING.STORAGE.CATEGORIES_RESPONSE, getCategories())
                .then(resp => {
                    let res = JSON.parse(resp)
                    if (res.data && res.data.data) {
                        setCategories(res.data.data.data);
                    } else if (resp) {
                        setOffline(true)
                    }
                })
        });

        return () => {
            backHandler.remove()
            unsubscribe();
        }
    }, []);

    const getCategories = (selectedCategory) => {
        setIsLoading(true)
        let data = {
            parent_list: "1",
            // parent_id: 1,
            per_page: "2"
        };
        comnPost("v2/listcategories", data, navigation)
            .then((res) => {
                if (res && res.data.data)
                    saveToStorage(STRING.STORAGE.CATEGORIES_RESPONSE, JSON.stringify(res))
                setCategories(res.data.data.data);
                setSelectedCategory(selectedCategory || res.data.data.data[0].name)
                setSelectedSubCategory(selectedCategory ? categories.find((item) => item.name === selectedCategory).sub_categories : res.data.data.data[0].sub_categories)
                // setSelectedSubCategory(res.data.data.data[0].sub_categories)
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }

    const handleCategoryPress = (category) => {
        setSelectedCategory(category.name);
        getCategories(category.name)
    };

    const renderItem = ({ item }) => {
        return (
            <SubCatCard data={item} onClick={() => goToSubCats(item.name)} />
        )
    }

    const goToSubCats = (subCat) => {
        navigateTo(navigation, STRING.SCREEN.CITY_LIST, { subCat })
    }

    return (
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <Loader />
            <CheckNet isOff={offline} />
            <Header name={""}
                startIcon={
                    <Ionicons
                        name="chevron-back-outline"
                        color={COLOR.white}
                        size={DIMENSIONS.userIconSize}
                        onPress={() => backPage(navigation)}
                    />
                }
            />
            <View style={styles.horizontalCategoriesScroll}>
                <ScrollView horizontal style={styles.categoriesButtonScroll}>
                    {
                        isLoading ?
                            <>
                                <ImageButtonSkeleton />
                                <ImageButtonSkeleton />
                                <ImageButtonSkeleton />
                                <ImageButtonSkeleton />
                                <ImageButtonSkeleton />
                            </>
                            :
                            categories.map((category) => (
                                <ImageButton
                                    key={category.id}
                                    icon={"bus"}
                                    onPress={() => handleCategoryPress(category)}
                                    isSelected={selectedCategory === category.name}
                                    image={category.image}
                                    text={
                                        <GlobalText text={category.name} style={styles.categoryButtonText} />
                                    }
                                />
                            ))}
                </ScrollView>
            </View>

            <View style={styles.subCatContainer}>
                <View>
                    <GlobalText text={STRING.HEADER.CLASSIFICATIONS} style={styles.subCatHeader} />
                </View>
                <View style={styles.subCatView}>
                    <View style={styles.verticalNameContainer}>
                        <GlobalText text={selectedCategory} style={styles.verticalName} />
                    </View>
                    <View style={styles.subCatCardsContainer}>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={selectedSubCategory}
                            renderItem={renderItem}
                            numColumns={2}
                        />
                    </View>
                </View>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
