import MESSAGE_RECEIVED from 'constants/chat';

export function messageReceived(message) {
    return {
        type: MESSAGE_RECEIVED,
        payload: message
    };
}
