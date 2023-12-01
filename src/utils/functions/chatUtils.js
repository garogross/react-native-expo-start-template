import {tables} from "../../sqlLight/tables";
import {costomizeVoiceWaveformData} from "../../redux/action/chats";
import {addLocalFiles, downloadFilesFromChat} from "./mediaFiles";
import {sortByDate} from "./date";
import {GET_FOLDER_CHAT_SUCCESS} from "../../redux/types";
import sqlQueries from "../../sqlLight/queries";

export const generateMessage = (data, userId) => {
    const fakeId = `${Date.now().toString()}${Math.round(Math.random() * 200)}`;
    const now = new Date()
    const nowIso = now.toISOString()

    const result = {
        id: fakeId,
        sender_id: userId,
        message: data.message,
        images: data.images ? data.images.map(item => item.uri) : null,
        voice: data.voice ? data.voice.uri : null,
        receiver_id: data.receiver_id,
        user_id: data.receiver_id,
        group_id: data.group_id,
        created_at: nowIso,
        is_send: false,
        is_read: false,
        voice_waveform: null
    }

    return ({
        fakeId,
        data: data.folder_id ? {...result, folder_id: data.folder_id} : result
    })
}

export const createChatFormData = (data,currFormData) => {
    const formData = currFormData || new FormData();
    for (const key in data) {
        if (key === 'group_id' && !data[key]) {
            continue
        } else if (key === 'receiver_id' && data.group_id) {
            continue
        } else if (data[key] === null) {
            formData.append(key, '');
        } else if (key.includes('images') && data[key]?.length) {
            for (let i = 0; i < data[key].length; i++) {
                formData.append(`${key}[]`, data[key][i])
            }
        } else {
            formData.append(key, data[key]);
        }
    }

    return formData
}

export const newChatItem = (item) => {
    let data = {
        id: +item?.collect || item.id,
        sender_id: item.sender_id,
        user_id: item?.user_id || null,
        message: item?.message || null,
        images: item?.images || null,
        voice: item?.voice || null,
        voice_waveform: item?.voice_waveform || item?.voiceFilteredData || null,
        receiver_id: item?.receiver_id || null,
        group_id: item?.group_id || null,
        created_at: item.created_at,
        is_send: item?.is_send !== undefined ? item?.is_send : true,
        is_read: item?.is_read && item?.is_read !== '0' || false,
    }
    if (item?.folder_id) {
        data = {...data, folder_id: item.folder_id}
    }
    if (item?.group_id) {
        data = {
            ...data,
            sender_name: item?.sender?.name || item.sender_name || '',
            sender_avatar: item?.sender?.avatar || item.sender_avatar || '',
            sender_phone: item?.sender?.phone || item.sender_phone || '',
        }
    }
    return data
}

export const saveChatMessages = (
    fetchData,
    localData,
    userId,
    groupId,
    receiverId,
    allSean,
    onSaveInStore,
    onAddNewDataInLocStore,
    onUpdateLocStore,
) => {
    let oldData;
    let isReadMessage = false
    const resData = fetchData?.filter(item => +item.sender_id !== userId)

    const onSuccess = (isReadMessage, fullData, newData) => {
        onSaveInStore(fullData) // dispatch(getNewMessages(fullData, nextPageData, isPagination))
        if (!fullData) return;
        if (!isReadMessage && newData) {
            onAddNewDataInLocStore(newData) // saveDataInLocStore(name, cols, newData, null, true)
        } else {
            onUpdateLocStore(fullData) // saveDataInLocStore(name, cols, fullData, deleteWhere, false)
        }
    }

    if (
        allSean &&
        localData?.length &&
        !localData[0]?.is_read &&
        (resData.length ||
        !fetchData.find(item => +item.id === +localData[0].id))
    ) {
        oldData = localData.map(item => ({...item, is_read: true}))
        isReadMessage = !fetchData.length
    } else {
        oldData = localData
    }

    if (!resData?.length) {

        return onSuccess(isReadMessage, oldData)
    }
    const configuredResData = resData
        .map((item) => {
            const isReadProp = groupId ? item.all_read : +item.is_read
            const voice_waveform = costomizeVoiceWaveformData(item?.voiceFilteredData || item?.voice_waveform)

            return {
                ...newChatItem(item),
                user_id: receiverId,
                is_read: !!(isReadProp),
                voice_waveform
            }
        })
    const newData = addLocalFiles(configuredResData)
    const newDataIds = newData.map(item => item.id)
    const filteredOldData = oldData.filter(oldItem => !newDataIds.includes(oldItem.id))

    // download images and audios to phone
    downloadFilesFromChat(filteredOldData, resData)

    const sortedByDateData = sortByDate([...newData, ...filteredOldData])

    onSuccess(isReadMessage, sortedByDateData, newData)
}

