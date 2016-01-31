import request from './request';

export default function login(name) {
    return request('login', { method: 'post' }, { name });
}
