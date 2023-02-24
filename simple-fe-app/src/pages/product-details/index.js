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
