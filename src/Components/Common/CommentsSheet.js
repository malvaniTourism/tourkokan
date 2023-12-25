import React, { useState, useRef } from 'react'
import { FlatList, SafeAreaView, ScrollView, View, Platform, TouchableOpacity, PermissionsAndroid } from 'react-native'
import GlobalText from '../Customs/Text'
import STRING from '../../Services/Constants/STRINGS'

const CommentsSheet = ({ openCommentsSheet, closeCommentsSheet }) => {

    return (
        <View>
            <View>
                <GlobalText text={STRING.HEADER.COMMENTS} />
            </View>
        </View>
    )
}

export default CommentsSheet
