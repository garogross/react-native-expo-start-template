export const getHoursAndMinutes = (created_at) => {
    const itemDate = new Date(created_at)
    const hours = itemDate.getHours().toString().padStart(2, '0')
    const minutes = itemDate.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

export const getDateString = (date, time, onlyMonth) => {
    const now = new Date()
    const yearNow = now.getFullYear()
    const monthNow = now.toLocaleString('default', {month: 'long'})
    const monthDateNow = now.getDate()
    const year = date.getFullYear()
    const month = date.toLocaleString('default', {month: 'long'})
    const monthDate = date.getDate()
    if (
        year === yearNow &&
        monthNow === month &&
        monthDate === monthDateNow) {
        return time || `Today`
    } else if (
        year === yearNow &&
        monthNow === month &&
        monthDate === monthDateNow - 1) {
        return `Yesterday`
    } else {
        return `${month}${!onlyMonth ? ` ${monthDate}` : ''}`
    }
}

export const sortByDate = (arr) => arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

export const addDatesInChat = (chat, sortByMonth, setDateFirst) => {

    let chatWithDate = [...chat];
    let addedDateCount = 0;

    const dateIso = (date) => {
        if(!date) return null;
        const isoDate = date.slice(0, 10)
        return sortByMonth ? isoDate.split('-')[1] : isoDate
    }

    chat.forEach((item, index, array) => {
        const condition = setDateFirst ?
            array.length === 1 ||
            array[index + 1] &&
            dateIso(array[index - 1]?.created_at) !== dateIso(item.created_at) ||
            !array[index + 1] && dateIso(array[index - 1].created_at) !== dateIso(item.created_at)
            :
            array[index - 1] &&
            dateIso(array[index - 1].created_at) !== dateIso(item.created_at)

        if (condition) {
            const dateIndex = setDateFirst ? index : index - 1
            const date = new Date(array[dateIndex].created_at)
            const dateText = getDateString(date, null, sortByMonth)
            chatWithDate = [
                ...chatWithDate.slice(0, index + addedDateCount),
                {id: date.getTime(), date: dateText},
                ...chatWithDate.slice(index + addedDateCount),
            ]
            addedDateCount += 1
        }
        if (!setDateFirst && index === array.length - 1) {
            const date = new Date(item.created_at)
            const dateText = getDateString(date)
            chatWithDate.push({id: `${date.getTime()}${Math.round(Math.random() * 200)}`, date: dateText})
        }
    })
    return chatWithDate;
}
