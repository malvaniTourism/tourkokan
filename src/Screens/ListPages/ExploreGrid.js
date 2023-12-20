import React, { useEffect, useState } from 'react'
import MasonryGrid from '../../Components/Customs/MasonryGrid';
import { comnPost, dataSync } from '../../Services/Api/CommonServices';
import { View } from 'react-native';
import Loader from '../../Components/Customs/Loader';
import {
    setDestination,
    setLoader,
    setSource,
} from "../../Reducers/CommonActions";
import { connect } from 'react-redux';
import Header from '../../Components/Common/Header';
import STRING from '../../Services/Constants/STRINGS';
import COLOR from '../../Services/Constants/COLORS';
import DIMENSIONS from '../../Services/Constants/DIMENSIONS';
import Ionicons from "react-native-vector-icons/Ionicons";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";
import CheckNet from '../../Components/Common/CheckNet';
import NetInfo from '@react-native-community/netinfo';
import Search from '../../Components/Customs/Search';
import styles from './Styles';

const ExploreGrid = ({ route, navigation, ...props }) => {
    const [citiesData, setCitiesData] = useState([])
    const [offline, setOffline] = useState(false)
    const [searchValue, setSearchValue] = useState("");
    const [placesList, setPlacesList] = useState([]);
    const [nextPage, setNextPage] = useState(2)

    // route.params.cities

    useEffect(() => {
        getData('')
    }, [])

    useEffect(() => {
        const backHandler = goBackHandler(navigation)
        checkLogin(navigation)
        props.setLoader(true);

        if (props.access_token) {
            if (!isLandingDataFetched && props.access_token) {
                setIsLandingDataFetched(true); // Mark the data as fetched
            }
            props.setLoader(false);
        }

        const unsubscribe = NetInfo.addEventListener(state => {
            setOffline(false)

            dataSync(STRING.STORAGE.EXPLORE_CITIES_RESPONSE, getData())
                .then(resp => {
                    let res = JSON.parse(resp)
                    if (res.data && res.data.data) {
                        setCitiesData(res.data.data.data);
                    } else if (resp) {
                        setOffline(true)
                    }
                })
            props.setLoader(false);
        });

        return () => {
            backHandler.remove()
            unsubscribe();
        }
    }, []);

    const getData = (v) => {
        setSearchValue(v);
        let data = {
            apitype: "list",
            // category: "city",
            global: 1,
            search: v
        }
        comnPost(`v2/sites`, data)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    props.setLoader(false);
                    setCitiesData(res.data.data.data);
                } else {
                    props.setLoader(false);
                }
            })
            .catch(err => {
                props.setLoader(false);
            })
    }

    const getScrollData = (v, page) => {
        props.setLoader(true)
        setSearchValue(v);
        let data = {
            apitype: "list",
            // category: "city",
            global: 1,
            search: v
        }
        console.log('load - - - - - - - - - - -');
        comnPost(`v2/sites?page=${page}`, data)
            .then(res => {
                console.log('00--', res.data.data);
                if (res.data.success) {
                    props.setLoader(false);
                    let nextUrl = res.data.data.next_page_url
                    setCitiesData([...citiesData, ...res.data.data.data]);
                    setNextPage(nextUrl[nextUrl.length - 1])
                } else {
                    props.setLoader(false);
                }
            })
            .catch(err => {
                props.setLoader(false);
            })
    }

    return (
        <View>
            <Loader />
            <CheckNet isOff={offline} />
            <Header
                Component={
                    <Search
                        style={styles.homeSearchBar}
                        placeholder={`Search`}
                        value={searchValue}
                        onChangeText={(v) => getData(v)}
                    />
                }
            />
            <MasonryGrid data={citiesData} loadMore={() => getScrollData('', nextPage)} />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        source: state.commonState.source,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSource: (data) => {
            dispatch(setSource(data));
        },
        setDestination: (data) => {
            dispatch(setDestination(data));
        },
        setLoader: (data) => {
            dispatch(setLoader(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreGrid);
