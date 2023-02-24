import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';

const StyledProductContainer = styled(Stack)(({ theme }) => ({
    alignItems: 'flex-start',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        gap: theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));

const ProductContainer = ({ children }) => {
    return <StyledProductContainer>{children}</StyledProductContainer>;
};

export default ProductContainer;
