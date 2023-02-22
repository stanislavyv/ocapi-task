import { useProduct } from '../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';

import Progress from '../progress';
import ProductVariant from './product-variant';

const StyledProductDetailsWrapper = styled(Stack)({
    height: '100%',
    direction: 'row',
    justifyContent: 'center',
    alignItems: 'center',
});

const ProductDetails = () => {
    const { product } = useProduct();

    return (
        <StyledProductDetailsWrapper>
            {product ? <ProductVariant /> : <Progress />}
        </StyledProductDetailsWrapper>
    );
};

export default ProductDetails;
