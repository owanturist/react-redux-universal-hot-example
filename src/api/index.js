import request from './request';

export function loadWidgets() {
    return request('widget/load/param1/param2');
}

export function updateWidget(data) {
    return request('widget/update', { method: 'post' }, data)
        .then(result => {
            if (result && typeof result.error === 'object') {
                return Promise.reject(result.error);
            }
        });
}

export function loadAuth() {
    return request('loadAuth');
}

export function loadInfo() {
    return request('loadInfo');
}

export function login(name) {
    return request('login', { method: 'post' }, { name });
}

export function logout() {
    return request('logout');
}
