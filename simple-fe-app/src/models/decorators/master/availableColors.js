/**
 * Sets available colors property to master product
 * @param {Object} masterProduct
 */
export default (masterProduct) => {
    let colors = [];
    let hasColorAttribute = false;

    if (masterProduct.variations) {
        colors = masterProduct.variations.reduce((acc, v) => {
            const colorAlreadyAdded = acc.some(
                ({ color }) => color === v.color
            );

            if (!colorAlreadyAdded) {
                return [
                    ...acc,
                    { color: v.color, refinementColor: v.refinementColor },
                ];
            }

            return acc;
        }, []);
    }

    if (colors.length > 0) {
        hasColorAttribute = true;
    }
    masterProduct.hasColorAttribute = hasColorAttribute;
    masterProduct.availableColors = colors;
};
