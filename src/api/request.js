import fetch from 'isomorphic-fetch';
import { apiHost, apiPort } from 'config';

export function formatUrl(apiPath = '') {
    // remove all matched '/' from the start
    const adjustedPath = apiPath.replace(/^\/*/, '');

    return __SERVER__
        // prepend host and port of the API server to the path.
        ? `http://${apiHost}:${apiPort}/${adjustedPath}`
        // prepend `/api` to relative URL, to proxy to API server.
        : `/api/${adjustedPath}`;
}

export function checkResponse(response) {
    if (response.status < 200 || response.status >= 300) {
        throw response;
    }

    return response.json();
}

export function failureHandler(response) {
    const error = new Error(`Fetch error: ${response.statusText}`);

    error.response = response;
    throw error;
}

export default function request(url, { body, ...params } = {}, data = body) {
    const defaults = {
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: data && JSON.stringify(data)
    };

    return fetch(formatUrl(url), { ...defaults, ...params })
        .then(checkResponse)
        .catch(failureHandler);
}
