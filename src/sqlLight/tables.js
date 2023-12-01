const chatCols = [
    ['id'],
    ['created_at'],
    ['group_id'],
    ['user_id'],
    ['images'],
    ['is_read'],
    ['is_send'],
    ['message'],
    ['receiver_id'],
    ['voice'],
    ['voiceFilteredData'],
    ['sender_id'],
    ['sender_name'],
    ['sender_avatar'],
    ['sender_phone'],
    ['voice_waveform']
]

export const tables = {
    channels: {
        name: 'channels',
        cols: [
            ['id'],
            ['bio'],
            ['avatar'],
            ['group_avatar'],
            ['group_id'],
            ['group_name'],
            ['last_images'],
            ['last_login'],
            ['last_message'],
            ['last_voice'],
            ['name'],
            ['seen_at'],
            ['unread_messages_count'],
            ['user_id'],
            ["folder_count"],
            ["folder_chat_count"],
            ["archived"],
            ["phone"],
            ["user_ids"],
            ["sender_id"],
            ["sender_phone"],
            ["sender_name"],
            ["is_read"],
            ["is_blocked"],
            ["created_at"]
        ]
    },
    groupMembers: {
        name: "groupMembers",
        cols: [
            ['id'],
            ['bio'],
            ['avatar'],
            ['name'],
            ["phone"],
            ["group_id"],
        ]
    },
    chats: {
        name: 'chat',
        cols: chatCols
    },
    archivedChats: {
        name: 'archivedChats',
        cols: chatCols
    },
    folders: {
        name: 'folders',
        cols: [
            ['id'],
            ['created_at'],
            ['name'],
            ['priority'],
            ['receiver_id'],
            ['sender_id'],
            ['group_id'],
            ['receiver_name'],
            ['updated_at'],
            ['user_id'],
            ['folder_chat_count']
        ]
    },
    folderChats: {
        name: 'folderChats',
        cols: [
            ...chatCols,
            ["folder_id"],
            ["is_assigned"],
        ]
    },
    registeredContacts: {
        name: 'registeredContacts',
        cols: [
            ['id'],
            ["name"],
            ["phone"],
            ["avatar"],
            ["bio"],
            ["created_at"],
        ]
    },
    notRegisteredContacts: {
        name: 'notRegisteredContacts',
        cols: [
            ['id'],
            ["name"],
            ["phone"],
        ]
    },
}
