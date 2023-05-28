import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './Store';
import { LogBox } from 'react-native';
import StackNavigator from './src/Navigators/StackNavigator';
import COLOR from './src/Services/Constants/COLORS';

const Stack = createNativeStackNavigator();

export default function App() {
LogBox.ignoreAllLogs();

  return (
  <Provider store={store}>
    <SafeAreaProvider>
      {/* <StatusBar
        backgroundColor={COLOR.yellow}
      /> */}
      <StackNavigator />
    </SafeAreaProvider>
      </Provider>
  );
}
