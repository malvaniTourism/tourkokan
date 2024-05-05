import React from 'react'
import { View } from 'react-native'
import ProfileChip from '../ProfileChip'
import STRING from '../../../Services/Constants/STRINGS'

const ChipOptions = () => {
    return (
        <View>
            <ProfileChip name={STRING.CHIPS.LANGUAGE} />
            <ProfileChip name={STRING.CHIPS.UPDATE_LOCATION} />
            <ProfileChip name={STRING.CHIPS.UPDATE_PROFILE} />
            <ProfileChip name={STRING.CHIPS.SETTINGS} />
            <ProfileChip name={STRING.CHIPS.LOGOUT} />
        </View>
    )
}

export default ChipOptions
