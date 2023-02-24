import {
    getProductVariationModel,
    getProductVariations,
} from '../../../services/productService';

/**
 * Adds product variations properties to product model
 * @param {Object} product
 * @param {String} pid
 */
export default async (product, pid) => {
    const apiVariations = await getProductVariations(pid);
    let variations = [];

    if (apiVariations) {
        variations = await Promise.all(
            apiVariations.map(async (v) => {
                const currVariation = await getProductVariationModel(
                    v.product_id
                );

                return currVariation;
            })
        );
    }

    product.variations = variations;
};
