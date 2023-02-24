import { useMainProduct } from '../../context/MainProductContext';

import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';

import Progress from '../progress';
import ProductVariant from './product-variant';
import ProductMaster from './product-master';
import ProductBundle from './product-bundle';

const StyledProductDetailsWrapper = styled(Stack)({
    height: '100%',
    direction: 'row',
    justifyContent: 'center',
    alignItems: 'center',
});

const ProductDetails = () => {
    const mainProduct = useMainProduct();

    return (
        <StyledProductDetailsWrapper>
            {mainProduct ? (
                mainProduct.type === 'variant' ? (
                    <ProductVariant pid={mainProduct.id} />
                ) : mainProduct.type === 'master' ? (
                    <ProductMaster pid={mainProduct.id} />
                ) : (
                    <ProductBundle pid={mainProduct.id} />
                )
            ) : (
                <Progress />
            )}
        </StyledProductDetailsWrapper>
    );
};

export default ProductDetails;
