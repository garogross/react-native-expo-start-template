import {pusher} from "../pusher/pusher";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export const usePusherChannel = (channelName,channelKey,callback) => {
    const {user} = useSelector(state => state.user)
    const channel = pusher.subscribe(channelName);

    useEffect(() => {
        if (user) {
            channel.unbind_all();
            channel.bind(channelKey, (data) => callback(data));
        }
    }, [user]);

    useEffect(() => {
        return () => {
            channel.unsubscribe()
        }
    }, [])
}
