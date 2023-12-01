import {Keyboard} from "react-native";

export const keyboardDismiss = (clb) => {
    const isCallbackExist = clb && typeof clb === 'function'
    if(Keyboard.isVisible()) {
        Keyboard.dismiss()
        if(isCallbackExist) {
            setTimeout(() => clb(), 600)
        }
    } else {
        if(isCallbackExist) clb()
    }
}
