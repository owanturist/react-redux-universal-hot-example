import MESSAGE_RECEIVED from 'constants/chat';

export default (state = [], { type, payload }) => {
    switch (type) {
        case MESSAGE_RECEIVED:
            return [
                ...state.slice(0, payload.id),
                payload,
                ...state.slice(payload.id + 1)
            ];
        default:
            return state;
    }
};
