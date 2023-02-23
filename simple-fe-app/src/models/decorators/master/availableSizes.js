/**
 * Sets available sizes property to master product
 * @param {Object} masterProduct
 */
export default (masterProduct) => {
    let sizes = [];
    let hasSizeAttribute = false;

    if (masterProduct.variations) {
        sizes = masterProduct.variations.reduce((acc, v) => {
            const sizeAlreadyAdded = Boolean(
                acc.find(({ value }) => {
                    return value === v.size;
                })
            );

            if (!sizeAlreadyAdded) {
                const label = v.size.slice(1);
                const currSize = { label, value: v.size };

                return [...acc, currSize];
            }

            return acc;
        }, []);
    }

    if (sizes.length > 0) {
        sizes.sort((a, b) => Number(a.label) - Number(b.label));
        hasSizeAttribute = true;
    }

    masterProduct.hasSizeAttribute = hasSizeAttribute;
    masterProduct.availableSizes = sizes;
};
