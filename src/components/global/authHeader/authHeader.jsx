import React from 'react';
import {View, StyleSheet, Pressable, Text} from "react-native";
import {COLORS, containerPadding} from "../../../styles/styleVariables";
import glbStyles from "../../../styles/glbStyles";
import {navigationGoBack} from "../../../router/navigationMethods";
import {styleFuncs} from "../../../styles/styleFunctions";

function AuthHeader({curPage, onDone}) {


    return (
        <View style={styles.container}>
            <View style={[styles.btnWrapper,{alignItems: 'flex-start'}]}>
                <Pressable
                    style={({pressed}) => styleFuncs.pressed(pressed)}
                    onPress={() => navigationGoBack()}
                >
                    <Text style={styles.btnText}>Back</Text>
                </Pressable>
            </View>
            <Text style={styles.btnText}>{curPage}</Text>
            <View style={[styles.btnWrapper,{alignItems: 'flex-end'}]}>
                <Pressable
                    onPress={onDone}
                    style={({pressed}) => styleFuncs.pressed(pressed)}>
                    <Text style={styles.btnText}>Done</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: containerPadding,
        paddingVertical: styleFuncs.mediaStyle(12, 15, 17),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.grey,
        ...glbStyles.greyBorderBottom,
    },
    btnWrapper:{
        flex: 1
    },
    title: {
        flex: 2,
    },
    btnText: {
        ...styleFuncs.setFont([17, 18, 19], 600),
    },
})
export default AuthHeader;
