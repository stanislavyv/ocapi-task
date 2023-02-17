import { useProduct } from '../../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StyledProductDescription = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'nowrap',

    [theme.breakpoints.up('xs')]: {
        flexDirection: 'column',
        flexGrow: 2,
    },

    [theme.breakpoints.up('sm')]: {
        flexGrow: 1,
    },

    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',

        '& h5': {
            marginRight: '1rem',
        },
    },
}));

const ProductDescription = () => {
    const { product } = useProduct();

    return (
        <StyledProductDescription>
            <Typography variant='h5'>Description:</Typography>
            <Typography variant='body2' maxWidth={'25rem'}>
                {product.description}
            </Typography>
        </StyledProductDescription>
    );
};

export default ProductDescription;