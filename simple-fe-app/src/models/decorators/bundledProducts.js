import {
    getBundledProducts,
    getProductModel,
} from '../../services/ocapiService';

/**
 * Adds bundled products properties to product model
 * @param {Object} product
 * @param {String} pid
 */
export default async (product, pid) => {
    const apiProducts = await getBundledProducts(pid);
    let bundledProducts = [];

    if (apiProducts) {
        bundledProducts = await Promise.all(
            apiProducts.map(async (bp) => {
                const currBundledProduct = await getProductModel(bp.product.id);

                return currBundledProduct;
            })
        );
    }

    product.bundledProducts = bundledProducts;
};
