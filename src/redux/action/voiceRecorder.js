import {
    SET_IS_RECORDING,
} from "../types";
export const setIsRecording = payload => (dispatch) => {
    dispatch({type: SET_IS_RECORDING,payload})
}
