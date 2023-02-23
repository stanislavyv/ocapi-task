import { useMainProduct } from '../../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const StyledProductAvailability = styled(Stack)(({ theme }) => ({
    flexDirection: 'column',
    flexWrap: 'nowrap',
    flexGrow: 1,

    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',

        '& h5': {
            marginRight: '1rem',
        },
    },
}));

const ProductAvailability = ({ product }) => {
    const [color, setColor] = useState('');
    const [availabilityText, setAvailabilityText] = useState('');

    useEffect(() => {
        setAvailabilityData();
    }, [product]);

    function setAvailabilityData() {
        if (product.isAvailable === null) {
            setColor('black');
            setAvailabilityText('Select styles for availability');
        } else if (product.isAvailable === false) {
            setColor('red');
            setAvailabilityText('Out of stock');
        } else if (product.isAvailable === true) {
            setColor('green');
            setAvailabilityText('Available');
        }
    }

    return (
        <StyledProductAvailability>
            <Typography variant='h5'>Availability:</Typography>
            <Typography variant={'h6'} color={color}>
                {availabilityText}
            </Typography>
        </StyledProductAvailability>
    );
};

export default ProductAvailability;
