import React, { useState } from "react"
import { View, Text, ImageBackground, TouchableOpacity, Share } from "react-native"
import styles from "./Styles"
import Path from "../../Services/Api/BaseUrl";
import GlobalText from "../Customs/Text";
import { navigateTo } from "../../Services/CommonMethods";
import ComingSoon from "../Common/ComingSoon";
import Octicons from "react-native-vector-icons/Octicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { comnPost } from "../../Services/Api/CommonServices";
import STRING from "../../Services/Constants/STRINGS";

const SubCatCard = ({ data, navigation, onClick }) => {

    return (
        <TouchableOpacity style={styles.subCatCard} onPress={() => onClick()}>
            <GlobalText text={data.name} />
        </TouchableOpacity>
    )
}

export default SubCatCard