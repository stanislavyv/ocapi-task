import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getProductModel } from '../../services/ocapiService';

import styled from '@mui/material/styles/styled';
import Container from '@mui/material/Container';

import Progress from '../progress';
import ProductVariant from './product-variant';

const StyledProductDetailsWrapper = styled(Container)({
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has('pid')) {
            getProductModel(searchParams.get('pid'))
                .then(setProduct)
                .catch(() => {
                    navigate('/not-found');
                });
        } else {
            navigate('/not-found');
        }
    }, [searchParams]);

    return (
        <StyledProductDetailsWrapper>
            {product ? <ProductVariant /> : <Progress />}
        </StyledProductDetailsWrapper>
    );
};

export default ProductDetails;
