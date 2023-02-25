import React, { useReducer, useContext, useMemo, useEffect } from 'react';
import { getBasketItems, addToBasket } from '../services/orderService';
import { notifyError } from '../utils/toast';

const CartContext = React.createContext('');
CartContext.displayName = 'CartContext';

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'setItems':
            return { ...state, items: payload };
        case 'add':
            const product = state.items.find((p) => p.id === payload.id);

            if (product) {
                const index = state.items.indexOf(product);
                const newItems = [...state.items];
                newItems[index].buyQty += payload.selectedQty;

                return { ...state, items: newItems };
            } else {
                const newItem = { ...payload };
                newItem.buyQty = payload.selectedQty;
                return { ...state, items: [...state.items, newItem] };
            }
        case 'reset': {
            return { ...state, items: [] };
        }
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(reducer, { items: [] });

    useEffect(() => {
        getBasketItems().then((res) => {
            if (res.length > 0) {
                dispatch({ type: 'setItems', payload: res });
            }
        });
    }, []);

    /**
     * Adds product to current basket
     * @param {Object} product
     */
    const addToCart = (product) => {
        addToBasket(product.id, product.selectedQty)
            .then(() => {
                dispatch({ type: 'add', payload: product });
            })
            .catch((e) => {
                notifyError();
            });
    };

    /**
     * Gets current basket's number of items
     * @returns {Number}
     */
    const getNumberOfItems = () => {
        let count = 0;

        if (cart.items) {
            count = cart.items.reduce((acc, x) => {
                return acc + Number(x.buyQty);
            }, 0);
        }

        return count;
    };

    /**
     * Gets current basket's sum
     * @returns {Number}
     */
    const getSum = () => {
        let sum = 0;

        if (cart.items) {
            sum = cart.items.reduce((acc, x) => {
                return acc + x.buyQty * x.price;
            }, 0);
        }

        return sum;
    };

    /**
     * Empties current cart
     */
    const emptyCart = () => {
        dispatch({ type: 'reset' });
    };

    const value = useMemo(
        () => ({
            items: cart.items,
            addToCart,
            getNumberOfItems,
            getSum,
            emptyCart,
        }),
        [cart]
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
