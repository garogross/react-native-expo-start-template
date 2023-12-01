import React, {useEffect} from 'react';
import {SafeAreaView} from "react-native";

import glbStyles from "../styles/glbStyles";
import KeyboardConditionalView from "../components/layout/KeyboardConditionalView/KeyboardConditionalView";

function ChatsScreen() {

    useEffect(() => {
            // bindPusherChannel(`users${user.id}`, 'user-list', (channelData) => {
            //     if (Array.isArray(channelData?.message) && channelData?.message.length) {
            //         dispatch(getChannelListFromPusher(channelData))
            //     } else if (channelData.isDelete) {
            //         dispatch(deleteChannel(channelData.message, null))
            //     }
            // });
    }, []);
    return (
        <KeyboardConditionalView>
            <SafeAreaView style={glbStyles.safeArea}>
            </SafeAreaView>
        </KeyboardConditionalView>
    );
}

export default ChatsScreen;
