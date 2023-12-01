import {StyleSheet} from "react-native";
import {
    COLORS,
    containerPadding,
    containerWidth,
} from "./styleVariables";
import {styleFuncs} from "./styleFunctions";

const glbStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS.blackBg,
        paddingLeft: containerPadding,
        paddingRight: containerPadding,
        paddingBottom: 16,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.blackBg
    },
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.grey
    },
    rowFlexBetween: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    centeredRowFlex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center'
    },
    centeredColumnFlex: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
    },
    greyBorderTop: {
        borderTopWidth: 0.33,
        borderTopColor: COLORS.white40(),
        borderStyle: "solid"
    },
    greyBorderBottom: {
        borderBottomWidth: 0.33,
        borderBottomColor: COLORS.white40(),
        borderStyle: "solid"
    },
    popup: {
        width: containerWidth,
        marginLeft: containerPadding,
        marginRight: containerPadding,
        backgroundColor: COLORS.blackBg,
        borderRadius: 10,
        paddingLeft: 16,
        paddingRight: 16,
    },
    warningModalGreyBox: {
        backgroundColor: COLORS.grey,
        paddingHorizontal: containerPadding / 2,
        paddingVertical: 12,
        borderRadius: 3
    },
    warningModalGreyBoxTextBlock: {
        paddingHorizontal: containerPadding / 2
    },
    warningModalTitle: {
        ...styleFuncs.setFont(22,500),
        textAlign: 'center',
        marginBottom: 20
    },
    warningModalGreyBoxText: {
        ...styleFuncs.setFont(14, 500),
        marginBottom: 10
    },

});


export default glbStyles
