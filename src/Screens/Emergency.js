import React, { useEffect, useState } from "react";
import { FlatList, View, ScrollView, Linking } from "react-native";
import { ListItem } from "@rneui/themed";
import Header from "../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import COLOR from "../Services/Constants/COLORS";
import { backPage, checkLogin, goBackHandler } from "../Services/CommonMethods";
import TextButton from "../Components/Customs/Buttons/TextButton";
import styles from "./Styles";
import { comnPost } from "../Services/Api/CommonServices";
import Loader from "../Components/Customs/Loader";
import { setLoader } from "../Reducers/CommonActions";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

const Emergency = ({ navigation, route, ...props }) => {
    const { t } = useTranslation();

    const [data, setData] = useState([]);

    useEffect(() => {
        const backHandler = goBackHandler(navigation);
        checkLogin(navigation);
        getData();
        return () => {
            backHandler.remove();
        };
    }, []);

    const getData = () => {
        props.setLoader(true);
        let data = {
            apitype: "list",
            category: "emergency",
        };
        comnPost("v2/sites", data)
            .then((res) => {
                if (res && res.data.data) setData(res.data.data.data);
                props.setLoader(false);
            })
            .catch((error) => {
                props.setLoader(false);
            });
    };

    const makeContact = (address, apptype) => {
        const value = address[0][apptype];
        if (value && typeof value === "string") {
            const prefix = apptype === "phone" ? "tel" : "mailto";
            Linking.openURL(`${prefix}:${value}`);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <ListItem bottomDivider>
                <ListItem.Content style={{ flexDirection: "row" }}>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Content
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }}
                    >
                        <TextButton
                            title=""
                            onPress={() => makeContact(item.address, "phone")}
                            buttonView={styles.callButton}
                            endIcon={
                                <Feather
                                    name="phone-call"
                                    size={24}
                                    color={COLOR.themeBlue}
                                />
                            }
                        />
                        <TextButton
                            title=""
                            onPress={() => makeContact(item.address, "email")}
                            buttonView={styles.callButton}
                            endIcon={
                                <MaterialIcons
                                    name="email"
                                    size={24}
                                    color={COLOR.themeBlue}
                                />
                            }
                        />
                    </ListItem.Content>
                </ListItem.Content>
            </ListItem>
        );
    };

    return (
        <View>
            <Header
                name={t("HEADER.EMERGENCY")}
                goBack={() => backPage(navigation)}
                startIcon={
                    <Ionicons
                        name="chevron-back-outline"
                        size={24}
                        onPress={() => backPage(navigation)}
                        color={COLOR.black}
                    />
                }
                endIcon={<></>}
            />
            <Loader />
            <ScrollView>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={data}
                    renderItem={renderItem}
                    onEndReached={getData}
                    onEndReachedThreshold={0.5}
                    style={{ marginBottom: 30 }}
                />
            </ScrollView>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (data) => {
            dispatch(setLoader(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Emergency);
