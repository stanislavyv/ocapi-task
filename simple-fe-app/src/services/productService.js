import * as requester from '../services/requester';
import * as endpoints from '../utils/endpoints';

import productModel from '../models/product';
import lineItemModel from '../models/lineItem';
import variationModel from '../models/productVariation';

const expandOptions = {
    full: 'availability,prices,images,variations,bundled_products',
    variationProduct: 'availability',
};

/**
 * Gets a product by its id if product exists
 * @param {String} pid
 * @param {'full' | 'variationProduct'} expandType
 * @returns {Promise<Object>} api product
 * @throws {Error} product not found error
 */
export const getApiProduct = async (pid, expandType) => {
    const expandString = expandOptions[expandType];

    let res;
    res = await requester.get(endpoints.getAPIProductURL(pid, expandString));

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
export const getFullProductModel = async (pid) => {
    const apiProduct = await getApiProduct(pid, 'full');
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
export const getVariationProductModel = async (pid) => {
    const apiProduct = await getApiProduct(pid, 'variationProduct');
    return variationModel(apiProduct);
};
