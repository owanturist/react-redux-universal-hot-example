/**
  * 1. Skip holes in route component chain and
  * only consider components that implement
  * fetchData or fetchDataDeferred
  *
  * 2. Pull out fetch data methods
  *
  * 3. Call fetch data methods and gather promises
  */
export default function getDataDependencies(components, getState, dispatch, location, params, isDeferred) {
    const methodName = isDeferred ? 'fetchDataDeferred' : 'fetchData';

    return components.reduce((acc, component) => {
        if (component && component[methodName]) {
            return [
                ...acc,
                component[methodName](getState, dispatch, location, params)
            ];
        }

        return acc;
    }, []);
}
