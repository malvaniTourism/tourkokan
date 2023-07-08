import React, { useRef } from "react";
import { View, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Text } from "react-native-svg";
import COLOR from "../../Services/Constants/COLORS";
import GlobalText from "./Text";

const BottomSheet = ({ refRBSheet, height, Component, openLocationSheet, closeLocationSheet }) => {
    return (
        <View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={height}
                openDuration={250}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: COLOR.themeComicBlue
                    }
                }}
            >
                <View>
                    {Component}
                </View>
            </RBSheet>
        </View>
    )
}

export default BottomSheet
