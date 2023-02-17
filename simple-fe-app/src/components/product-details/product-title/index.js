import { useProduct } from '../../../context/ProductContext';

import Typography from '@mui/material/Typography';

const ProductTitle = () => {
    const { product } = useProduct();

    return (
        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            {product.name}
        </Typography>
    );
};

export default ProductTitle;
