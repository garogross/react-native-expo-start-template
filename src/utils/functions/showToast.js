import Toast from "react-native-root-toast";
import {COLORS} from "../../styles/styleVariables";


export const showToast = (message) => Toast.show(message, {
    duration: Toast.durations.SHORT,
    backgroundColor: COLORS.white,
    textColor: COLORS.blackText
});
