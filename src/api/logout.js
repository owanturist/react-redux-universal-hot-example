import request from './request';

export default function logout() {
    return request('logout');
}
