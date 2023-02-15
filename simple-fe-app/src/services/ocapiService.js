import ocapiConfig from '../config/ocapi.json';
import * as requester from './requester';
import productModel from '../models/product';

/**
 * Gets a JWT from Salesforce for guest customers
 * @returns {Promise} Bearer token
 */
export const getAccessToken = async () => {
    const url = `${ocapiConfig.HOST}/s/Sites-${ocapiConfig.SITES.REFARCH}-Site/dw/shop/${ocapiConfig.OCAPI_VERSION}/customers/auth`;

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-dw-client-id': `${ocapiConfig.CLIENT_ID}`,
        },
    };

    const body = { type: 'guest' };

    request.body = JSON.stringify(body);

    try {
        const res = await fetch(url, request);
        const token = res.headers.get('authorization');
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
