import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import NetInfo from '@react-native-community/netinfo';
import ComingSoon from './ComingSoon';
import STRING from '../../Services/Constants/STRINGS';

const CheckNet = () => {
    const [isConnected, setIsConnected] = useState(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View>
            {isConnected !== null && (
                !isConnected ?
                <ComingSoon message={STRING.NO_INTERNET} visible={!isConnected} />
                :
                null
            )}
        </View>
    )
}

export default CheckNet
