import ocapiConfig from '../config/ocapi.json';

import * as requester from './requester';
import { getProductModel, isTokenValid } from './ocapiService';

/**
 * Gets basket for the current customer if it exists, otherwise creates a new one
 * @returns {Promise}
 */
const getBasket = async () => {
    const basketId = localStorage.getItem('basket_id');
    const token = localStorage.getItem('token');

    const hasValidToken = isTokenValid(token);

    let basket = {};
    if (basketId && hasValidToken) {
        basket = await requester.get(`/baskets/${basketId}`);
    } else {
        basket = await requester.post(null, '/baskets');
        localStorage.setItem('basket_id', basket.basket_id);
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
                    return await getProductModel(p.product_id, p.quantity);
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
 */
export const addToBasket = async (pid, quantity) => {
    await getBasket();
    const basketId = localStorage.getItem('basket_id');

    const body = [{ product_id: pid, quantity }];

    try {
        const res = await requester.post(body, `/baskets/${basketId}/items`);
        return res;
    } catch (e) {
        console.log(e);
    }
};
