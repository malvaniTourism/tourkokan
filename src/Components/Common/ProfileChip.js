import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './Styles'
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from '../../Services/Constants/COLORS';
import GlobalText from '../Customs/Text';

const ProfileChip = ({ icon, name, meta }) => {
    return (
        <TouchableOpacity style={styles.profileChip}>
            <View>
                {icon}
                <GlobalText text={name} style={styles.chipName} />
            </View>
            <View>
                {meta}
                <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={COLOR.black}
                />
            </View>
        </TouchableOpacity>
    )
}

export default ProfileChip
