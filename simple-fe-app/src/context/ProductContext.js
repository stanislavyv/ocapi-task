import React, { useContext, useEffect, useReducer, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getProductModel } from '../services/ocapiService';

const ProductContext = React.createContext('');

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'setProduct':
            return { ...state, ...payload };
        case 'setAvailability':
            return { ...state, isAvailable: payload };
        case 'setBuyQty':
            return { ...state, buyQty: payload };
        default:
            return state;
    }
};

const ProductProvider = ({ children }) => {
    const [product, dispatch] = useReducer(reducer, null);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has('pid')) {
            const pid = searchParams.get('pid');

            getProductModel(pid)
                .then((res) => {
                    const payload = {
                        ...res,
                        isAvailable: res.ats > 0,
                        buyQty: 1,
                    };
                    dispatch({ type: 'setProduct', payload });
                })
                .catch(() => {
                    navigate('/not-found');
                });
        } else {
            navigate('/not-found');
        }
    }, [searchParams]);

    const setAvailability = (qty) => {
        const available = product.ats > 0 && qty <= product.ats;
        dispatch({ type: 'setAvailability', payload: available });
    };

    const setBuyQty = (qty) => {
        dispatch({ type: 'setBuyQty', payload: qty });
    };

    const value = useMemo(
        () => ({
            product,
            setAvailability,
            setBuyQty,
        }),
        [product]
    );

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);

export default ProductProvider;
