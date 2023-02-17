import { useProduct } from '../../../context/ProductContext';

import Typography from '@mui/material/Typography';

const ProductNumber = () => {
    const product = useProduct();

    return (
        <Typography
            variant='body1'
            color={'GrayText'}
            sx={{ fontStyle: 'oblique' }}
            flexGrow={{ xs: 2, sm: 1 }}
        >
            Item No: {product.id}
        </Typography>
    );
};

export default ProductNumber;
