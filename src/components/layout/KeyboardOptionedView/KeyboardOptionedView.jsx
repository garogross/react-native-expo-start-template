import React from 'react';
import {KeyboardAvoidingView, Platform} from "react-native";

function KeyboardOptionedView({children}) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : "padding"}
            style={{flex: 1}}
            keyboardVerticalOffset={20}
        >{children}</KeyboardAvoidingView>
    );
}

export default KeyboardOptionedView;
