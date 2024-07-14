import React, { useEffect, useState } from "react";
import { View } from "react-native";
import GlobalText from "../../Customs/Text";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./Styles";
import TextButton from "../../Customs/Buttons/TextButton";
import { useTranslation } from "react-i18next";
import { comnPost } from "../../../Services/Api/CommonServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangeLang = ({ refreshOption, setLoader }) => {
    const { t, i18n } = useTranslation();

    const [list, setList] = useState([
        { label: "English", value: "en" },
        { label: "मराठी", value: "mr" },
    ]);
    const [language, setLanguage] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        setLanguage(t("LANG"));
    }, []);

    const saveLang = () => {
        setLoader(true);
        let data = {
            language,
        };
        comnPost("v2/updateProfile", data)
            .then((res) => {
                AsyncStorage.setItem("isUpdated", "true");
            })
            .catch((err) => {});
        i18n.changeLanguage(language);
        AsyncStorage.setItem("isLangChanged", "true");
        refreshOption();
    };

    return (
        <View>
            <GlobalText
                text={t("CHIPS.CHANGE_LANGUAGE")}
                style={{ textAlign: "left" }}
            />
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemTextStyle}
                dropdownTextStyle={styles.dropdownText}
                iconStyle={styles.dropdownIcon}
                data={list}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select item" : "..."}
                value={language}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    setLanguage(item.value);
                    setIsFocus(false);
                }}
            />
            <TextButton
                title={t("BUTTON.SAVE")}
                buttonView={styles.langButtonStyle}
                titleStyle={styles.buttonTitleStyle}
                onPress={saveLang}
            />
        </View>
    );
};

export default ChangeLang;
