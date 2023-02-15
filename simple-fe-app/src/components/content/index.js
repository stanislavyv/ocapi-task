import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

const StyledContent = styled(Box)({
    /* 752 -> 60 + 60 (header + footer height)*/
    minHeight: `calc(${100}vh - (${60}px + ${60}px))`,
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const Content = ({ children }) => {
    return <StyledContent>{children}</StyledContent>;
};

export default Content;
