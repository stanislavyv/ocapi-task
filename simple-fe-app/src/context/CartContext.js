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
                newItems[index].buyQty += payload.buyQty;

                return { ...state, items: newItems };
            } else {
                return { ...state, items: [...state.items, payload] };
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

    const addToCart = (product) => {
        addToBasket(product.id, product.buyQty)
            .then(() => {
                dispatch({ type: 'add', payload: product });
            })
            .catch(notifyError);
    };

    const getNumberOfItems = () => {
        return cart.items.reduce((acc, x) => {
            return acc + Number(x.buyQty);
        }, 0);
    };

    const getSum = () => {
        return cart.items.reduce((acc, x) => {
            return acc + x.buyQty * x.price;
        }, 0);
    };

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
