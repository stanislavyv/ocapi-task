import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StyledOrderConfirmation = styled(Box)(({ theme }) => ({
    height: '100%',
    padding: '1rem',
    display: 'flex',
    gap: theme.spacing(1),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
}));

const OrderConfirmation = ({ orderId }) => {
    const { emptyCart } = useCart();

    useEffect(() => {
        emptyCart();
    }, []);

    return (
        <StyledOrderConfirmation>
            <Typography variant='h3'>Successful order!</Typography>
            {orderId && (
                <Typography
                    variant='body1'
                    color={'GrayText'}
                    sx={{ fontStyle: 'oblique' }}
                >
                    Order ID: {orderId}
                </Typography>
            )}
            <Typography variant='h5'>
                Thank you for shopping with us!
            </Typography>
        </StyledOrderConfirmation>
    );
};

export default OrderConfirmation;
