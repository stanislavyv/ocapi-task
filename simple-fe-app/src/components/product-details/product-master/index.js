import { useEffect, useReducer, useRef } from 'react';

import Product from '../product';

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'setProduct':
            return { ...payload };
        case 'setSelectedQty':
            return { ...state, selectedQty: payload };
        case 'setSelectedVariation':
            return { ...state, id: payload.id, ats: payload.ats };
        case 'setAvailability':
            return { ...state, isAvailable: payload };
        default:
            return state;
    }
};

const ProductMaster = ({ inputProduct }) => {
    const [product, dispatch] = useReducer(reducer, null);

    const selectedSizeRef = useRef(null);
    const selectedColorRef = useRef(null);

    useEffect(() => {
        dispatch({
            type: 'setProduct',
            payload: {
                ...inputProduct,
                isAvailable: null,
                selectedQty: 1,
            },
        });
    }, [inputProduct]);

    /**
     * Checks if master product has selected variation attributes
     * @returns {Boolean}
     */
    const isReadyToOrder = () => {
        if (product.hasSizeAttribute && !selectedSizeRef.current) {
            return false;
        }

        if (product.hasColorAttribute && !selectedColorRef.current) {
            return false;
        }

        return true;
    };

    /**
     * Gets selected variation product based on selected variation attributes
     * @returns {Object} selected variation
     */
    const getSelectedVariation = () => {
        let variationProduct = null;

        if (product.hasSizeAttribute && product.hasColorAttribute) {
            variationProduct = product.variations.find(
                (v) =>
                    v.size === selectedSizeRef.current &&
                    v.color === selectedColorRef.current
            );
        } else if (product.hasSizeAttribute) {
            variationProduct = product.variations.find(
                (v) => v.size === selectedSizeRef.current
            );
        } else if (product.hasColorAttribute) {
            variationProduct = product.variations.find(
                (v) => v.color === selectedColorRef.current
            );
        }

        return variationProduct;
    };

    /**
     * Sets the current selected variation product
     */
    const setSelectedVariation = () => {
        if (isReadyToOrder()) {
            const selectedVariation = getSelectedVariation();
            dispatch({
                type: 'setSelectedVariation',
                payload: {
                    id: selectedVariation.id,
                    ats: selectedVariation.ats,
                },
            });
        }
    };

    /**
     * Sets master product's availability
     * @param {*} selectedQty
     */
    const setAvailability = (selectedQty) => {
        if (!isReadyToOrder()) {
            dispatch({ type: 'setAvailability', payload: null });
            return;
        }

        const newBuyQty = selectedQty + (product.buyQty ?? 0);

        const available = product.ats > 0 && newBuyQty <= product.ats;
        dispatch({ type: 'setAvailability', payload: available });
    };

    /**
     * Sets master product's selected quantity
     * @param {Number} qty
     */
    const setSelectedQty = (qty) => {
        dispatch({ type: 'setSelectedQty', payload: qty });
    };

    /**
     * Sets current color variation
     * @param {String} value
     */
    const setColor = (value) => {
        selectedColorRef.current = value;

        setSelectedVariation();
    };

    /**
     * Sets current size variation
     * @param {String} value
     */
    const setSize = (value) => {
        selectedSizeRef.current = value;

        setSelectedVariation();
    };

    return (
        <>
            {product && (
                <Product
                    product={{
                        ...product,
                        selectedSize: selectedSizeRef.current,
                        selectedColor: selectedColorRef.current,
                    }}
                    setColor={setColor}
                    setSize={setSize}
                    setAvailability={setAvailability}
                    setSelectedQty={setSelectedQty}
                />
            )}
        </>
    );
};

export default ProductMaster;
