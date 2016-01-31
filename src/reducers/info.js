const LOAD = 'redux-example/LOAD';
const LOAD_SUCCESS = 'redux-example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_FAIL';

const initialState = {
    loaded: false
};

export default function info(state = initialState, { type, payload }) {
    switch (type) {
        case LOAD:
            return {
                ...state,
                loading: true
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: payload
            };
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: payload
            };
        default:
            return state;
    }
}

export function isLoaded(globalState) {
    return globalState.info && globalState.info.loaded;
}

export function load() {
    return {
        type: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        payload: client => client.get('/loadInfo')
    };
}
