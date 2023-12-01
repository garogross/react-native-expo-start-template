import {
    INIT_VOICE_RECORDING,
    SET_AUDIO_BLOCK_MODE, SET_IS_PLAYING,
    SET_IS_RECORDING,
    SET_RECORDING,
    SET_RECORDING_PAUSED,
    SET_VOICE_CHARTS,
    SET_VOICE_RELEASED
} from "../types";


const initialState = {
    isRecording: false,
}

export const voiceRecorderReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case SET_IS_RECORDING: {
            return {
                ...state,
                isRecording: payload
            }
        }
        default:
            return state
    }
}
