/**
 * Sets available sizes property to master product
 * @param {Object} masterProduct
 */
export default (masterProduct) => {
    let sizes = [];
    let hasSizeAttribute = false;

    if (masterProduct.variations) {
        sizes = masterProduct.variations.reduce((acc, v) => {
            return [...acc, v.size];
        }, []);
    }

    if (sizes.length > 0) {
        hasSizeAttribute = true;
    }

    masterProduct.hasSizeAttribute = hasSizeAttribute;
    masterProduct.availableSizes = sizes;
};
