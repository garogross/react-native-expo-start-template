import React, {useState} from 'react';
import {Image, Pressable, Text, View,StyleSheet} from "react-native";

import CrossBtn from "../CrossBtn/CrossBtn";
import CameraView from "../../global/Camera/Camera";

import {COLORS} from "../../../styles/styleVariables";
import glbStyles from "../../../styles/glbStyles";
import {styleFuncs} from "../../../styles/styleFunctions";

function PickAvatarField({avatar,onCancel,onUploadAva,styleProp}) {
    const [cameraOpened,setCameraOpened] = useState(false)

    return (
        <>
            <View style={[styles.addPicBlock,styleProp]}>
                <View style={styles.addPicBtnContainer}>
                    {
                        avatar ?
                            <CrossBtn
                                styleProp={styles.cancelBtn}
                                onPress={onCancel}
                            /> : null}
                    <Pressable
                        onPress={() => setCameraOpened(true)}
                        style={styles.uploadPicBtn}
                    >
                        {
                            avatar ?
                                <Image source={avatar} style={styles.avatarImg}/> :
                                <Text style={styles.uploadPicText}>Add picture</Text>

                        }
                    </Pressable>
                </View>
            </View>
            <CameraView
                visible={cameraOpened}
                setVisible={setCameraOpened}
                onTakePicture={onUploadAva}
                multiSelectDisabled={true}
                imageWidth={100}
            />
        </>
    );
}

const styles = StyleSheet.create({
    addPicBlock: {
        backgroundColor: COLORS.grey,
    },
    addPicBtnContainer: {
        width: 74,
        height: 74,
        overflow: "hidden",
    },
    cancelBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 888
    },
    uploadPicBtn: {
        width: 74,
        height: 74,
        borderRadius: 37,
        borderColor: COLORS.white,
        borderWidth: 1,
        ...glbStyles.centeredColumnFlex,
        overflow: "hidden"
    },
    uploadPicText: {
        ...styleFuncs.setFont(12,300),
        textAlign: 'center'
    },
    avatarImg: {
        resizeMode: "cover",
        width: '100%',
        height: '100%'
    },
})

export default PickAvatarField;
