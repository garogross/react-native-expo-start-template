export const setDeleteOptions = (onDeleteForMe, onDeleteForEveryone) => ([
    {
        name: onDeleteForMe ? 'For Me' : null,
        onPress: onDeleteForMe
    },
    {
        name: onDeleteForEveryone ? 'For Everyone' : null,
        onPress: onDeleteForEveryone
    },
].filter(item => item.name))
