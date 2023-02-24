import { useCart } from '../../../context/CartContext';

import styled from '@mui/material/styles/styled';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledAddToCart = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        alignSelf: 'center',
        marginTop: theme.spacing(2),
    },

    [theme.breakpoints.up('md')]: {
        alignSelf: 'baseline',
        marginTop: theme.spacing(0),
    },
}));

const AddToCart = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <>
            <StyledAddToCart>
                <Button
                    variant='contained'
                    disabled={!product.isAvailable}
                    onClick={() => addToCart(product)}
                >
                    <ShoppingCartIcon />
                    Add to cart
                </Button>
            </StyledAddToCart>
        </>
    );
};

export default AddToCart;
