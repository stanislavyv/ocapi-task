import * as requester from '../services/requester';
import * as endpoints from '../utils/endpoints';

import productModel from '../models/product';
import lineItemModel from '../models/lineItem';
import variationModel from '../models/productVariation';

/**
 * Gets a product by its id if product exists
 * @param {String} pid
 * @param {String} endpoint
 * @returns {Promise<Object>} api product
 * @throws {Error} product not found error
 */
export const getApiProduct = async (pid, endpoint = '') => {
    let res;
    res = await requester.get(endpoints.getAPIProductURL(pid, endpoint));

    if (res.fault && res.fault.type === 'ProductNotFoundException') {
        throw new Error(`Product with id ${pid} doesn't exist.`);
    }

    return res;
};

/**
 * Gets a product's prices by its id if product exists
 * @param {String} pid
 * @returns {Promise<Object>} api product
 * @throws {Error} product not found error
 */
export const getProductPrices = async (pid) => {
    return getApiProduct(pid, endpoints.PRICES);
};

/**
 * Gets a product's availability by its id if product exists
 * @param {String} pid
 * @returns {Promise<Object>} api product
 * @throws {Error} product not found error
 */
export const getProductAvailability = async (pid) => {
    return getApiProduct(pid, endpoints.AVAILABILITY);
};

/**
 * Gets a product's images by its id if product exists
 * @param {String} pid
 * @returns {Promise<Object>} api product
 * @throws {Error} product not found error
 */
export const getProductImages = async (pid) => {
    return getApiProduct(pid, endpoints.IMAGES);
};

/**
 * Gets master product's variations
 * @param {String} pid
 * @returns {Promise<Array> | null} variation products
 * @throws {Error}
 */
export const getProductVariations = async (pid) => {
    const variationsResult = await getApiProduct(
        pid,
        endpoints.PRODUCT_VARIATIONS
    );

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
    const bundleResult = await getApiProduct(pid, endpoints.BUNDLED_PRODUCTS);

    if (bundleResult.fault) {
        throw new Error(bundleResult.fault.messages);
    }

    return bundleResult.bundled_products;
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
 * @param {Object} apiProduct
 * @returns {Object} product model
 * @throws {Error} product not found error
 */
export const getLineItemModel = (apiProduct) => {
    return lineItemModel(apiProduct);
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
