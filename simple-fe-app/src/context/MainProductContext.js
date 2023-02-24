import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import { getProductModel } from '../services/productService';
import { notifyError } from '../utils/toast';

const MainMainProductContext = React.createContext('');

const MainProductProvider = ({ children }) => {
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
        <MainMainProductContext.Provider value={mainProduct}>
            {children}
        </MainMainProductContext.Provider>
    );
};

export const useMainProduct = () => useContext(MainMainProductContext);

export default MainProductProvider;
