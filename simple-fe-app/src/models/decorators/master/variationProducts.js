import { getVariationProductModel } from '../../../services/productService';

/**
 * Adds product variations properties to product model
 * @param {Object} product
 * @param {String} apiProduct
 * @returns {Promise<void>}
 */
export default async (product, apiProduct) => {
    console.log(apiProduct);
    const apiVariations = apiProduct.variants;
    let variations = [];

    if (apiVariations) {
        variations = await Promise.all(
            apiVariations.map(async (v) => {
                const currVariation = await getVariationProductModel(
                    v.product_id
                );

                return currVariation;
            })
        );
    }

    product.variations = variations;
};
