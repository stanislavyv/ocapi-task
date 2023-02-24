import { getProductPrices } from '../../services/productService';

/**
 * Adds price properties to product model
 * @param {Object} product
 * @param {String} pid
 */
export default async (product, pid) => {
    const apiProduct = await getProductPrices(pid);

    product.price = apiProduct.price;
};
