import Typography from '@mui/material/Typography';

const ProductTitle = ({ product }) => {
    return (
        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            {product.name}
        </Typography>
    );
};

export default ProductTitle;
