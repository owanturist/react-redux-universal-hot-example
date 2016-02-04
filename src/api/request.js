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

export function formatParams({ headers, body, ...params } = {}, data = body) {
    return {
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json',
            ...headers
        }),
        body: data && JSON.stringify(data),
        ...params
    };
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

export default function request(url, params, data) {
    return fetch(formatUrl(url), formatParams(params, data))
        .then(checkResponse)
        .catch(failureHandler);
}
