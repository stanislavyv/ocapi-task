import { getFullProductModel } from '../../services/productService';

/**
 * Adds bundled products properties to product model
 * @param {Object} product
 * @param {String} pid
 * @returns {Promise<void>}
 */
export default async (product, apiProduct) => {
    const apiProducts = apiProduct.bundled_products;
    let bundledProducts = [];

    if (apiProducts) {
        bundledProducts = await Promise.all(
            apiProducts.map(async (bp) => {
                const currBundledProduct = await getFullProductModel(
                    bp.product.id
                );
                currBundledProduct.isBundleItem = true;
                return currBundledProduct;
            })
        );
    }

    product.bundledProducts = bundledProducts;
};
