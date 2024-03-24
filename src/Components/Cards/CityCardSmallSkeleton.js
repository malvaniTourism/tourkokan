import React from "react"
import styles from "./Styles"
import { Skeleton } from "@rneui/themed";
import STRING from "../../Services/Constants/STRINGS";

const CityCardSmallSkeleton = ({ type }) => {

    return (
        <Skeleton animation="pulse" variant="text" style={type == STRING.HEADER.PLACE ? styles.placeCardSkeleton : styles.cityCardSmallSkeleton} />
    )
}

export default CityCardSmallSkeleton