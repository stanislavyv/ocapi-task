import ocapiConfig from '../config/ocapi.json';

export const BASE_URL = `${ocapiConfig.HOST}/s/Sites-${ocapiConfig.SITES.REFARCH}-Site/dw/shop/${ocapiConfig.OCAPI_VERSION}`;

export const AUTH = `${BASE_URL}/customers/auth`;

export const CONTENT = '/content';

export const PRICES = '/prices';

export const AVAILABILITY = '/availability';

export const IMAGES = '/images';

export const PRODUCT_VARIATIONS = '/variations';

export const BUNDLED_PRODUCTS = '/bundled_products';

export const PRODUCTS = '/products';

export const CUSTOMERS = '/customers';

export const BASKETS = '/baskets';

export const ITEMS = '/items';

export const SHIPMENTS = '/shipments';

export const SHIPPING_METHOD = '/shipping_method';

export const BILLING_ADDRESS = '/billing_address?use_as_shipping=true';

export const PAYMENT_METHODS = '/payment_methods';

export const PAYMENT_INSTRUMENTS = '/payment_instruments';

export const ORDERS = '/orders';

/**
 * Gets the endpoint for content by id
 * @param {String} cid
 * @returns {String}
 */
export const getContentURL = (cid) => `${CONTENT}/${cid}`;

/**
 * Gets the endpoint for api product by id
 * @param {String} basket_id
 * @returns {String}
 */
export const getAPIProductURL = (pid, endpoint) =>
    `${PRODUCTS}/${pid}${endpoint}`;

/**
 * Gets the endpoint for customer's baskets
 * @param {String} customer_id
 * @returns {String}
 */
export const getCustomerBasketsURL = (customer_id) =>
    `${CUSTOMERS}/${customer_id}${BASKETS}`;

/**
 * Gets the endpoint for basket by id
 * @param {String} basket_id
 * @returns {String}
 */
export const getBasketByIdURL = (basket_id) => `${BASKETS}/${basket_id}`;

/**
 * Gets the endpoint for add to basket
 * @param {String} basket_id
 * @returns {String}
 */
export const getAddToBasketURL = (basket_id) =>
    `${BASKETS}/${basket_id}${ITEMS}`;

/**
 * Gets the endpoint for add shipping method
 * @param {String} basket_id
 * @param {String} shipment_id
 * @returns {String}
 */
export const getAddShippingMethodURL = (basket_id, shipment_id) =>
    `${BASKETS}/${basket_id}${SHIPMENTS}/${shipment_id}${SHIPPING_METHOD}`;

/**
 * Gets the endpoint for add billing address
 * @param {String} basket_id
 * @returns {String}
 */
export const getAddBillingAddressURL = (basket_id) =>
    `${BASKETS}/${basket_id}${BILLING_ADDRESS}`;

/**
 * Gets the endpoint for applicable payment methods
 * @param {String} basket_id
 * @returns {String}
 */
export const getPaymentMethodsURL = (basket_id) =>
    `${BASKETS}/${basket_id}${PAYMENT_METHODS}`;

/**
 * Gets the endpoint for adding payment instruments
 * @param {String} basket_id
 * @returns {String}
 */
export const getAddPaymentInstrumentsURL = (basket_id) =>
    `${BASKETS}/${basket_id}${PAYMENT_INSTRUMENTS}`;
