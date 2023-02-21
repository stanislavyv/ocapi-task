import ocapiConfig from '../config/ocapi.json';
import { getAccessToken } from './ocapiService';

/**
 * Base function for requests
 * @param {String} method
 * @param {String} endpoint
 * @param {Object} body
 * @returns {Promise}
 */
const makeRequest = async function (method, endpoint, body) {
    let baseUrl = `${ocapiConfig.HOST}/s/Sites-${ocapiConfig.SITES.REFARCH}-Site/dw/shop/${ocapiConfig.OCAPI_VERSION}/`;

    const request = {
        method,
        headers: {
            Authorization: await getAccessToken(),
            'Content-Type': 'application/json',
            'x-dw-client-id': `${ocapiConfig.CLIENT_ID}`,
        },
    };

    // That way there won't be an error on GET request
    if (body) {
        request.body = JSON.stringify(body);
    }

    const res = await fetch(`${baseUrl}${endpoint}`, request);
    const data = res.json();

    return data;
};

/**
 * GET
 * @param {String} endpoint
 * @returns {Promise}
 */
export const get = async function (endpoint) {
    const path = endpoint ?? '';
    return makeRequest('GET', path);
};

/**
 * POST
 * @param {Object} body
 * @param {String} endpoint
 * @returns {Promise}
 */
export const post = async function (body, endpoint) {
    const path = endpoint ?? '';
    return makeRequest('POST', path, body);
};

/**
 * PUT
 * @param {String} endpoint
 * @param {Object} body
 * @returns {Promise}
 */
export const update = async function (body, endpoint) {
    return makeRequest('PUT', endpoint, body);
};

/**
 * PATCH
 * @param {String} endpoint
 * @param {Object} body
 * @returns {Promise}
 */
export const patch = async function (body, endpoint) {
    return makeRequest('PATCH', endpoint, body);
};

/**
 * DELETE
 * @param {String} endpoint
 * @returns {Promise}
 */
export const remove = async function (endpoint) {
    return makeRequest('DELETE', endpoint);
};
