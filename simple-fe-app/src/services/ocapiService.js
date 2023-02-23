import ocapiConfig from '../config/ocapi.json';
import * as requester from './requester';

import jwt_decode from 'jwt-decode';

import productModel from '../models/product';
import lineItemModel from '../models/lineItem';
import variationModel from '../models/productVariation';

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

    const url = `${ocapiConfig.HOST}/s/Sites-${ocapiConfig.SITES.REFARCH}-Site/dw/shop/${ocapiConfig.OCAPI_VERSION}/customers/auth`;

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
        const res = await requester.get(`content/${cid}`);
        return res.c_body;
    } catch (e) {
        console.log(e);
    }
};

/**
 * Gets a product's prices by its id if product exists
 * @param {String} pid
 * @returns {Promise<Object>} api product
 * @throws {Error} product not found error
 */
export const getProductPrices = async (pid) => {
    return getApiProduct(pid, '/prices');
};

/**
 * Gets a product's availability by its id if product exists
 * @param {String} pid
 * @returns {Promise<Object>} api product
 * @throws {Error} product not found error
 */
export const getProductAvailability = async (pid) => {
    return getApiProduct(pid, '/availability');
};

/**
 * Gets a product's images by its id if product exists
 * @param {String} pid
 * @returns {Promise<Object>} api product
 * @throws {Error} product not found error
 */
export const getProductImages = async (pid) => {
    return getApiProduct(pid, '/images');
};

/**
 * Gets master product's variations
 * @param {String} pid
 * @returns {Promise<Array> | null} variation products
 * @throws {Error}
 */
export const getProductVariations = async (pid) => {
    const variationsResult = await getApiProduct(pid, '/variations');

    if (variationsResult.fault) {
        throw new Error(variationsResult.fault.messages);
    }

    return variationsResult.variants;
};

/**
 * Gets bundle product's items
 * @param {String} pid Bundle product id
 * @returns {Promise<Array> | null} bundled products
 * @throws {Error}
 */
export const getBundledProducts = async (pid) => {
    const bundleResult = await getApiProduct(pid, '/bundled_products');

    if (bundleResult.fault) {
        throw new Error(bundleResult.fault.messages);
    }

    return bundleResult.bundled_products;
};

/**
 * Gets a product by its id if product exists
 * @param {String} pid
 * @param {String} endpoint
 * @returns {Promise<Object>} api product
 * @throws {Error} product not found error
 */
export const getApiProduct = async (pid, endpoint = '') => {
    let res;
    res = await requester.get(`products/${pid}${endpoint}`);

    if (res.fault && res.fault.type === 'ProductNotFoundException') {
        throw new Error(`Product with id ${pid} doesn't exist.`);
    }

    return res;
};

/**
 * Gets a product's model
 * @param {String} pid
 * @returns {Promise<Object>} product model
 * @throws {Error} product not found error
 */
export const getProductModel = async (pid) => {
    const apiProduct = await getApiProduct(pid);
    return productModel(apiProduct);
};

/**
 * Gets a basket item's model
 * @param {String} pid
 * @returns {Promise<Object>} product model
 * @throws {Error} product not found error
 */
export const getLineItemModel = async (pid, quantity = 1) => {
    const apiProduct = await getApiProduct(pid);
    return lineItemModel(apiProduct, quantity);
};

/**
 * Gets a product variation's model
 * @param {String} pid
 * @returns {Promise<Object>} product model
 * @throws {Error} product not found error
 */
export const getProductVariationModel = async (pid) => {
    const apiProduct = await getApiProduct(pid);
    return variationModel(apiProduct);
};
