import { useEffect, useRef, useState } from "react";
import {
    View,
    Image,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
} from "react-native";
import { ResponsiveGrid } from "react-native-flexible-grid";
import styles from "./Styles";
import Path from "../../Services/Api/BaseUrl";
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
import GlobalText from "../../Components/Customs/Text";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import ExploreGridSkeleton from "./ExploreGridSkeleton";

const ExploreGrid = ({ route, navigation, ...props }) => {
    const { t } = useTranslation();
    let idCounter = useRef(0);

    const [gallery, setGallery] = useState([]);
    const [offline, setOffline] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const backHandler = goBackHandler(navigation);
        checkLogin(navigation);
        setLoading(true);
        const unsubscribe = NetInfo.addEventListener((state) => {
            setOffline(!state.isConnected);
            if (state.isConnected) {
                fetchData(1, true);
            }
        });

        return () => {
            backHandler.remove();
            unsubscribe();
        };
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData(1, true);
    };

    useEffect(() => {
        fetchData(1, true);
    }, [searchValue]);

    const fetchData = (page, reset = false) => {
        setLoading(true);
        let data = {
            apitype: "list",
            global: 1,
            search: searchValue,
            per_page: 20,
            page: page,
        };
        comnPost(`v2/getGallery`, data)
            .then((res) => {
                if (res.data.success) {
                    props.setLoader(false);
                    if (reset) {
                        setGallery(res.data.data.data);
                    } else {
                        setGallery((prevGallery) => [
                            ...prevGallery,
                            ...res.data.data.data,
                        ]);
                    }
                    setCurrentPage(res.data.data.current_page);
                    setLastPage(res.data.data.last_page);
                } else {
                    props.setLoader(false);
                }
                setLoading(false);
                setRefreshing(false);
            })
            .catch((err) => {
                props.setLoader(false);
                setLoading(false);
                setRefreshing(false);
            });
    };

    const handleSearch = (v) => {
        setSearchValue(v);
        setCurrentPage(1);
    };

    const getScrollData = () => {
        if (!loading && currentPage < lastPage) {
            fetchData(currentPage + 1);
        }
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedImage(null);
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => openModal(Path.FTP_PATH + item.path)}
            >
                <View style={styles.imageGridBoxContainer}>
                    <Image
                        source={{ uri: Path.FTP_PATH + item.path }}
                        style={styles.imageGridBox}
                        resizeMode="cover"
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const renderFooter = () => {
        // if (!loading) return null;
        // return (
        //     <View style={{ paddingVertical: 20 }}>
        //         <ActivityIndicator size="small" color={COLOR.primary} />
        //     </View>
        // );
    };

    return (
        <>
            <Header
                Component={
                    <Search
                        style={styles.homeSearchBar}
                        placeholder={t("Search")}
                        value={searchValue}
                        onChangeText={handleSearch}
                    />
                }
            />
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <CheckNet isOff={offline} />
                {/* <Loader /> */}
                {loading ? (
                    <ExploreGridSkeleton />
                ) : gallery[0] ? (
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
                        ListFooterComponent={renderFooter}
                    />
                ) : (
                    <View
                        style={{
                            height: DIMENSIONS.screenHeight,
                            alignItems: "center",
                            padding: 50,
                        }}
                    >
                        <GlobalText
                            style={{ fontWeight: "bold" }}
                            text={offline ? t("NO_INTERNET") : t("NO_DATA")}
                        />
                    </View>
                )}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.modalBackground}
                            onPress={closeModal}
                        >
                            <View style={styles.modalContent}>
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={styles.modalImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ScrollView>
        </>
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
