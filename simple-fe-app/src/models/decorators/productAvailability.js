import { getProductAvailability } from '../../services/productService';

/**
 * Adds availability properties to product model
 * @param {Object} product
 * @param {String} pid
 */
export default async (product, pid) => {
    const apiProduct = await getProductAvailability(pid);

    product.ats = apiProduct.inventory.ats;
    product.orderable = apiProduct.inventory.orderable;
};
