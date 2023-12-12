import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import Header from "../../Components/Common/Header";
import SearchBar from "../../Components/Customs/Search";
import styles from "./Styles";
import Loader from "../../Components/Customs/Loader";
import { ListItem } from "@rneui/themed";
import { checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";
import { comnPost } from "../../Services/Api/CommonServices";
import GlobalText from "../../Components/Customs/Text";
import { setLoader } from "../../Reducers/CommonActions";
import STRING from "../../Services/Constants/STRINGS";

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
        searchPlace("", STRING.TABLE.PLACES)
        return () => {
            backHandler.remove()
        }
    }, []);

    const searchPlace = (val, table) => {
        setSearchValue(val);
        const data = {
            search: val,
            apitype: "dropdown",
            global: 1
        }
        // if (searchValue.length > 2) {
        comnPost("v2/sites", data)
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
        let table = STRING.TABLE.CITIES
        if (!val) {
            setTableName(STRING.TABLE.PLACES)
            table = STRING.TABLE.PLACES
        }
        else setTableName(STRING.TABLE.CITIES)
        searchPlace(searchValue, table)
    }

    const onListItemClick = (id) => {
        if (isCity) navigateTo(navigation, STRING.SCREEN.CITY_DETAILS, { id });
        else navigateTo(navigation, STRING.SCREEN.PLACE_DETAILS, { id });
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
                        placeholder={STRING.PLACEHOLDER.ENTER_TEXT}
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

            <SafeAreaView>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={placesList}
                    renderItem={renderItem}
                />
            </SafeAreaView>
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
