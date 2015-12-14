import superagent from 'superagent';
import { apiHost, apiPort } from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(apiPath = '') {
    // remove all matched '/' from the start
    const adjustedPath = apiPath.replace(/^\/*/, '');

    return __SERVER__
        // prepend host and port of the API server to the path.
        ? `http://${apiHost}:${apiPort}/${adjustedPath}`
        // prepend `/api` to relative URL, to proxy to API server.
        : `/api/${adjustedPath}`;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
