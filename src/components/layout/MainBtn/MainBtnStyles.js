import {StyleSheet} from "react-native";
import {borderRadiusField, COLORS, regularFont} from "../../../styles/styleVariables";
import glbStyles from "../../../styles/glbStyles";
import {styleFuncs} from "../../../styles/styleFunctions";

export const mainBtnStyles = StyleSheet.create({
    mainBtn: {
        width: '100%',
        backgroundColor: COLORS.green,
        borderRadius: borderRadiusField,
        outlineColor: "#523009",
        outlineStyle: "solid",
        outlineWidth: 4,
    },
    gradient: {
        paddingHorizontal: 10,
        paddingVertical: styleFuncs.mediaStyle(10,12,13),
        borderRadius: borderRadiusField,
    },
    mainBtnText: {
        ...styleFuncs.setFont([17,18]),
        textAlign: "center",
    },
    disabled: {
        padding: 0.5,
        backgroundColor: COLORS.white
    }
})
