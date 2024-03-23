import React from "react"
import { FlatList, View } from "react-native"
import { ListItem } from "@rneui/themed";
import styles from "./Styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";

const SearchDropdown = ({ placesList, goToNext, setPlace, closeDropdown }) => {

    const renderItem = ({ item }) => {
        return (
            <ListItem bottomDivider onPress={() => setPlace(item)}>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    };

    return (
        <View style={styles.searchDropView}>
            <Ionicons
                style={styles.dropCloseIcon}
                name="close-circle"
                color={COLOR.themeBlue}
                size={DIMENSIONS.iconLarge}
                onPress={closeDropdown}
            />
            <FlatList
                keyExtractor={(item) => item.id}
                data={placesList}
                renderItem={renderItem}
                // onEndReached={goToNext}
                onEndReachedThreshold={0.5}
                style={{ marginBottom: 20 }}
            />
        </View>
    )
}

export default SearchDropdown
