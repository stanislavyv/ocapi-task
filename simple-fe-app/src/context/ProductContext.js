import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getProductModel } from '../services/ocapiService';

const ProductContext = React.createContext('');

const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has('pid')) {
            const pid = searchParams.get('pid');

            getProductModel(pid)
                .then(setProduct)
                .catch(() => {
                    navigate('/not-found');
                });
        } else {
            navigate('/not-found');
        }
    }, [searchParams]);

    return (
        <ProductContext.Provider value={product}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);

export default ProductProvider;
