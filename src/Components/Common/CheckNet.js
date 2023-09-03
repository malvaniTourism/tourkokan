import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import NetInfo from '@react-native-community/netinfo';
import ComingSoon from './ComingSoon';
import STRING from '../../Services/Constants/STRINGS';

const CheckNet = ({ isOff }) => {
    const [isOffline, setIsConnected] = useState(isOff);

    return (
        <View>
            <ComingSoon message={STRING.NO_INTERNET} visible={isOff} />
        </View>
    )
}

export default CheckNet
