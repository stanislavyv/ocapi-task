import ocapiConfig from '../config/ocapi.json';
import * as endpoints from '../utils/endpoints';
import * as requester from './requester';

import jwt_decode from 'jwt-decode';

/**
 * Gets the id of the current customer
 * @returns {String | null}
 */
export const getCustomerId = () => {
    let result = null;
    const token = localStorage.getItem('token');

    if (token) {
        const decoded = jwt_decode(token);

        result = JSON.parse(decoded.sub).customer_info.customer_id;
    }

    return result;
};

/**
 * Checks if a JWT token exists and if it's expired
 * @param {Object} token
 * @returns {Boolean}
 */
export const isTokenValid = (token) => {
    let hasValidToken = false;
    if (token && token != 'null') {
        const decoded = jwt_decode(token);
        const exp = Number(decoded.exp + '000');

        const now = Date.now();
        hasValidToken = now <= exp;
    }

    return hasValidToken;
};

/**
 * Gets a JWT from Salesforce for guest customers
 * @returns {Promise} Bearer token
 */
export const getAccessToken = async () => {
    const currToken = localStorage.getItem('token');

    const hasValidToken = isTokenValid(currToken);

    const url = endpoints.AUTH;

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-dw-client-id': `${ocapiConfig.CLIENT_ID}`,
        },
    };

    if (hasValidToken) {
        request.headers.Authorization = currToken;
    }

    const type = hasValidToken ? 'refresh' : 'guest';

    const body = { type };

    request.body = JSON.stringify(body);

    try {
        const res = await fetch(url, request);
        const token = res.headers.get('authorization');

        localStorage.setItem('token', token);

        return token;
    } catch (e) {
        console.log(e);
    }
};

/**
 * Gets a content asset by its id
 * @param {String} cid - Id of the requested asset
 * @returns {Promise<Object>} Content Asset's body
 */
export const getContentAsset = async (cid) => {
    try {
        const res = await requester.get(endpoints.getContentURL(cid));
        return res.c_body;
    } catch (e) {
        console.log(e);
    }
};