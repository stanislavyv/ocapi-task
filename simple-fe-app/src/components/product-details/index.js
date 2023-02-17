import { useProduct } from '../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

import Progress from '../progress';
import ProductVariant from './product-variant';

const StyledProductDetailsWrapper = styled(Box)({
    height: '100%',
    display: 'flex',
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
