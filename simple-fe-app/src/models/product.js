import productAvailability from './decorators/productAvailability';
import productImages from './decorators/productImages';
import productPrices from './decorators/productPrices';
import productType from './decorators/productType';

/**
 * Gets a product's model
 * @param {Object} apiProduct
 * @returns {Object} product model
 */
const getProductData = (apiProduct) => {
    const product = {};
    product.id = apiProduct.id;
    product.name = apiProduct.name;

    productAvailability(product, product.id);
    productImages(product, product.id);
    productPrices(product, product.id);
    productType(apiProduct, product);

    return product;
};

export default getProductData;
