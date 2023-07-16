import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import Header from "../../Components/Common/Header";
import SearchBar from "../../Components/Customs/Search";
import styles from "./Styles";
import Loader from "../../Components/Customs/Loader";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ListItem } from "@rneui/themed";
import { checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";
import { comnPost } from "../../Services/Api/CommonServices";
import GlobalText from "../../Components/Customs/Text";
import { setLoader } from "../../Reducers/CommonActions";

const CityPlaceSearch = ({ navigation, route, ...props }) => {
    const [searchValue, setSearchValue] = useState('');
    const [tableName, setTableName] = useState('places')
    const [placesList, setPlacesList] = useState([]);
    const [isCity, setIsCity] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        props.setLoader(true)
        const backHandler = goBackHandler(navigation)
        checkLogin(navigation)
        searchPlace("", "places")
        return () => {
            backHandler.remove()
        }
    }, []);

    const searchPlace = (val, table) => {
        setSearchValue(val);
        const data = {
            string: val,
            table_name: table
        }
        // if (searchValue.length > 2) {
            comnPost("v1/search", data)
                .then((res) => {
                    setPlacesList(res.data.data.data)
                    setIsLoading(false)
                    props.setLoader(false)
                })
                .catch((err) => {
                    setIsLoading(false)
                    props.setLoader(false)
                });
        // } else setPlacesList([])
    };

    const onChipClick = (val) => {
        setIsCity(val)
        let table = 'cities'
        if (!val) {
            setTableName('places')
            table = 'places'
        }
        else setTableName('cities')
        searchPlace(searchValue, table)
    }

    const onListItemClick = (id) => {
        if (isCity) navigateTo(navigation, "CityDetails", { id });
        else navigateTo(navigation, "PlaceDetails", { id });
    }

    const renderItem = ({ item }) => {
        return (
            <ListItem bottomDivider onPress={() => onListItemClick(item.id)}>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    };

    return (
        <View>
            <Loader isLoading={isLoading} />
            <Header
                Component={
                    <SearchBar
                        placeholder={`Enter Text`}
                        value={searchValue}
                        onChangeText={(v) => searchPlace(v, tableName)}
                    />
                }
            />

            {/* <View style={styles.flexRow}>
                <TouchableOpacity style={[styles.clickChip, isCity ? styles.chipEnabled : styles.chipDisabled]} onPress={() => onChipClick(true)}>
                    <GlobalText text={"City"} style={styles.chipTitle} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.clickChip, !isCity ? styles.chipEnabled : styles.chipDisabled]} onPress={() => onChipClick(false)}>
                    <GlobalText text={"Place"} style={styles.chipTitle} />
                </TouchableOpacity>
            </View> */}

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
    )
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: data => {
            dispatch(setLoader(data))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityPlaceSearch)
