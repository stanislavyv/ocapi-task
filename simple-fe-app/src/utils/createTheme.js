import { createTheme } from '@mui/material';

export default () => {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return theme;
};
