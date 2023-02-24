import { createTheme } from '@mui/material';

/**
 * Creates new MUI theme
 */
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
