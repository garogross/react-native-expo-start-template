import React from 'react';
import {StyleSheet,  View} from "react-native";


import MainBtn from "../components/layout/MainBtn/MainBtn";

import {COLORS, containerPadding} from "../styles/styleVariables";
import glbStyles from "../styles/glbStyles";
import {styleFuncs} from "../styles/styleFunctions";
import {useDispatch, useSelector} from "react-redux";

function CallsScreen() {
    const dispatch = useDispatch()
    const devicePushToken = useSelector(state => state.user.devicePushToken)

    return (
        <>
            <View style={{backgroundColor: COLORS.blackBg, flex: 1, marginTop: 100}}>
            <MainBtn
                    // onPress={() => dispatch(removeToken())}
                >Logout</MainBtn>
                <MainBtn
                    // onPress={() => dispatch(clearData(true))}
                >Delete DB</MainBtn>
            </View>

        </>
            );
            }


            const styles = StyleSheet.create({
            container: {
            flex: 1,
            ...glbStyles.centeredColumnFlex,
            backgroundColor: COLORS.blackBg,
            paddingHorizontal: containerPadding
        },
            text: {
                ...styleFuncs.setFont(14),
        },
            textItem: {
            display: 'block',
            marginBottom: 12
        }
        })
            export default CallsScreen;
