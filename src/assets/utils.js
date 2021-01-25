function generateRandomString(length) {
    let result = '';
    const characters = [...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'];

    for ( let i = 0; i < length; i++ ) {
        const charIndex = Math.floor(Math.random() * characters.length);
        result += characters[charIndex];
    }

    return result;
}

const WSMessageTypes = {
    PARTICIPANT_UPDATE: 'participant_update',
    INCOMING_MESSAGE: 'incoming_message'
}

const SOCKET_PORT = 9999;

function formatMessageTime(time = 0) {
    const dateObj = new Date(time);
    return `${('0' + dateObj.getHours()).slice(-2)}:${('0' + dateObj.getMinutes()).slice(-2)}`;
}

export {
    generateRandomString,
    WSMessageTypes,
    SOCKET_PORT,
    formatMessageTime,
}