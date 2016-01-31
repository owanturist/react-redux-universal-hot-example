/**
 * Return the status code from the last matched route with a status property.
 *
 * @param matchedRoutes
 * @returns {Number|null}
 */
export default function getStatusFromRoutes(matchedRoutes) {
    return matchedRoutes.reduce((prev, { status = prev }) => status, null);
}
