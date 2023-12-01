import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createNavigationContainerRef, NavigationContainer} from "@react-navigation/native";
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

import StartScreen from "../screens/StartScreen";
import SignUpScreen from "../screens/SignUpScreen";
import BottomTabNavigator from "./BottomTabNavigator";


import {
    signUpScreenName,
    startScreenName,
    tabNavigationScreenName,
} from "./path";

import sqlQueries from "../sqlLight/queries";
import {tables} from "../sqlLight/tables";

// import {setDevicePushToken, setToken} from "../redux/action/user";
import {registerForPushNotifications} from "../utils/functions/notification";
// import * as Notifications from "expo-notifications";
import {Easing} from "react-native";


const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef()

function MainStack() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [tablesCreated, setTablesCreated] = useState(false)
    // const setNewToken = (token) => dispatch(setToken(token))

    useEffect(() => {
        // getToken(setNewToken, getUserFromStorage, setLoading)

        // create sqLight tables
        // Object.values(tables).forEach(item => {
        //     sqlQueries.createTable(item.name, item.cols, () => setTablesCreated(true), () => console.error(`error create ${item.name}`))
        // })


        // registerForPushNotifications().then(token => dispatch(setDevicePushToken(token)));

        // Notifications.setNotificationHandler({
        //     handleNotification: async () => ({
        //         shouldShowAlert: true,
        //         shouldPlaySound: true,
        //         shouldSetBadge: false,
        //     }),
        // });
    }, [])

    useEffect(() => {
        if (loading) {
            SplashScreen.hideAsync()
        }

    }, [loading, tablesCreated])


    const config = {
        animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear,
        }
    }

    const closeConfig = {
        animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear,
        }
    }

    return (
        <>
            {!loading ?
                <NavigationContainer ref={navigationRef}>
                    <Stack.Navigator screenOptions={{
                        headerShown: false,
                        keyboardHandlingEnabled: true,
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                        transitionSpec: {
                            open: config,
                            close: closeConfig,
                        },
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}>
                        <Stack.Screen name={tabNavigationScreenName} component={BottomTabNavigator}/>
                        <Stack.Screen name={startScreenName} component={StartScreen}/>
                        <Stack.Screen name={signUpScreenName} component={SignUpScreen}/>
                    </Stack.Navigator>
                </NavigationContainer> : null
            }
        </>
    )
        ;
}

export default MainStack
