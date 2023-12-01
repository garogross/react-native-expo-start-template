import {Alert} from "react-native";


export const findCurrUser = (data, groupId, userId, method, getOthers) => {

    const clb = item => {
        let condition;
        if(method === 'filter') {
            condition = groupId ?
                !item?.user_id && item?.group_id == groupId :
                !item?.group_id && item?.user_id == userId

        } else {
            condition = groupId ?
                item?.group_id && item?.group_id == groupId :
                item?.user_id && item?.user_id == userId
        }


        return condition === !getOthers
    }
    const findMethod = !method ? 'find' : method
    return data[findMethod](clb)

}

export const getAllContactedUsers = (contactedUsers, registeredContacts) => {
    const filteredContactedUsers = contactedUsers
        .filter(item => item.user_id)
        .map(({user_id, name, avatar, phone}) => ({id: user_id, name, avatar, phone}))
    const filteredRegisteredContacts = registeredContacts ?
        registeredContacts.filter(user => contactedUsers && !contactedUsers?.find(item => item.user_id == user.id)) :
        []

    return [...filteredContactedUsers, ...filteredRegisteredContacts]
}

export const alertTokenError = (err, removeToken) => {
    if (err?.message?.error === 'Unauthorized.' || err.message.error === 'Unauthenticated.') {
        Alert.alert('Warning', 'Something went wrong with the login process.Please login again', [
            {text: 'OK', onPress: removeToken},
        ]);
    }
}








