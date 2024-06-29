import { useEffect, useRef, useState } from "react";
import { View, Image } from "react-native";
import { ResponsiveGrid } from "react-native-flexible-grid";
import styles from "./Styles";
import Path from "../../Services/Api/BaseUrl";
import MasonryGrid from "../../Components/Customs/MasonryGrid";
import { comnPost, dataSync } from "../../Services/Api/CommonServices";
import Loader from "../../Components/Customs/Loader";
import { checkLogin, goBackHandler } from "../../Services/CommonMethods";
import CheckNet from "../../Components/Common/CheckNet";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import {
    setDestination,
    setLoader,
    setSource,
} from "../../Reducers/CommonActions";
import Header from "../../Components/Common/Header";
import Search from "../../Components/Customs/Search";
import { useTranslation } from "react-i18next";

const ExploreGrid = ({ route, navigation, ...props }) => {
    const { t } = useTranslation();
    let idCounter = useRef(0);

    const [gallery, setGallery] = useState([]);
    const [offline, setOffline] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [placesList, setPlacesList] = useState([]);
    const [nextPage, setNextPage] = useState(2);

    useEffect(() => {
        const backHandler = goBackHandler(navigation);
        checkLogin(navigation);
        props.setLoader(true);

        if (props.access_token) {
            if (!isLandingDataFetched && props.access_token) {
                setIsLandingDataFetched(true); // Mark the data as fetched
            }
            props.setLoader(false);
        }

        const unsubscribe = NetInfo.addEventListener((state) => {
            setOffline(false);

            dataSync(t("STORAGE.EXPLORE_CITIES_RESPONSE"), getData()).then(
                (resp) => {
                    let res = JSON.parse(resp);
                    if (res.data && res.data.data) {
                        setGallery(res.data.data.data);
                    } else if (resp) {
                        setOffline(true);
                    }
                }
            );
            props.setLoader(false);
        });

        return () => {
            backHandler.remove();
            unsubscribe();
        };
    }, []);

    const getData = (v) => {
        setSearchValue(v);
        let data = {
            apitype: "list",
            // category: "city",
            global: 1,
            search: v,
            per_page: 20,
        };
        comnPost(`v2/getGallery`, data)
            .then((res) => {
                if (res.data.success) {
                    props.setLoader(false);
                    setGallery(res.data.data.data);
                } else {
                    props.setLoader(false);
                }
            })
            .catch((err) => {
                props.setLoader(false);
            });
    };

    const getScrollData = () => {
        props.setLoader(true);
        let data = {
            apitype: "list",
            // category: "city",
            global: 1,
            search: searchValue,
            per_page: 10,
        };
        comnPost(`v2/getGallery?page=${nextPage}`, data)
            .then((res) => {
                if (res.data.success) {
                    props.setLoader(false);
                    let nextUrl = res.data.data.next_page_url;
                    setGallery([...gallery, ...res.data.data.data]);
                    setNextPage(nextUrl[nextUrl.length - 1]);
                } else {
                    props.setLoader(false);
                }
            })
            .catch((err) => {
                props.setLoader(false);
            });
    };

    // const getData = () => {
    //     const originalData = [
    //         {
    //             imageUrl: 'https://picsum.photos/200/300?random=1',
    //         },
    //         {
    //             imageUrl: 'https://picsum.photos/200/300?random=2',
    //         },
    //         {
    //             imageUrl: 'https://picsum.photos/200/300?random=3',
    //             widthRatio: 1,
    //             heightRatio: 2,
    //         },
    //         {
    //             imageUrl: 'https://picsum.photos/200/300?random=4',
    //         },
    //         {
    //             imageUrl: 'https://picsum.photos/200/300?random=5',
    //         },
    //         {
    //             imageUrl: 'https://picsum.photos/200/300?random=6',

    //             widthRatio: 1,
    //             heightRatio: 2,
    //         },
    //         {
    //             imageUrl: 'https://picsum.photos/200/300?random=7',

    //             widthRatio: 2,
    //             heightRatio: 2,
    //         },
    //         {
    //             imageUrl: 'https://picsum.photos/200/300?random=8',
    //         },
    //         {
    //             imageUrl: 'https://picsum.photos/200/300?random=9',
    //         },
    //         {
    //             imageUrl: 'https://picsum.photos/200/300?random=10',
    //         },
    //     ];

    //     let clonedData = [];

    //     for (let i = 0; i < 5; i++) {
    //         const newData = originalData.map((item) => ({
    //             ...item,
    //             id: ++idCounter.current,
    //         }));
    //         clonedData = [...clonedData, ...newData];
    //     }

    //     return clonedData;
    // };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.imageGridBoxContainer}>
                <Image
                    source={{ uri: Path.FTP_PATH + item.path }}
                    style={styles.imageGridBox}
                    resizeMode="cover"
                />
            </View>
        );
    };

    return (
        <View
            style={{
                flex: 1,
            }}
        >
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
            <ResponsiveGrid
                maxItemsPerColumn={3}
                data={gallery}
                renderItem={renderItem}
                showScrollIndicator={false}
                onEndReached={getScrollData}
                onEndReachedThreshold={0.1}
                style={{
                    padding: 5,
                    marginBottom: 70,
                }}
                keyExtractor={(item) => item.id.toString()}
            />

            <View
                style={{
                    position: "absolute",
                    width: "100%",
                    bottom: 0,
                }}
            ></View>
        </View>
    );
};

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
