import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './Styles'
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from '../../Services/Constants/COLORS';
import GlobalText from '../Customs/Text';
import { Skeleton } from '@rneui/themed';

const ProfileChipSkeleton = () => {
    return (
        <Skeleton animation="pulse" variant="text" style={styles.profileChip} />
    )
}

export default ProfileChipSkeleton
