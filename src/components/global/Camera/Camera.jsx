import React, {useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {alertCameraPermissionWarning} from "../../../utils/functions/permissions";
import * as MediaLibrary from 'expo-media-library';
import {CameraType, Camera, FlashMode} from "expo-camera";
import {
    BackHandler,
    Modal,
    Pressable,
    SafeAreaView,
    View, FlatList, Image, Text
} from "react-native";

import SvgImage from "../../../assets/SvgImage";

import {
    cameraFlashIcon,
    cameraFlashIconActive,
    crossIcon,
    galleryIcon,
    rotateCameraIcon
} from "../../../assets/svg";
import {COLORS} from "../../../styles/styleVariables";
import {cameraStyles as styles} from "./cameraStyles";
import {styleFuncs} from "../../../styles/styleFunctions";
import {compressImage, pickImage} from "../../../utils/functions/mediaFiles";

function CameraView({
                        visible,
                        setVisible,
                        onTakePicture,
                        multiSelectDisabled,
                        imageWidth,

                    }) {
    const insets = useSafeAreaInsets();
    const distanceToHomeIndicator = insets.bottom;
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState("off");
    const [isPermissionAccepted, setIsPermissionAccepted] = useState(false)
    const [galleryImages, setGalleryImages] = useState([])
    const cameraRef = useRef(null)

    useEffect(() => {
        getGalleryImages();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', onCloseCamera)
        return () => backHandler.remove();
    }, [])

    const getGalleryImages = async () => {
        const {assets} = await MediaLibrary.getAssetsAsync({
            mediaType: 'photo',
            sortBy: MediaLibrary.SortBy.creationTime,
        });

        setGalleryImages(assets.map(({id, uri}) => {
            return {
                id, uri
            }
        }));
    };

    useEffect(() => {
        if (visible) {
            (async () => {
                const {status} = await Camera.getCameraPermissionsAsync()
                if (status === 'granted') {
                    setIsPermissionAccepted(true)
                } else {
                    alertCameraPermissionWarning()
                }
            })()
        }
    }, [visible])


    const sendResultImages = async (uris) => {
        await compressImage(uris,(imgs) => onTakePicture(imgs),imageWidth || undefined)
    }

    const onCloseCamera = () => {
        setVisible(false)
        return true;
    }

    const switchFlashMode = () => {
        const {torch, off} = FlashMode
        setFlashMode(flashMode === off ? torch : off);
    }
    const switchType = () =>
        setCameraType(prevState => prevState === CameraType.back ? CameraType.front : CameraType.back);

    const onPressImage = async (id) => {
        const source = await MediaLibrary.getAssetInfoAsync(id)
        onCloseCamera()
        await sendResultImages([source.localUri])
    }

    const onPickImage = (result) => {
        const sendData = !multiSelectDisabled ? result.map(({uri}) => uri) : [result.uri]
        onCloseCamera()
        sendResultImages(sendData)
    }
    const takePicture = async () => {
        const {uri} = await cameraRef?.current.takePictureAsync({quality: 0.1});
        await sendResultImages([uri])
        setVisible(false)

    };
    return (
        <Modal
            animationType={'slide'}
            visible={visible && isPermissionAccepted}
            onRequestClose={() => setVisible(false)}
        >
            <View style={{backgroundColor: COLORS.blackBg, flex: 1}}>
                <SafeAreaView style={{flex: 1}}>
                    <Camera
                        style={[styles.camera]}
                        ref={cameraRef}
                        type={cameraType}
                        flashMode={flashMode}
                    >
                        <View style={styles.header}>
                            <Pressable
                                onPress={onCloseCamera}
                                style={({pressed}) => styleFuncs.pressed(pressed, styles.goBackBtn)}
                            >
                                <SvgImage
                                    id={crossIcon}
                                    width={17}
                                    height={17}
                                    color={COLORS.white}
                                />
                            </Pressable>
                            <Pressable
                                style={({pressed}) => styleFuncs.pressed(pressed, styles.flashBtn)}
                                onPress={switchFlashMode}
                            >
                                <SvgImage id={
                                    flashMode === FlashMode.torch ?
                                        cameraFlashIconActive :
                                        cameraFlashIcon}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.bottomBlock}>
                            <View style={styles.imageListHeader}></View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                contentContainerStyle={{gap: 4}}
                                data={galleryImages}
                                keyExtractor={item => item.id}
                                getItemLayout={(data, index) => ({length: 80, offset: 80 * index, index})}
                                renderItem={({item}) => (
                                    <Pressable
                                        style={({pressed}) => styleFuncs.pressed(pressed, styles.galleryImageBtn)}
                                        onPress={() => onPressImage(item.id)}
                                    >
                                        <Image
                                            resizeMode={'contain'}
                                            source={{uri: item.uri}}
                                            style={styles.galleryImage}
                                        />
                                    </Pressable>
                                )}
                            />
                            <View style={[styles.cameraTools]}>
                                <Pressable
                                    onPress={() => pickImage(onPickImage,!multiSelectDisabled)}
                                    style={({pressed}) => styleFuncs.pressed(pressed, styles.galleryBtn)}
                                >
                                    <SvgImage id={galleryIcon}/>
                                </Pressable>
                                <Pressable
                                    style={({pressed}) => styleFuncs.pressed(pressed, styles.takePictureButton)}
                                    onPress={takePicture}
                                ></Pressable>
                                <Pressable
                                    style={({pressed}) => styleFuncs.pressed(pressed, styles.typeBtn)}
                                    onPress={switchType}
                                >
                                    <SvgImage id={rotateCameraIcon}/>
                                </Pressable>
                            </View>
                            <View style={[styles.footer,{paddingBottom: 27 + distanceToHomeIndicator}]}>
                                <Text style={styles.footerText}>Hold for video, tap for photo</Text>
                            </View>
                        </View>
                    </Camera>
                </SafeAreaView>
            </View>
        </Modal>
    );
}

export default CameraView;
