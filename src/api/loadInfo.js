import request from './request';

export default function loadAuth() {
    return request('loadInfo');
}
