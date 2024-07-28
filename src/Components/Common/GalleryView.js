import React, { useState } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import ImageViewing from "react-native-image-viewing";
import styles from "./Styles";
import Path from "../../Services/Api/BaseUrl";
import FastImage from "react-native-fast-image";

const ImageViewer = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [isVisible, setIsVisible] = useState(false);

    const openImageViewer = (image) => {
        setSelectedImage(image);
        setIsVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => openImageViewer(item)}>
            <Image
                source={{ uri: Path.FTP_PATH + item.path }}
                style={styles.thumbnail}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.galleryContainer}>
            <FastImage
                style={styles.mainImage}
                source={{
                    uri: Path.FTP_PATH + selectedImage.path,
                    headers: { Authorization: "someAuthToken" },
                    priority: FastImage.priority.normal,
                }}
                // resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.thumbnailView}>
                <FlatList
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    style={styles.thumbnailList}
                />
            </View>
            {/* <ImageViewing
        images={[{ uri: selectedImage.uri }]}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      /> */}
        </View>
    );
};

export default ImageViewer;
