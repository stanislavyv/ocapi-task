import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from './GlobalStyles';
import App from './App';

import createTheme from './utils/createTheme';
import { ThemeProvider } from '@mui/material';

import CartProvider from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <CssBaseline />
        <GlobalStyles />
        <ThemeProvider theme={createTheme()}>
            <CartProvider>
                <App />
            </CartProvider>
        </ThemeProvider>
    </Router>
);
