import { useProduct } from '../../../context/ProductContext';
import { useCart } from '../../../context/CartContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AddToCart = () => {
    const { product } = useProduct();
    const { addToCart } = useCart();

    return (
        <Box alignSelf={{ xs: 'center', md: 'auto' }}>
            <Button
                variant='contained'
                disabled={!product.isAvailable}
                onClick={() => addToCart(product)}
            >
                <ShoppingCartIcon />
                Add to cart
            </Button>
        </Box>
    );
};

export default AddToCart;
