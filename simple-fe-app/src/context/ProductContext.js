import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import { getProductModel } from '../services/ocapiService';
import { notifyError } from '../utils/toast';

const ProductContext = React.createContext('');

const ProductProvider = ({ children }) => {
    const [mainProduct, setMainProduct] = useState(null);

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has('pid')) {
            const pid = searchParams.get('pid');

            getProductModel(pid)
                .then(setMainProduct)
                .catch((e) => {
                    notifyError();
                    navigate('/not-found');
                });
        } else if (!location.pathname.includes('/checkout')) {
            navigate('/not-found');
        }
    }, [searchParams]);

    return (
        <ProductContext.Provider value={mainProduct}>
            {children}
        </ProductContext.Provider>
    );
};

export const useMainProduct = () => useContext(ProductContext);

export default ProductProvider;
