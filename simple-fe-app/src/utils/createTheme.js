import { createTheme } from '@mui/material';

export default () => {
    const theme = createTheme({
        palette: {
            mode: 'light',

            secondary: {
                main: '#272727',
            },
        },
    });

    return theme;
};
