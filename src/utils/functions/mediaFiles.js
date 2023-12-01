import * as ImagePicker from "expo-image-picker";
import {baseUrl} from "../../redux/action/fetchTools";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import {audiosFilePath, imagesFilePath} from "../../constants/constants";
import * as ImageManipulator from "expo-image-manipulator";
import {alertMediaPermissionWarning} from "./permissions";

export const pickImage = async (callback, multiSelect = false) => {
    const {status} = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alertMediaPermissionWarning()
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: multiSelect,
        quality: 0.5,
    });
    if (!result.canceled) {
        let resultData;
        resultData = result.assets.map(({uri, width, height, assetId}) => {
            const {name, type} = getSourceFromImgUri(uri)
            return {uri, name: name, width, height, type: type, assetId}
        })
        callback(multiSelect ? resultData : resultData[0])
    }
}

export const getMediaURI = (uri) => {
    return {uri: `${baseUrl}/${uri}`}
}

export const getSourceFromImgUri = (uri, type = 'image') => {
    const name = uri.slice(uri.lastIndexOf('/') + 1)
    const mimeType = uri.slice(uri.lastIndexOf('.') + 1)
    const typeCond = `${type}/${mimeType === 'jpg' ? 'jpeg' : mimeType}`.toLowerCase()
    return {uri, name, type: typeCond}
}

export const downloadAndSaveFiles = async (urls, path, callback) => {
    if (urls?.length) {
        const dirInfo = await FileSystem.getInfoAsync(path);
        if (!dirInfo.exists || !dirInfo.isDirectory) {
            await FileSystem.makeDirectoryAsync(path, {intermediates: true});
        }
        const downloadPromises = await urls.map(item => {
            const {name} = getSourceFromImgUri(item)
            return FileSystem.downloadAsync(getMediaURI(item).uri, `${path}${name}`)
        })
        const downloadedFiles = await Promise.all(downloadPromises)
        const {status: getStatus} = await MediaLibrary.getPermissionsAsync()
        if (getStatus !== 'granted') {
            const {status: requestStatus} = MediaLibrary.getPermissionsAsync()
            if (requestStatus !== 'granted') {
                alertMediaPermissionWarning()
            }
        }
        if (path !== audiosFilePath) {
            const savePromises = downloadedFiles.map((file) => MediaLibrary.saveToLibraryAsync(file.uri));
            await Promise.all(savePromises);
        }
        if (callback) callback()
    }
}

export const addLocalFiles = (arr) => {
    return arr.map(item => {
        return {
            ...item,
            images: item?.images?.length ?
                item.images.map(img => {
                    if (img.startsWith('file://')) {
                        return img
                    }
                    else {
                        const {name} = getSourceFromImgUri(img)
                        return `${imagesFilePath}${name}`
                    }
                }) : null,
            voice: item?.voice ? `${audiosFilePath}${getSourceFromImgUri(item?.voice).name}` : null
        }
    })
}

export const downloadFilesFromChat = async (curLocData, resData) => {
    if (curLocData !== undefined) {
        const images = resData.filter(item => item?.images?.length)
        const audios = resData.filter(item => item?.voice)

        const getDownloadUrls = (urls, checkValue) => {
            return urls.filter(item => !curLocData?.find(locItem => +locItem.id === +item.id)?.[checkValue])
                .map(item => item[checkValue]).flat()
        }
        await downloadAndSaveFiles(getDownloadUrls(images, 'images'), imagesFilePath);
        await downloadAndSaveFiles(getDownloadUrls(audios, 'voice'), audiosFilePath);
    }
}

export const compressImage = async (uris, onFinish, width = 400, compress = 0.7) => {
    const compressPromises = await uris.map(uri => (
        ImageManipulator.manipulateAsync(
            uri,
            [{resize: {width}}],
            {compress, format: ImageManipulator.SaveFormat.JPEG}
        )
    ))
    const compressedUris = await Promise.all(compressPromises);
    onFinish(compressedUris.map(item => item.uri))
}
