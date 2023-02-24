/**
 * Gets markup in the form of html
 * @param {String} markup
 * @returns {Object}
 */
export default function (markup) {
    return { __html: `${markup}` };
}
