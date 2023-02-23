import { useMainProduct } from '../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';

import Progress from '../progress';
import ProductVariant from './product-variant';
import ProductMaster from './product-master';

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
                ) : (
                    <ProductMaster pid={mainProduct.id} />
                )
            ) : (
                <Progress />
            )}
        </StyledProductDetailsWrapper>
    );
};

export default ProductDetails;
