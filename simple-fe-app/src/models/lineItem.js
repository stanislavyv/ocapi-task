/**
 * Gets a line item's model
 * @param {Object} apiProduct
 * @returns {Object} product model
 */
const getLineItemData = (apiProduct) => {
    const product = {};
    product.id = apiProduct.product_id;
    product.name = apiProduct.product_name;
    product.buyQty = apiProduct.quantity;
    product.price = apiProduct.price;

    return product;
};

export default getLineItemData;
