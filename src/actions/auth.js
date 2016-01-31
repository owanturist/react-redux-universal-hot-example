import * as api from 'api';

import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL
    } from 'constants/auth';

export function login(name) {
    return {
        type: [ LOGIN, LOGIN_SUCCESS, LOGIN_FAIL ],
        payload: () => api.login(name)
    };
}

export function logout() {
    return {
        type: [ LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL ],
        payload: () => api.logout()
    };
}
