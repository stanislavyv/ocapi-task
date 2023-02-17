import { useCart } from '../../context/CartContext';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Tooltip } from '@mui/material';

const MiniCart = () => {
    const { getNumberOfItems } = useCart();

    return (
        <Tooltip title='Checkout'>
            <IconButton aria-label='cart'>
                <Badge
                    badgeContent={getNumberOfItems()}
                    color='primary'
                    overlap='circular'
                >
                    <ShoppingBagIcon fontSize='large' />
                </Badge>
            </IconButton>
        </Tooltip>
    );
};

export default MiniCart;
