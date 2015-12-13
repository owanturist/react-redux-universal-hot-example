import { createStore, applyMiddleware, compose } from 'redux';
import { transitionMiddleware, clientMiddleware } from 'middleware';
import reducer from 'reducers';
import routes from 'routes';

const { reduxReactRouter } = __CLIENT__ && !__TEST__
  ? require('redux-router')
  : require('redux-router/server');

const createHistory = (isClient) => {
    if (isClient) {
        // Three different types of scroll behavior available.
        // Documented here: https://github.com/rackt/scroll-behavior
        const useScroll = require('scroll-behavior/lib/useStandardScroll');
        return useScroll(require('history/lib/createBrowserHistory'));
    }

    return require('history/lib/createMemoryHistory');
}(__CLIENT__);

const getRoutes = (isClient) => {
    if (isClient) {
        const makeRouteHooksSafe = require('helpers/makeRouteHooksSafe');
        return makeRouteHooksSafe(routes);
    }

    return routes;
}(__CLIENT__);

function getDevUtils(enableDevTools) {
    const { persistState } = require('redux-devtools');
    const { DevTools } = require('containers');

    return enableDevTools ? [
        window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ] : [];
}

export default (client, data) => {
    const store = compose(
        reduxReactRouter({ getRoutes, createHistory }),
        applyMiddleware(
            clientMiddleware(client),
            transitionMiddleware
        ),
        ...getDevUtils(__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__)
    )(createStore)(reducer, data);

    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(reducer);
        });
    }

    return store;
};
