import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const MiniCart = () => {
    const [numberOfProducts, setNumberOfProducts] = useState(4);

    return (
        <IconButton aria-label='cart' sx={{ color: 'white' }}>
            <Badge
                badgeContent={numberOfProducts}
                color='primary'
                overlap='circular'
            >
                <ShoppingBagIcon fontSize='large' />
            </Badge>
        </IconButton>
    );
};

export default MiniCart;
