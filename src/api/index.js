import request from './request';

export login from './login';
export logout from './logout';
export loadAuth from './loadAuth';
export loadInfo from './loadInfo';

export function loadWidgets() {
    return request('widget/load/param1/param2');
}

export function updateWidget(data) {
    return request('widget/update', { method: 'post' }, data);
}
