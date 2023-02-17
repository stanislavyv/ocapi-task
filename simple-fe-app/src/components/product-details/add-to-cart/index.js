import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AddToCart = () => {
    return (
        <Box alignSelf={{ xs: 'center', md: 'auto' }}>
            <Button variant='contained'>
                <ShoppingCartIcon />
                Add to cart
            </Button>
        </Box>
    );
};

export default AddToCart;
