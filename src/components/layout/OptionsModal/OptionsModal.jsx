import React from 'react';
import {FlatList, Text, View, StyleSheet, Pressable} from "react-native";
import { COLORS, screenWidth} from "../../../styles/styleVariables";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Backdrop from "../Backdrop/Backdrop";

import {styleFuncs} from "../../../styles/styleFunctions";

function OptionsModal({
                          optionsArr,
                          styleProp,
                          onClose,
                          visible
                      }) {

    const insets = useSafeAreaInsets();
    const homeIndicatorHeight = insets.bottom;

    return (
        <Backdrop visible={visible} onClose={onClose}>
            <View
                style={[styles.optionsModal, {bottom: 65 + homeIndicatorHeight}, styleProp]}
            >
                <View style={styles.flatList}>
                    <FlatList
                        data={optionsArr}
                        renderItem={({item, index}) => (
                            <Pressable
                                android_ripple={{color: COLORS.grey}}
                                style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}
                                onPress={() => {
                                    item.onPress ? item.onPress() : null
                                    if (!item.notClose && onClose) onClose()
                                }}
                            >
                                <Text
                                    style={[styles.optionsModalItem, item?.style, {borderTopWidth: index === 0 ? 0 : 0.33}]}>{item.name}</Text>
                            </Pressable>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <Pressable
                    style={styles.cancelBtn}
                    onPress={onClose}
                >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </Pressable>
            </View>
        </Backdrop>
    );
}

const styles = StyleSheet.create({
    optionsModal: {
        width: screenWidth - 16,
        marginHorizontal: 8,
        marginBottom: 20,
        position: 'absolute',
    },
    flatList: {
        borderRadius: 16,
        backgroundColor: COLORS.blackBg,
        marginBottom: 8,
    },
    optionsModalItem: {
        paddingVertical: 13,
        paddingHorizontal: 12,
        ...styleFuncs.setFont(16,300,COLORS.greenLight),
        borderColor: COLORS.greenLight
    },
    cancelBtn: {
        width: '100%',
        backgroundColor: COLORS.blackBg,
        borderRadius: 10,
        paddingVertical: 13,
    },
    cancelBtnText: {
        textAlign: 'center',
        ...styleFuncs.setFont(16,400,COLORS.green),
    },
})

export default OptionsModal;
