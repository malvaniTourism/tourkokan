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

const CityPlaceSearch = ({ navigation, route }) => {
    const [searchValue, setSearchValue] = useState('');
    const [tableName, setTableName] = useState('cities')
    const [placesList, setPlacesList] = useState([]);
    const [isCity, setIsCity] = useState(true)

    useEffect(() => {
        const backHandler = goBackHandler(navigation)
        checkLogin(navigation)
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
        if (searchValue.length > 2) {
            comnPost("v1/search", data)
                .then((res) => {
                    setPlacesList(res.data.data.data)
                })
                .catch((err) => {
                });
        } else setPlacesList([])
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
            <Loader />
            <Header
                Component={
                    <SearchBar
                        placeholder={`Enter Text`}
                        value={searchValue}
                        onChangeText={(v) => searchPlace(v, tableName)}
                    />
                }
            />

            <View style={styles.flexRow}>
                <TouchableOpacity style={[styles.clickChip, isCity ? styles.chipEnabled : styles.chipDisabled]} onPress={() => onChipClick(true)}>
                    <Text style={styles.chipTitle}>City</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.clickChip, !isCity ? styles.chipEnabled : styles.chipDisabled]} onPress={() => onChipClick(false)}>
                    <Text style={styles.chipTitle}>Place</Text>
                </TouchableOpacity>
            </View>

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityPlaceSearch)
