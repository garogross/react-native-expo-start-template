import * as Contacts from "expo-contacts";
import {Alert, Linking} from "react-native";
import {Camera} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {Audio} from "expo-av";


export const requestCameraPermission = async () => await Camera.requestCameraPermissionsAsync()
export const requestMediaLibraryPermission = async () => await MediaLibrary.requestPermissionsAsync()
export const requestAudioPermission = async () => await Audio.requestPermissionsAsync()
export const requestContactsPermission = async () => await Contacts.requestPermissionsAsync();


const alertPermissionWarning = (type) => {
    Alert.alert('Warning', `KHG Chat does not have access to your ${type}. To enable access, tap Settings.`, [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {text: 'Settings', onPress: Linking.openSettings},
    ]);
}

export const alertMediaPermissionWarning = () => {
    alertPermissionWarning('Media')
}

export const alertAudioPermissionWarning = () => {
    alertPermissionWarning('Audio')
}

export const alertCameraPermissionWarning = () => {
    alertPermissionWarning('Camera')
}

export const alertContactPermissionWarning = () => {
    alertPermissionWarning('Contacts')
}

export const alertNotificationPermissionWarning = () => {
    alertPermissionWarning('Notification')
}
