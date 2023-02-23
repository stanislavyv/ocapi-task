import productAvailability from './decorators/productAvailability';

/**
 * Gets a product variation's model
 * @param {Object} apiProduct
 * @returns {Promise<Object>} product model
 */
const getProductVariationData = async (apiProduct) => {
    const product = {};
    product.id = apiProduct.id;
    product.color = apiProduct.c_color;
    product.refinementColor = apiProduct.c_refinementColor;
    product.size = apiProduct.c_size;

    await productAvailability(product, product.id);

    return product;
};

export default getProductVariationData;
