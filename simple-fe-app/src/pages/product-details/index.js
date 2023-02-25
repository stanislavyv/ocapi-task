import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import { getFullProductModel } from '../../services/productService';
import { notifyError } from '../../utils/toast';

import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';

import Progress from '../../components/progress';
import ProductVariant from '../../components/product-details/product-variant';
import ProductMaster from '../../components/product-details/product-master';
import ProductBundle from '../../components/product-details/product-bundle';

const StyledProductDetailsWrapper = styled(Stack)({
    height: '100%',
    direction: 'row',
    justifyContent: 'center',
    alignItems: 'center',
});

const ProductDetails = () => {
    const [product, setProduct] = useState(null);

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has('pid')) {
            const pid = searchParams.get('pid');

            getFullProductModel(pid)
                .then(setProduct)
                .catch(() => {
                    notifyError();
                    navigate('/not-found');
                });
        } else if (!location.pathname.includes('/checkout')) {
            navigate('/not-found');
        }
    }, [searchParams]);

    return (
        <StyledProductDetailsWrapper>
            {product ? (
                product.type === 'variant' ? (
                    <ProductVariant inputProduct={product} />
                ) : product.type === 'master' ? (
                    <ProductMaster inputProduct={product} />
                ) : (
                    <ProductBundle inputProduct={product} />
                )
            ) : (
                <Progress />
            )}
        </StyledProductDetailsWrapper>
    );
};

export default ProductDetails;
