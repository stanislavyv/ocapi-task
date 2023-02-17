import { useProduct } from '../../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

const StyledImgWrapper = styled(Box)(({ theme }) => ({
    width: '100%',

    [theme.breakpoints.up('md')]: {
        flexBasis: '50%',

        img: {
            maxHeight: '20rem',
        },
    },

    img: {
        maxWidth: '100%',
        display: 'block',
        margin: '0 auto',
        borderRadius: '3px',
        height: 'auto',
    },
}));

const ProductImages = () => {
    const { product } = useProduct();

    return (
        <StyledImgWrapper>
            <img
                src={product.images.large[0].link}
                alt={product.images.large[0].alt}
            ></img>
        </StyledImgWrapper>
    );
};

export default ProductImages;
