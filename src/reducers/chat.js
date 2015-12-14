
export default (state = [], { type, payload }) => {
    switch (type) {
        case 'MESSAGE_RECEIVED':
            const newState = state.slice();
            newState[payload.id] = payload;
            return newState;
        default:
            return state;
    }
};
