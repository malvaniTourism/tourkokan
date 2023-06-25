import React, { useState } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import MaterialTabs from 'react-native-material-tabs';
import styles from './Styles';
import { Text, Card } from '@rneui/base';
import COLOR from '../../Services/Constants/COLORS';

const TabView = ({ data }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    console.log(data);
    const handleTabChange = (index) => {
        setSelectedTab(index);
    };

    const renderPlaceItem = ({ item }) => (
        <Card style={styles.placeCard}>
            <Text>{item.name}</Text>
            {/* Render additional place details */}
        </Card>
    );

    const renderEmptyPlace = () => (
        <View style={styles.emptyPlace}>
            <Text>We are adding new places inside this category soon..!</Text>
        </View>
    );

    const renderPlaceGrid = () => {
        const selectedCategory = data[selectedTab];
        if (!selectedCategory || !selectedCategory.places) {
            return renderEmptyPlace();
        }

        const places = selectedCategory.places;
        if (places.length === 0) {
            return renderEmptyPlace();
        }

        return (
            <FlatList
                data={places}
                renderItem={renderPlaceItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
            />
        );
    };

    return (
        <SafeAreaView style={styles.tabView}>
            <MaterialTabs
                items={data.map((category) => category.name)}
                selectedIndex={selectedTab}
                onChange={handleTabChange}
                barColor={COLOR.intentColor}
                indicatorColor={COLOR.headingColor2}
                activeTextColor={COLOR.yellowLight}
            />

            <Card containerStyle={styles.tabPanel}>
                <View style={styles.tabContent}>{renderPlaceGrid()}</View>
            </Card>
        </SafeAreaView>
    );
};

export default TabView;
