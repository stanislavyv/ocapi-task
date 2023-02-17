import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StyledProductAvailability = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'nowrap',
    flexGrow: 1,

    [theme.breakpoints.up('xs')]: {
        flexDirection: 'column',

        '& h5': {
            width: 'auto',
        },
    },

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',

        '& h5': {
            width: '8.5rem',
        },
    },
}));

const ProductAvailability = () => {
    return (
        <StyledProductAvailability>
            <Typography variant='h5'>Availability:</Typography>
            <Typography variant={'h6'}>
                Select quantity for availability
            </Typography>
        </StyledProductAvailability>
    );
};

export default ProductAvailability;
