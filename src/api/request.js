import fetch from 'isomorphic-fetch';
import { apiHost, apiPort } from 'config';

export function formatUrl(apiPath = '', isServer = __SERVER__) {
    // remove all matched '/' from the start
    const adjustedPath = apiPath.replace(/^\/*/, '');
    // prepend host and port of the API server to the path.
    // prepend `/api` to relative URL, to proxy to API server.
    const basePath = isServer ? `http://${apiHost}:${apiPort}/` : `/api/`;

    return `${basePath}${adjustedPath}`;
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
