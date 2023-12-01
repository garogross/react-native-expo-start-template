import React, {useEffect, useRef} from 'react';
import {TextInput, StyleSheet, View} from "react-native";

import SvgImage from "../../../assets/SvgImage";

import {
    COLORS, containerPadding
} from "../../../styles/styleVariables";
import {arrowRight} from "../../../assets/svg";
import {styleFuncs} from "../../../styles/styleFunctions";

function
MainInput({styleProp, isInvalid, focusOnMount, textAreaHeight, withoutArrow, ...attrs}) {
    const inputRef = useRef(null)

    useEffect(() => {
        if (focusOnMount) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [])
    return (
        <View style={[styles.containerInner, {
            alignItems: !textAreaHeight ? 'center' : 'flex-start',
            borderColor: isInvalid ? COLORS.redLight : COLORS.placeholderColor
        }, styleProp]}>
            <TextInput
                placeholderTextColor={COLORS.white40()}
                ref={inputRef}
                style={[
                    styles.input,
                    {
                        height: textAreaHeight || 'auto',
                        textAlignVertical: textAreaHeight ? 'top' : 'center'
                    },
                ]}
                multiline={!!(textAreaHeight)}
                {...attrs}
            />
            {!textAreaHeight && !withoutArrow ?
                <SvgImage
                    id={arrowRight}
                    width={7}
                    height={13}
                /> : null}
        </View>
    );
}

const styles = StyleSheet.create({

    containerInner: {
        backgroundColor: COLORS.grey,
        borderBottomWidth: 0.33,
        borderTopWidth: 0.33,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 8,
        paddingBottom: 10,
        paddingHorizontal: containerPadding,
    },
    input: {
        paddingVertical: styleFuncs.mediaStyle(3, 4),
        ...styleFuncs.setFont(16),
        flex: 1,
    },
})

export default MainInput;
