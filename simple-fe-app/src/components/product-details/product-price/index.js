import { useProduct } from '../../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AddToCart from '../add-to-cart';

const StyledProductPriceWrapper = styled(Stack)(({ theme }) => ({
    flexWrap: 'nowrap',

    [theme.breakpoints.up('xs')]: {
        flexDirection: 'column',
        flexGrow: 1,
    },

    [theme.breakpoints.up('sm')]: {
        flexGrow: 0,
    },

    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

const ProductPrice = () => {
    const { product } = useProduct();

    return (
        <StyledProductPriceWrapper>
            <Stack direction={'row'} flexGrow={{ xs: 2, md: 1 }}>
                <Typography variant='h5' mr={'1rem'}>
                    Price:{' '}
                </Typography>
                <Typography variant='h5'>
                    &#36;{product.price.toFixed(2)}
                </Typography>
            </Stack>

            <AddToCart />
        </StyledProductPriceWrapper>
    );
};

export default ProductPrice;
