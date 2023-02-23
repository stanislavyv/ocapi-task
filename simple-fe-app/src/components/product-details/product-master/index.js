import { useEffect, useReducer, useRef } from 'react';
import { useMainProduct } from '../../../context/ProductContext';

import { getProductModel } from '../../../services/ocapiService';
import { notifyError } from '../../../utils/toast';

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

const ProductMaster = ({ pid }) => {
    const [product, dispatch] = useReducer(reducer, null);
    const mainProduct = useMainProduct();

    const selectedSizeRef = useRef(null);
    const selectedColorRef = useRef(null);

    useEffect(() => {
        if (mainProduct.type === 'master') {
            dispatch({
                type: 'setProduct',
                payload: {
                    ...mainProduct,
                    isAvailable: null,
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
                            isAvailable: null,
                            selectedQty: 1,
                        },
                    });
                })
                .catch(notifyError);
        }
    }, [pid]);

    const isReadyToOrder = () => {
        if (product.hasSizeAttribute && !selectedSizeRef.current) {
            return false;
        }

        if (product.hasColorAttribute && !selectedColorRef.current) {
            return false;
        }

        return true;
    };

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

    const setAvailability = (selectedQty) => {
        if (!isReadyToOrder()) {
            dispatch({ type: 'setAvailability', payload: null });
            return;
        }

        const newBuyQty = selectedQty + (product.buyQty ?? 0);

        const available = product.ats > 0 && newBuyQty <= product.ats;
        dispatch({ type: 'setAvailability', payload: available });
    };

    const setSelectedQty = (qty) => {
        dispatch({ type: 'setSelectedQty', payload: qty });
    };

    const setColor = (value) => {
        selectedColorRef.current = value;

        setSelectedVariation();
    };

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
