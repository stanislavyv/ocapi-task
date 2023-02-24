import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

const StyledImgWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        alignSelf: 'center',

        img: {
            margin: '0 auto',
        },
    },

    [theme.breakpoints.up('md')]: {
        alignSelf: 'baseline',

        img: {
            maxHeight: '25rem',
            margin: 0,
        },
    },

    img: {
        maxWidth: '100%',
        display: 'block',
        borderRadius: '3px',
        height: 'auto',
    },
}));

const ProductImages = ({ product }) => {
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
