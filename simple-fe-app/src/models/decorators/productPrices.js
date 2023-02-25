/**
 * Adds price properties to product model
 * @param {Object} product
 * @param {String} pid
 */
export default (product, apiProduct) => {
    product.price = apiProduct.price;
};
