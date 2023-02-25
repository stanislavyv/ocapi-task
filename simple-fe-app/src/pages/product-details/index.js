import { useMainProduct } from '../../context/MainProductContext';

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
    const mainProduct = useMainProduct();

    return (
        <StyledProductDetailsWrapper>
            {mainProduct ? (
                mainProduct.type === 'variant' ? (
                    <ProductVariant inputProduct={mainProduct} />
                ) : mainProduct.type === 'master' ? (
                    <ProductMaster inputProduct={mainProduct} />
                ) : (
                    <ProductBundle inputProduct={mainProduct} />
                )
            ) : (
                <Progress />
            )}
        </StyledProductDetailsWrapper>
    );
};

export default ProductDetails;
