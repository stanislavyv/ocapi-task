import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

const StyledProductContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',

        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));

const ProductContainer = ({ children }) => {
    return <StyledProductContainer>{children}</StyledProductContainer>;
};

export default ProductContainer;
