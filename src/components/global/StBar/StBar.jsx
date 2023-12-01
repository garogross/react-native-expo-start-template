import React from 'react';
import { COLORS} from "../../../styles/styleVariables";
import {SafeAreaView, StatusBar} from "react-native";

function StBar({backgroundColor,barStyle}) {
    return (
        <SafeAreaView style={{backgroundColor: COLORS.grey}}>
        <StatusBar
            backgroundColor={backgroundColor || COLORS.grey}
            barStyle={barStyle || 'light-content'}
        />
        </SafeAreaView>
    );
}

export default StBar;