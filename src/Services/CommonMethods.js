import { BackHandler, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

let lastBackPressed = 0;

export const goBackHandler = (navigation) => {
    return BackHandler.addEventListener('hardwareBackPress', () => backPage(navigation));
}

export const backPage = (navigation) => {
    navigation.goBack()
    return true
}

export const navigateTo = (navigation, page, params) => {
    navigation.navigate(page, params)
    return true
}

export const checkLogin = async (navigation) => {
    if (
        (await AsyncStorage.getItem("access_token")) == null ||
        (await AsyncStorage.getItem("access_token")) == ""
    ) {
        navigateTo(navigation, "Login");
    }
}

export const exitApp = () => {
    const currentTime = new Date().getTime();

    if (currentTime - lastBackPressed < 2000) {
        BackHandler.exitApp();
        return false;
    } else {
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        lastBackPressed = currentTime;
        return true;
    }
}