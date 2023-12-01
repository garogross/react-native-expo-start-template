import Pusher from "pusher-js/react-native";
export const pusher = new Pusher('aa5394e1a5d1d7edc293', {
    cluster: 'ap2',
    encrypted: true,
});


export const bindPusherChannel = (channelName, eventName, callback) => {
    const channel = pusher.subscribe(channelName);
    channel.unbind_all();
    channel.bind(eventName, (channelData) => callback(channelData));
}
