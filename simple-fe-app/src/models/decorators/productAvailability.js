/**
 * Adds availability properties to product model
 * @param {Object} product
 * @param {Object} apiProduct
 * @param {String} pid
 */
export default (product, apiProduct) => {
    product.ats = apiProduct.inventory.ats;
    product.orderable = apiProduct.inventory.orderable;
};
