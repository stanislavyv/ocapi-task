import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from './globalStyles';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <CssBaseline />
            <GlobalStyles />
            <App />
        </Router>
    </React.StrictMode>
);
