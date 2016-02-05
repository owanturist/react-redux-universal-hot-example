import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from 'constants/info';

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
