import { useProduct } from '../../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AddToCart from '../add-to-cart';

const StyledProductPriceWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
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
    const product = useProduct();

    return (
        <StyledProductPriceWrapper>
            <Box display={'flex'} flexGrow={{ xs: 2, md: 1 }}>
                <Typography variant='h5' width={'5rem'}>
                    Price:{' '}
                </Typography>
                <Typography variant='h5'>
                    &#36;{product.price.toFixed(2)}
                </Typography>
            </Box>

            <AddToCart />
        </StyledProductPriceWrapper>
    );
};

export default ProductPrice;
