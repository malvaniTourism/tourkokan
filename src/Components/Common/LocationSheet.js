import React, { useState, useRef } from 'react'
import { FlatList, SafeAreaView, ScrollView, View, Platform, TouchableOpacity } from 'react-native'
import GlobalText from '../Customs/Text'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import COLOR from '../../Services/Constants/COLORS';
import DIMENSIONS from '../../Services/Constants/DIMENSIONS';
import Search from '../Customs/Search';
import { comnPost } from '../../Services/Api/CommonServices';
import { ListItem } from '@rneui/themed';
import styles from './Styles';
import DialogBox from 'react-native-dialogbox';

const LocationSheet = ({ openLocationSheet, closeLocationSheet }) => {
    const refDialogBox = useRef();

    const [searchValue, setSearchValue] = useState('');
    const [placesList, setPlacesList] = useState([]);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const searchPlace = (val, table) => {
        setSearchValue(val);
        const data = {
            string: val,
            table_name: table
        }
        if (val.length >= 1) {
            comnPost("v1/search", data)
                .then((res) => {
                    setPlacesList(res.data.data.data)
                })
                .catch((err) => {
                });
        } else setPlacesList([])
    };

    const renderItem = ({ item }) => {
        return (
            <ListItem bottomDivider onPress={() => onListItemClick(item.id)}>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    };

    const onListItemClick = (id) => {
        closeLocationSheet()
    }

    const myLocationPress = () => {
        if (Platform.OS !== 'android' && isLocationEnabled === false) {
            refDialogBox.current.confirm({
                title: 'Enable Location Service',
                content: "Please turn on your location service  to detect your current location",
                ok: {
                    text: 'CONTINUE',
                    callback: () => {
                        LocationSwitch.enableLocationService(1000, true,
                            () => { isLocationEnabled(false) },
                            () => { closeLocationSheet() },
                            () => { getCurrentLoc(); },
                        );
                    },
                },
                cancel: {
                    text: 'CANCEL',
                    callback: () => { },
                },
            });

        } else {
            closeLocationSheet()
            getCurrentLoc();
        }
    }

    const getCurrentLoc = () => {
        if (Platform.OS === 'ios') {
            try {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude)
                        setLongitude(position.coords.longitude)
                    },
                    (error) => {
                        closeLocationSheet();
                        setAddress();
                        return true;
                    },
                    { enableHighAccuracy: false, timeout: 15000 }
                ).catch((e) => {
                })
            } catch (e) {
            }
        } else {
            try {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
                    .then(data => {
                        setPermissions();
                    }).catch((err) => {
                        closeLocationSheet();
                    })
                return true;
            } catch (e) {
            }
        }
    }

    const setAddress = async () => {
        if (props.currAddr !== undefined && props.currAddr !== null) {
            await AsyncStorage.setItem('addr', JSON.stringify(props.currAddr))
        }
    }

    setPermissions = async () => {
        if (Platform.OS === 'ios') {

        } else {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === 'granted') {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude)
                        setLongitude(position.coords.longitude)
                        getAddress(position)
                    },
                    (error) => {
                        closeLocationSheet();
                        setAddress();
                        return true;
                    },
                    { enableHighAccuracy: false, timeout: 15000 }
                ).catch((e) => {
                })
            } else {
                closeLocationSheet()
                return true;
            }
        }
    }

    const getAddress = (position) => {
        closeLocationSheet()
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + 'AIzaSyCUUzdHc1ccGZhOzia9NoPf8mf3Yv901ZQ')
            .then((response) => response.json())
            .then((json) => {
                let currentcity = ''; let zip = '', state = 'Maharashtra'; let locality = ''; let locality1 = ''; let locality2 = '';
                for (let i = 0; i < json.results[0].address_components.length; i++) {
                    for (let j = 0; j < json.results[0].address_components[i].types.length; j++) {
                        if (json.results[0].address_components[i].types[j] === 'locality') {
                            currentcity = json.results[0].address_components[i].long_name;
                        }
                        if (json.results[0].address_components[i].types[j] === 'postal_code') {
                            zip = json.results[0].address_components[i].long_name;
                        }
                        if (json.results[0].address_components[i].types[j] === 'administrative_area_level_1') {
                            state = json.results[0].address_components[i].long_name;
                        }
                        if (json.results[0].address_components[i].types[j] === 'sublocality_level_2' || json.results[0].address_components[i].types[j] === "route") {
                            locality1 = json.results[0].address_components[i].long_name;
                        }
                        if (json.results[0].address_components[i].types[j] === 'sublocality_level_1') {
                            locality2 = json.results[0].address_components[i].long_name;
                        }
                    }
                }

                if (locality1 !== '') {
                    locality = locality1 + ', ' + locality2 + ', ' + currentcity
                } else {
                    locality = json.results[0].formatted_address
                }

                var addr = {
                    addr: json.results[0].formatted_address,
                    city: currentcity,
                    zip: zip,
                    lat: json.results[0].geometry.location.lat,
                    lng: json.results[0].geometry.location.lng,
                    locality: locality,
                    loacaity1: locality1,
                    locality2: locality2,
                    state: state,
                    country: 'INDIA'
                }
                var rgData = {
                    addr: json.results[0].formatted_address,
                    city: currentcity,
                    zip: zip,
                    lat: json.results[0].geometry.location.lat,
                    lng: json.results[0].geometry.location.lng,
                    loacaity1: locality1,
                    locality2: locality2,
                    state: state,
                    country: 'INDIA'
                }
                setCurrAddr(addr)
            })
            .catch((error) => {
            });
    }

    return (
        <View>
            <View style={{ position: 'relative' }}>
                <Search
                    placeholder={"Search for area, street name..."}
                    value={searchValue}
                    onChangeText={(text) => searchPlace(text, 'places')}
                />
            </View>
            {placesList[0] &&
                <SafeAreaView style={styles.listView}>
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={placesList}
                            renderItem={renderItem}
                        />
                    </ScrollView>
                </SafeAreaView>
            }
            <TouchableOpacity style={styles.currLocView} onPress={() => myLocationPress()}>
                <MaterialIcons
                    name="my-location"
                    color={COLOR.black}
                    size={DIMENSIONS.userIconSize}
                    style={{ marginRight: 20 }}
                />
                <GlobalText text={"Use Current Location"} style={styles.fontBold} />
            </TouchableOpacity>

            <View style={styles.recentsView}>
                <GlobalText text={"Recent Location"} style={styles.fontBold} />
                <TouchableOpacity style={styles.recentsListView} onPress={() => closeLocationSheet()}>
                    <MaterialIcons
                        name="location-pin"
                        color={COLOR.themeLightBlue}
                        size={DIMENSIONS.userIconSize}
                        style={{ marginRight: 20 }}
                    />
                    <View>
                        <GlobalText text={"Kankavli"} />
                        <GlobalText text={"Maharashtra"} />
                    </View>
                </TouchableOpacity>
            </View>

            <DialogBox ref={refDialogBox}
                onDismiss={() => refDialogBox.current.close()}
            />
        </View>
    )
}

export default LocationSheet
