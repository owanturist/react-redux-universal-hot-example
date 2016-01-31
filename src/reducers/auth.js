import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from 'constants/auth';

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

const initialState = {
    loaded: false
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
                user: payload
            };
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: payload
            };
        case LOGIN:
            return {
                ...state,
                loggingIn: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                user: payload
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginError: payload
            };
        case LOGOUT:
            return {
                ...state,
                loggingOut: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggingOut: false,
                user: null
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loggingOut: false,
                logoutError: payload
            };
        default:
            return state;
    }
}

export function isLoaded(globalState) {
    return globalState.auth && globalState.auth.loaded;
}

export function load() {
    return {
        type: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        payload: client => client.get('/loadAuth')
    };
}

export function logout() {
    return {
        type: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
        payload: client => client.get('/logout')
    };
}
