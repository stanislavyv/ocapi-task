/**
 * Adds type property to product model
 * @param {Object} apiProduct
 * @param {Object} product
 */
export default (apiProduct, product) => {
    let type = '';

    if (apiProduct.type.bundle) {
        type = 'bundle';
    } else if (apiProduct.type.variant) {
        type = 'variant';
    } else if (apiProduct.type.master) {
        type = 'master';
    }

    product.type = type;
};
