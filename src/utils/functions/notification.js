import {Audio} from "expo-av";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {Platform} from "react-native";
import {alertNotificationPermissionWarning} from "./permissions";

const setDevicePushToken = () => {}

export const playNotificationSound = async (soundUri) => {
    try {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(soundUri);
        await soundObject.playAsync();
    } catch (error) {
        // Handle error
        console.error('Error playing notification sound:', error);
    }
};


export const registerForPushNotifications = async () => {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alertNotificationPermissionWarning()
            return;
        }

        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });


        if(token) setDevicePushToken(token.data)
    } else {
        if(!__DEV__) alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token.data;
};

export async function sendPushNotification(token) {
    const message = {
        to: token,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };
        const response =  await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });

    const data = await response.json()
}
