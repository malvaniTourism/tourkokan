import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './Store';
import { Image, LogBox, StyleSheet, View } from 'react-native';
import StackNavigator from './src/Navigators/StackNavigator';
import COLOR from './src/Services/Constants/COLORS';
import AppIntroSlider from 'react-native-app-intro-slider';
import GlobalText from './src/Components/Customs/Text';
import DIMENSIONS from './src/Services/Constants/DIMENSIONS';
import STRING from './src/Services/Constants/STRINGS';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showApp, setShowApp] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false)
  LogBox.ignoreAllLogs();

  // useEffect(async () => {
  //   setIsFirstTime(await AsyncStorage.getItem(STRING.STORAGE.IS_FIRST_TIME))
  // }, [])

  const slides = [
    {
      key: 1,
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: require('./src/Assets/Images/redbus.jpeg'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('./src/Assets/Images/sunset.jpeg'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Title 3',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: require('./src/Assets/Images/cycle.jpeg'),
      backgroundColor: '#22bcb5',
    }
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <GlobalText style={styles.title} text={item.title} />
        <Image source={item.image} style={styles.image} />
        <GlobalText style={styles.text} text={item.text} />
      </View>
    );
  }
  const onDone = () => {
    setShowApp(true);
  }

  if (showApp) {
      return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* <StatusBar
        backgroundColor={COLOR.yellow}
      /> */}
        <StackNavigator />
      </SafeAreaProvider>
    </Provider>
      )
  } else {
    return <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone}/>;
  }
}

const styles = StyleSheet.create({
  slide: {
    height: DIMENSIONS.screenHeight - 60,
    justifyContent: "space-between",
    backgroundColor: COLOR.themeComicBlueULight,
  },
  title: {
    fontSize: DIMENSIONS.xlText,
    color: COLOR.themeComicBlue,
    fontWeight: "bold",
    alignSelf: "center",
    position: "absolute",
    zIndex: 10,
    top: 40,
    // backgroundColor: COLOR.white
  },
  image: {
    height: DIMENSIONS.screenHeight / 2,
    width: DIMENSIONS.screenWidth
  },
  text: {
    color: COLOR.black,
    alignSelf: "center",
    fontWeight: "bold",
    top: -200,
    fontSize: DIMENSIONS.subtitleTextSize
  }
})