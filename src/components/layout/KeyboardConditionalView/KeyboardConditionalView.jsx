import React from 'react';
import {Platform} from "react-native";
import KeyboardOptionedView from "../KeyboardOptionedView/KeyboardOptionedView";

function KeyboardConditionalView({children}) {
    if (Platform.OS === 'ios') {
        return (
            <KeyboardOptionedView>
                {children}
            </KeyboardOptionedView>
        )
    } else {
        return <>{children}</>
    }
}

export default KeyboardConditionalView;
