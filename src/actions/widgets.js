import * as api from 'api';

import {
    LOAD, LOAD_SUCCESS, LOAD_FAIL,
    SAVE, SAVE_SUCCESS, SAVE_FAIL,
    EDIT_START, EDIT_STOP
    } from 'constants/widgets';

export function load() {
    return {
        type: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ],
        payload: () => api.loadWidgets()
    };
}

export function save(widget) {
    return {
        type: [ SAVE, SAVE_SUCCESS, SAVE_FAIL ],
        payload: () => api.updateWidget(widget)
    };
}

export function editStart(id) {
    return {
        type: EDIT_START,
        payload: id
    };
}

export function editStop(id) {
    return {
        type: EDIT_STOP,
        payload: id
    };
}

export function isLoaded({ widgets = {} }) {
    return widgets.loaded;
}
