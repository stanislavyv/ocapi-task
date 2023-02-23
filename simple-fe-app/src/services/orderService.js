import * as requester from './requester';
import { getCustomerId, getLineItemModel, isTokenValid } from './ocapiService';

/**
 * Checks whether the current basket exists in current customer's baskets
 * @param {String | null} basketId
 * @returns {Promise<Boolean>}
 */
const isBasketValid = async (basketId) => {
    let result = false;
    const customer_id = getCustomerId();

    if (customer_id && basketId) {
        try {
            const basketResult = await requester.get(
                `/customers/${customer_id}/baskets`
            );

            if (basketResult.baskets) {
                for (const basket of basketResult.baskets) {
                    if (basketId === basket.basket_id) {
                        result = true;
                        break;
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    return result;
};

/**
 * Creates a new basket in SFCC
 * @returns {Promise<Object>} basket
 */
const createNewBasket = async () => {
    const basket = await requester.post(null, '/baskets');
    localStorage.setItem('basket_id', basket.basket_id);

    return basket;
};

/**
 * Gets basket for the current customer if it exists, otherwise creates a new one
 * @returns {Promise}
 */
const getBasket = async () => {
    const basketId = localStorage.getItem('basket_id');
    const token = localStorage.getItem('token');

    const hasValidToken = isTokenValid(token);
    const hasValidBasket = await isBasketValid(basketId);

    let basket = {};
    if (basketId && hasValidToken && hasValidBasket) {
        try {
            basket = await requester.get(`/baskets/${basketId}`);
            if (basket.fault) {
                throw new Error(basket.fault.message);
            }
        } catch (e) {
            basket = await createNewBasket();
        }
    } else {
        basket = await createNewBasket();
    }

    return basket;
};

/**
 * Gets current basket's items
 * @returns {Promise<Array>} items
 */
export const getBasketItems = async () => {
    let items = [];

    try {
        const basket = await getBasket();

        if (basket.product_items) {
            items = await Promise.all(
                basket.product_items.map(async (p) => {
                    return await getLineItemModel(p.product_id, p.quantity);
                })
            );
        }
    } catch (e) {
        console.log(e);
    }

    return items;
};

/**
 * Adds a new item in the current basket
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const addToBasket = async (pid, quantity = 1) => {
    await getBasket();
    const basketId = localStorage.getItem('basket_id');

    const body = [{ product_id: pid, quantity }];

    const res = await requester.post(body, `/baskets/${basketId}/items`);
    if (res.fault) {
        throw new Error(res.fault.message);
    }

    return res;
};

/**
 * Adds a new shipping method to the default shipment
 * @param {String} shipmentId
 * @param {String} shippingMethodId
 * @returns {Promise<Object>}
 */
const addShippingMethod = async (shipmentId, shippingMethodId) => {
    const basketId = localStorage.getItem('basket_id');

    return await requester.update(
        { id: shippingMethodId },
        `/baskets/${basketId}/shipments/${shipmentId}/shipping_method`
    );
};

/**
 * Adds shipping method and billing/ shipping address to the current basket
 * @param {Object} inputBody
 * @returns {Promise<Object>} response
 * @throws {Error}
 */
export const addBillingAddress = async (inputBody) => {
    await getBasket();
    const basketId = localStorage.getItem('basket_id');

    const body = {
        first_name: inputBody.firstName,
        last_name: inputBody.lastName,
        address1: inputBody.address,
        city: inputBody.city,
        country_code: inputBody.country,
    };

    const billingResult = await requester.update(
        body,
        `/baskets/${basketId}/billing_address?use_as_shipping=true`
    );

    if (billingResult.fault) {
        throw new Error(billingResult.fault.message);
    }

    const shipmentId = billingResult.shipments[0].shipment_id;
    await addShippingMethod(shipmentId, inputBody.selectedMethod);

    return billingResult;
};

/**
 * Gets current basket's applicable payment methods
 * @returns {Promise<Array>}
 * @throws {Error}
 */
export const getApplicablePaymentMethods = async () => {
    await getBasket();
    const basketId = localStorage.getItem('basket_id');

    const paymentMethodsResult = await requester.get(
        `/baskets/${basketId}/payment_methods`
    );

    if (paymentMethodsResult.fault) {
        throw new Error(paymentMethodsResult.fault.message);
    }

    let applicableMethods = [];
    if (paymentMethodsResult.applicable_payment_methods) {
        applicableMethods = paymentMethodsResult.applicable_payment_methods.map(
            (pm) => ({ name: pm.name, id: pm.id })
        );
    }

    return applicableMethods;
};

/**
 * Adds payment instrument to the current basket
 * @param {Object} inputBody
 * @returns {Promise<Object>} response
 * @throws {Error}
 */
const addPayment = async (inputBody) => {
    // we don't explicitly update the basket here because
    // its already updated in the createOrder function
    const basketId = localStorage.getItem('basket_id');

    const body = {
        payment_card: {
            number: inputBody.cardNumber,
            security_code: inputBody.securityCode,
            card_type: 'Visa',
            expiration_month: Number(inputBody.expiryMonth),
            expiration_year: Number(inputBody.expiryYear),
        },
        payment_method_id: inputBody.selectedMethod,
    };

    const paymentResult = await requester.post(
        body,
        `/baskets/${basketId}/payment_instruments`
    );

    if (paymentResult.fault) {
        throw new Error(paymentResult.fault.message);
    }

    return paymentResult;
};

/**
 * Creates a new order in SFCC
 * @param {Object} inputBody
 * @returns {Promise<String>} Order Number
 * @throws {Error}
 */
export const createOrder = async (inputBody) => {
    await getBasket();
    const basketId = localStorage.getItem('basket_id');

    await addPayment(inputBody);

    const body = {
        basket_id: basketId,
    };
    const orderResult = await requester.post(body, '/orders');

    if (orderResult.fault) {
        throw new Error(orderResult.fault.message);
    }

    return orderResult.order_no;
};
