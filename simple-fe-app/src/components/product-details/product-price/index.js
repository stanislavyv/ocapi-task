import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ProductPrice = ({ product }) => {
    return (
        <Stack direction={'row'}>
            <Typography variant='h5' mr={'1rem'}>
                Price:{' '}
            </Typography>
            <Typography variant='h5'>
                &#36;{product.price.toFixed(2)}
            </Typography>
        </Stack>
    );
};

export default ProductPrice;
