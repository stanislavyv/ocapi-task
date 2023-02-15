import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from './globalStyles';
import App from './app';

import createTheme from './utils/createTheme';
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <CssBaseline />
            <GlobalStyles />
            <ThemeProvider theme={createTheme()}>
                <App />
            </ThemeProvider>
        </Router>
    </React.StrictMode>
);
