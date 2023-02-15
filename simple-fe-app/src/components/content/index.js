import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

const StyledContent = styled(Box)({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const Content = ({ children }) => {
    return <StyledContent>{children}</StyledContent>;
};

export default Content;
