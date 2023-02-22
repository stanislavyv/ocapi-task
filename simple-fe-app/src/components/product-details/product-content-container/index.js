import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';

const StyledProductContentContainer = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1),
    overflow: 'auto',

    [theme.breakpoints.up('xs')]: {
        padding: theme.spacing(2),
        width: '100%',
    },

    [theme.breakpoints.up('md')]: {
        padding: `${theme.spacing(0)} ${theme.spacing(1)}`,
        width: 'auto',
    },
}));

const ProductContentContainer = ({ children }) => {
    return (
        <StyledProductContentContainer>
            {children}
        </StyledProductContentContainer>
    );
};

export default ProductContentContainer;
