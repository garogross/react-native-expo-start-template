import {combineReducers} from "redux"

import {voiceRecorderReducer} from "./voiceRecorderReducer";

export default combineReducers({
    voiceRecorder: voiceRecorderReducer,
})
