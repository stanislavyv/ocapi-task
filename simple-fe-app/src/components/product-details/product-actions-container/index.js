import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';

const StyledProductActionsContainer = styled(Stack)(({ theme }) => ({
    flexWrap: 'nowrap',

    [theme.breakpoints.up('xs')]: {
        flexDirection: 'column',
        flexGrow: 1,
    },

    [theme.breakpoints.up('sm')]: {
        flexGrow: 0,
    },

    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    },
}));

const ProductActionsContainer = ({ children }) => {
    return (
        <StyledProductActionsContainer>
            {children}
        </StyledProductActionsContainer>
    );
};

export default ProductActionsContainer;
