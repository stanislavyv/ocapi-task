import { useMainProduct } from '../../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const StyledProductDescription = styled(Stack)(({ theme }) => ({
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

const ProductDescription = ({ product }) => {
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
