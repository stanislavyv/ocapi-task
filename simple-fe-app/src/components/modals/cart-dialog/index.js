import { useCart } from '../../../context/CartContext';

import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import LineItem from '../../line-item';

export default function CartDialog({ open, setOpen }) {
    const { items, getSum } = useCart();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={'paper'}
            aria-labelledby='scroll-dialog-title'
        >
            <DialogTitle id='scroll-dialog-title'>Cart</DialogTitle>
            <DialogContent dividers>
                {items.map((p) => {
                    return <LineItem product={p} key={p.id} />;
                })}
                <Box mt={1}>Sum: &#36;{getSum().toFixed(2)}</Box>
            </DialogContent>
            <DialogActions>
                <Button component={Link} to={'/checkout'} onClick={handleClose}>
                    Checkout
                </Button>
            </DialogActions>
        </Dialog>
    );
}
