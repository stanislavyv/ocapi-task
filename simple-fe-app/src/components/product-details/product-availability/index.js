import { useProduct } from '../../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const StyledProductAvailability = styled(Stack)({
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flexGrow: 1,

    '& h5': {
        marginRight: '1rem',
    },
});

const ProductAvailability = () => {
    const { product } = useProduct();

    const color = product.isAvailable ? 'green' : 'red';

    return (
        <StyledProductAvailability>
            <Typography variant='h5'>Availability:</Typography>
            <Typography variant={'h6'} color={color}>
                {product.isAvailable ? 'Available' : 'Out of Stock'}
            </Typography>
        </StyledProductAvailability>
    );
};

export default ProductAvailability;
