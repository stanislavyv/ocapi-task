import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import MiniCart from '../mini-cart';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' color='secondary'>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <img
                        height='40px'
                        src={process.env.PUBLIC_URL + '/salesforce.svg'}
                        alt='logo'
                    />

                    <MiniCart />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
