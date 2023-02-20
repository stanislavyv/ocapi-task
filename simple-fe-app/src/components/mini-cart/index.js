import { useState } from 'react';
import { useCart } from '../../context/CartContext';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Tooltip } from '@mui/material';

import CartDialog from '../modals/cart-dialog';

const MiniCart = () => {
    const [open, setOpen] = useState(false);
    const { getNumberOfItems } = useCart();

    const handleOpen = () => {
        setOpen(true);
    };

    const isDisabled = () => {
        return getNumberOfItems() < 1;
    };

    return (
        <>
            <Tooltip title='Cart'>
                <span>
                    <IconButton
                        onClick={handleOpen}
                        disabled={isDisabled()}
                        aria-label='cart'
                    >
                        <Badge
                            badgeContent={getNumberOfItems()}
                            color='primary'
                            overlap='circular'
                        >
                            <ShoppingBagIcon fontSize='large' />
                        </Badge>
                    </IconButton>
                </span>
            </Tooltip>

            <CartDialog setOpen={setOpen} open={open} />
        </>
    );
};

export default MiniCart;
