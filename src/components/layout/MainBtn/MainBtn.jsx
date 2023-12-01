import React from 'react';
import {Text, TouchableOpacity} from "react-native";
import {mainBtnStyles as styles} from "./MainBtnStyles";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../../../styles/styleVariables";

function MainBtn({onPress, children, styleProp,disabled, ...args}) {
    const disabledStyle = disabled ? styles.disabled : null

    return (
        <TouchableOpacity
            {...args}
            activeOpacity={0.6}
            onPress={onPress}
            disabled={disabled}
            style={[styles.mainBtn,disabledStyle, styleProp]}
        >
            <LinearGradient
                colors={[COLORS.greenDark, COLORS.green]}
                locations={[0.8,1]}
                style={styles.gradient}
            >
                <Text style={styles.mainBtnText}>{children}</Text>
            </LinearGradient>
        </TouchableOpacity>

    );
}

export default MainBtn;
