import React, { useReducer, useContext, useMemo } from 'react';

const CartContext = React.createContext('');
CartContext.displayName = 'CartContext';

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'add':
            const product = state.items.find((p) => p.id === payload.id);

            if (product) {
                const index = state.items.indexOf(product);
                const newItems = [...state.items];
                newItems[index].buyQty = payload.buyQty;

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

    const addToCart = (product) => {
        dispatch({ type: 'add', payload: product });
    };

    const getNumberOfItems = () => {
        return cart.items.reduce((acc, x) => {
            return acc + Number(x.buyQty);
        }, 0);
    };

    const value = useMemo(
        () => ({
            items: cart.items,
            addToCart,
            getNumberOfItems,
        }),
        [cart]
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
