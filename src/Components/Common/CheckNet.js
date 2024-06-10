import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import NetInfo from "@react-native-community/netinfo";
import ComingSoon from "./ComingSoon";
import STRING from "../../Services/Constants/STRINGS";
import { useTranslation } from "react-i18next";

const CheckNet = ({ isOff }) => {
    const { t } = useTranslation();

    const [isOffline, setIsConnected] = useState(isOff);

    return (
        <View>
            <ComingSoon message={t("NO_INTERNET")} visible={isOff} />
        </View>
    )
}

export default CheckNet
