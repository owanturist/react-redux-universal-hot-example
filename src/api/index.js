import request from './request';

export default class Api {
    constructor(req) {
        this.req = req;
    }

    request(url, params, data) {
        const cookie = __SERVER__ ? this.req.get('cookie') : null;

        return request(url, { ...params, headers: { cookie }}, data);
    }

    login(name) {
        return this.request('login', { method: 'post' }, { name });
    }

    logout() {
        return this.request('logout');
    }

    loadAuth() {
        return this.request('loadAuth');
    }

    loadInfo() {
        return this.request('loadInfo');
    }

    loadWidgets() {
        return this.request('widget/load/param1/param2');
    }

    updateWidget(data) {
        return this.request('widget/update', { method: 'post' }, data)
            .then(result => {
                if (result && typeof result.error === 'object') {
                    return Promise.reject(result.error);
                }
            });
    }
}
