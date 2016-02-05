const LOAD = 'redux-example/widgets/LOAD';
const LOAD_SUCCESS = 'redux-example/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/widgets/LOAD_FAIL';
const EDIT_START = 'redux-example/widgets/EDIT_START';
const EDIT_STOP = 'redux-example/widgets/EDIT_STOP';
const SAVE = 'redux-example/widgets/SAVE';
const SAVE_SUCCESS = 'redux-example/widgets/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/widgets/SAVE_FAIL';

const initialState = {
    loaded: false,
    editing: {},
    saveError: {}
};

export default function reducer(state = initialState, { type, payload }) {
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
                data: payload,
                error: null
            };
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                data: null,
                error: payload
            };
        case EDIT_START:
            return {
                ...state,
                editing: {
                    ...state.editing,
                    [payload]: true
                }
            };
        case EDIT_STOP:
            return {
                ...state,
                editing: {
                    ...state.editing,
                    [payload]: false
                }
            };
        case SAVE:
            return state; // 'saving' flag handled by redux-form
        case SAVE_SUCCESS:
            const data = [...state.data];
            data[payload.id - 1] = payload;
            return {
                ...state,
                data: data,
                editing: {
                    ...state.editing,
                    [payload]: false
                },
                saveError: {
                    ...state.saveError,
                    [payload]: null
                }
            };
        case SAVE_FAIL:
            return typeof payload === 'string' ? {
                ...state,
                saveError: {
                    ...state.saveError,
                    [payload]: payload
                }
            } : state;
        default:
            return state;
    }
}

export function load() {
    return {
        type: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        payload: (client) => client.get('/widget/load/param1/param2') // params not used, just shown as demonstration
    };
}
