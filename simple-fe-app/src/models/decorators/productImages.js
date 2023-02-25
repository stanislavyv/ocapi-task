/**
 * Adds images properties to product model
 * @param {Object} product
 * @param {String} pid
 */
export default (product, apiProduct) => {
    const imageGroups = apiProduct.image_groups;

    product.images = {};
    imageGroups.forEach((ig) => {
        const viewType = ig.view_type;
        Object.defineProperty(product.images, viewType, {
            enumerable: true,
            value: [],
            writable: true,
        });

        ig.images.forEach((img) => {
            const currImageObject = {
                link: img.link,
                alt: img.alt,
            };

            product.images[viewType] = [
                ...product.images[viewType],
                { ...currImageObject },
            ];
        });
    });
};
