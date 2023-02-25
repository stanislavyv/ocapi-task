import productAvailability from './decorators/productAvailability';

/**
 * Gets a product variation's model
 * @param {Object} apiProduct
 * @returns {Object} product model
 */
const getProductVariationData = (apiProduct) => {
    const product = {};
    product.id = apiProduct.id;
    product.color = apiProduct.c_color;
    product.refinementColor = apiProduct.c_refinementColor;
    product.size = apiProduct.c_size;

    productAvailability(product, apiProduct);

    return product;
};

export default getProductVariationData;
