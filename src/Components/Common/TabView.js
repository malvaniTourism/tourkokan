import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import MaterialTabs from 'react-native-material-tabs';
import styles from './Styles';
import { Text } from '@rneui/base';

const TabView = ({ data }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <SafeAreaView style={styles.tabView}>
            <MaterialTabs
                items={['One', 'Two', 'Three', 'Four', 'Five']}
                selectedIndex={selectedTab}
                onChange={setSelectedTab}
                barColor="#1fbcd2"
                indicatorColor="#fffe94"
                activeTextColor="white"
            />

            {
                selectedTab == 0 ?
                    <View>
                        <Text>View 1</Text>
                    </View>
                    :
                    selectedTab == 1 ?
                        <View>
                            <Text>View 2</Text>
                        </View>
                        :
                        selectedTab == 2 ?
                            <View></View>
                            :
                            selectedTab == 3 ?
                                <View></View>
                                :
                                <View></View>
            }
        </SafeAreaView>
    )
}

export default TabView
