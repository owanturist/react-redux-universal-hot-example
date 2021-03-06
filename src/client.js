/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import ApiClient from 'api';
import makeStore from 'store';
import getRoutes from 'routes';

const client = new ApiClient();

const rootElement = document.getElementById('root');
const store = makeStore(client, window.__data);
const routes = getRoutes(store);
const Component = () => <ReduxRouter {...{ routes }} />;

function initSocket() {
    const socket = io('', {
        path: '/api/ws',
        transports: ['polling']
    });

    return socket;
}

global.socket = initSocket();

ReactDOM.render(
    <Provider {...{ store }} key="provider">
        <Component />
    </Provider>,
    rootElement
);

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!( rootElement
        && rootElement.firstChild
        && rootElement.firstChild.attributes
        && rootElement.firstChild.attributes['data-react-checksum'])) {
        console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
    }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
    const DevTools = require('./containers/DevTools/DevTools');

    ReactDOM.render(
        <Provider {...{ store }} key="provider">
            <div>
                <Component />
                <DevTools />
            </div>
        </Provider>,
        rootElement
    );
}
