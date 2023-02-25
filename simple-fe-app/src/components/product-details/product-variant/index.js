import { useEffect, useReducer } from 'react';

import Product from '../product';

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'setProduct':
            return { ...payload };
        case 'setSelectedQty':
            return { ...state, selectedQty: payload };
        case 'setAvailability':
            return { ...state, isAvailable: payload };
        default:
            return state;
    }
};

const ProductVariant = ({ inputProduct }) => {
    const [product, dispatch] = useReducer(reducer, null);

    useEffect(() => {
        dispatch({
            type: 'setProduct',
            payload: {
                ...inputProduct,
                isAvailable: inputProduct.ats > 0,
                selectedQty: 1,
            },
        });
    }, [inputProduct]);

    /**
     * Sets variation product's availability
     * @param {Number} selectedQty
     */
    const setAvailability = (selectedQty) => {
        const newBuyQty = selectedQty + (product.buyQty ?? 0);

        const available = product.ats > 0 && newBuyQty <= product.ats;
        dispatch({ type: 'setAvailability', payload: available });
    };

    /**
     * Sets variation product's selected quantity
     * @param {Number} qty
     */
    const setSelectedQty = (qty) => {
        dispatch({ type: 'setSelectedQty', payload: qty });
    };

    return (
        <>
            {product && (
                <Product
                    product={product}
                    setAvailability={setAvailability}
                    setSelectedQty={setSelectedQty}
                />
            )}
        </>
    );
};

export default ProductVariant;
