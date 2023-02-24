import { useEffect, useReducer } from 'react';
import { useMainProduct } from '../../../context/MainProductContext';

import { getProductModel } from '../../../services/productService';
import { notifyError } from '../../../utils/toast';

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

const ProductVariant = ({ pid }) => {
    const [product, dispatch] = useReducer(reducer, null);
    const mainProduct = useMainProduct();

    useEffect(() => {
        if (mainProduct.type === 'variant') {
            dispatch({
                type: 'setProduct',
                payload: {
                    ...mainProduct,
                    isAvailable: mainProduct.ats > 0,
                    selectedQty: 1,
                },
            });
        } else {
            getProductModel(pid)
                .then((res) => {
                    dispatch({
                        type: 'setProduct',
                        payload: {
                            ...res,
                            isAvailable: res.ats > 0,
                            selectedQty: 1,
                        },
                    });
                })
                .catch(notifyError);
        }
    }, [pid]);

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
