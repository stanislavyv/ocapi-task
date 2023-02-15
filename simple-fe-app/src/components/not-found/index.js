import styled from '@mui/material/styles/styled';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const StyledNotFound = styled(Container)({
    height: '100%',
    padding: '1rem',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
});

const NotFound = () => {
    return (
        <StyledNotFound>
            <Typography variant='h2'>404 Not Found</Typography>
            <Typography variant='h5'>
                Please provide a valid product id in the url
            </Typography>
        </StyledNotFound>
    );
};

export default NotFound;
