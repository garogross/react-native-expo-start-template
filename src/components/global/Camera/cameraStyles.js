import {StyleSheet} from "react-native";
import {COLORS, containerPadding} from "../../../styles/styleVariables";
import glbStyles from "../../../styles/glbStyles";
import {styleFuncs} from "../../../styles/styleFunctions";

export const cameraStyles = StyleSheet.create({
    camera: {
        width: '100%',
        height: '100%',
    },
    bottomBlock: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    imageListHeader: {
        width: 37,
        height: 5,
        borderRadius: 2,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        marginBottom: 14
    },
    cameraTools: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        paddingVertical: 10,
        ...glbStyles.rowFlexBetween,
        marginTop: 25
    },
    header: {
        backgroundColor: COLORS.blackBg,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        paddingVertical: 12,
        paddingHorizontal: containerPadding / 2,
        ...glbStyles.rowFlexBetween
    },
    goBackBtn: {
        padding: containerPadding / 2
    },
    flashBtn: {
        paddingHorizontal: containerPadding / 2
    },
    galleryImage: {
        width: 81,
        height: 81,
        backgroundColor: COLORS.grey
    },
    takePictureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: COLORS.white,
        ...glbStyles.centeredColumnFlex
    },
    takePictureButtonInner: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: COLORS.white,
    },
    footer: {
        backgroundColor: '#000',
        paddingTop: 16
    },
    footerText: {
        ...styleFuncs.setFont(12,400,'#fff'),
        alignSelf: "center"
    },
})