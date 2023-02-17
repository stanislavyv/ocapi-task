import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

const StyledProductContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',

    [theme.breakpoints.up('xs')]: {
        padding: theme.spacing(2),
        minHeight: '30rem',
        maxHeight: 'auto',
    },

    [theme.breakpoints.up('md')]: {
        padding: `${theme.spacing(0)} ${theme.spacing(1)}`,
        minHeight: '18rem',
        maxHeight: '20rem',
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
