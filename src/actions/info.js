import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from 'constants/info';

export function load() {
    return {
        type: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ],
        payload: api => api.loadInfo()
    };
}

export function isLoaded({ info = {} }) {
    return info.loaded;
}
