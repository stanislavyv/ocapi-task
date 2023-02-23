import productAvailability from './decorators/productAvailability';
import productImages from './decorators/productImages';
import productPrices from './decorators/productPrices';
import productType from './decorators/productType';

import variationProducts from './decorators/master/variationProducts';
import availableColors from './decorators/master/availableColors';
import availableSizes from './decorators/master/availableSizes';

/**
 * Gets a product's model
 * @param {Object} apiProduct
 * @returns {Promise<Object>} product model
 */
const getProductData = async (apiProduct, quantity) => {
    const product = {};
    product.id = apiProduct.id;
    product.name = apiProduct.name;
    product.description = apiProduct.short_description;
    product.buyQty = quantity;

    await productAvailability(product, product.id);
    await productImages(product, product.id);
    await productPrices(product, product.id);
    productType(apiProduct, product);

    if (product.type === 'master') {
        variationProducts(product, product.id);
        availableColors(product);
        availableSizes(product);
    }

    return product;
};

export default getProductData;
