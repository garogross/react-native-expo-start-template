import React from "react";
import {AppRegistry, LogBox, View} from 'react-native';
import {Text} from 'react-native';
import {useFonts} from "expo-font";
import {Provider} from "react-redux";
import {store} from "./src/redux/store";

import StBar from "./src/components/global/StBar/StBar";
import MainStack from "./src/router/StackNavigator";
import * as SplashScreen from "expo-splash-screen";
import {RootSiblingParent} from 'react-native-root-siblings';


SplashScreen.preventAutoHideAsync();


export default function App() {
    const [loaded] = useFonts({
        SFUIRegular: require('./src/assets/fonts/SFUIText-Regular.ttf'),
        SFUILight: require('./src/assets/fonts/SFUIText-Light.ttf'),
        SFUIMedium: require('./src/assets/fonts/SFUIText-Bold.ttf'),
        SFUISemiBold: require('./src/assets/fonts/SFUIText-Semibold.ttf'),
    });


    if (loaded) {
        return (

            <RootSiblingParent>
                <Provider store={store}>
                    <StBar/>
                    <MainStack/>
                </Provider>
            </RootSiblingParent>
        );

    } else {
        <Text>Loading...</Text>
    }
}

LogBox.ignoreLogs(['Require cycle:']);

AppRegistry.registerComponent('KHG Chat', () => App);
