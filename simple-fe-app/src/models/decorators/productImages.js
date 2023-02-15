import { getProductImages } from '../../services/ocapiService';

/**
 * Adds images properties to product model
 * @param {Object} product
 * @param {String} pid
 */
export default async (product, pid) => {
    const apiProduct = await getProductImages(pid);
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
