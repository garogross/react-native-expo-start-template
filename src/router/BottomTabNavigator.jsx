import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Linking} from "react-native";
import {useSelector} from "react-redux";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ChatsScreen from "../screens/ChatsScreen";
import CallsScreen from "../screens/CallsScreen";
import SvgImage from "../assets/SvgImage";

import {
    COLORS,
} from "../styles/styleVariables";
import {
    callsIcon,
    chatsIcon,
} from "../assets/svg";
import {
    callsScreenName, chatsListScreenName,
} from "./path";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {styleFuncs} from "../styles/styleFunctions";
import {Camera} from "expo-camera";
import {
    requestAudioPermission,
    requestCameraPermission, requestContactsPermission,
    requestMediaLibraryPermission
} from "../utils/functions/permissions";
import * as MediaLibrary from "expo-media-library";
import {Audio} from "expo-av";
import * as Contacts from "expo-contacts";


const Tab = createBottomTabNavigator()

const tabsArr = [
    {
        icon: callsIcon,
        iconFocused: callsIcon,
        name: callsScreenName,
        component: CallsScreen
    },
    {
        icon: chatsIcon,
        iconFocused: callsIcon,
        name: chatsListScreenName,
        component: ChatsScreen
    },
]

function TabBarIcon({focused, iconFocused, icon, isChat}) {
    const [generalUnreadMessagesCount, setGeneralUnreadMessagesCount] = useState(0)
    //
    // useEffect(() => {
    //     //     get permissions
    //     const getPermissions = async () => {
    //         const {status: cameraStatus} = await Camera.getCameraPermissionsAsync()
    //         if (cameraStatus !== 'granted') await requestCameraPermission()
    //         const {status: mediaStatus} = await MediaLibrary.getPermissionsAsync()
    //         if (mediaStatus !== 'granted') await requestMediaLibraryPermission()
    //         const {status: audioStatus} = await Audio.getPermissionsAsync()
    //         if (audioStatus !== 'granted') await requestAudioPermission();
    //         const {status: contactsStatus} = await Contacts.getPermissionsAsync();
    //         if (contactsStatus !== 'granted') await requestContactsPermission()
    //     }
    //
    //     getPermissions()
    // },[])


    return (
        !isChat ?
            <SvgImage id={focused ? iconFocused : icon}/> :
            <View>
                {/*{generalUnreadMessagesCount ?*/}
                {/*    <View style={styles.item}>*/}
                {/*        <Text style={styles.itemText}>{generalUnreadMessagesCount}</Text>*/}
                {/*    </View> : null}*/}
                <SvgImage id={focused ? iconFocused : icon}/>
            </View>
    )
}

function BottomTabNavigator() {
    const insets = useSafeAreaInsets();
    const homeIndicatorHeight = insets.bottom;

    return (
        <Tab.Navigator
            screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
            initialRouteName={chatsListScreenName}
        >
            {tabsArr.map(({icon, name, component, iconFocused}, index) => {
                const styleOptions = {
                    tabBarIcon: ({focused}) => <TabBarIcon
                        icon={icon}
                        focused={focused}
                        iconFocused={iconFocused}
                        isChat={name === chatsListScreenName}
                    />,
                    tabBarActiveTintColor: COLORS.green,
                    tabBarInactiveTintColor: COLORS.greenLight,
                    tabBarLabelStyle: {
                        ...styleFuncs.setFont([10,12],500,null),
                        marginTop: 4
                    },
                    tabBarStyle: {
                        paddingTop: 10,
                        paddingBottom: homeIndicatorHeight ? homeIndicatorHeight : 15,
                        backgroundColor: '#171717',
                        height: 73 + homeIndicatorHeight,
                    }
                }
                return (
                    <Tab.Screen
                        key={index.toString()}
                        name={name}
                        component={component}
                        options={styleOptions}
                    />
                )
            })}

        </Tab.Navigator>
    );
}
const notCountSize = styleFuncs.mediaStyle(15,20)

const styles = StyleSheet.create({
    item: {
        position: 'absolute',
        top: -3,
        right: -3,
        zIndex: 2,
        backgroundColor: COLORS.redLight,
        width: notCountSize,
        height: notCountSize,
        borderRadius: notCountSize/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        ...styleFuncs.setFont([10,12],500),
    }
})

export default BottomTabNavigator;
