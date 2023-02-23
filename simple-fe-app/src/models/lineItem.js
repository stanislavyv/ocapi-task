import productPrices from './decorators/productPrices';

/**
 * Gets a line item's model
 * @param {Object} apiProduct
 * @returns {Promise<Object>} product model
 */
const getLineItemData = async (apiProduct, quantity) => {
    const product = {};
    product.id = apiProduct.id;
    product.name = apiProduct.name;
    product.buyQty = quantity;

    await productPrices(product, product.id);

    return product;
};

export default getLineItemData;
