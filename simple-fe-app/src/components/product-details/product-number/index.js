import Typography from '@mui/material/Typography';

const ProductNumber = ({ product }) => {
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
