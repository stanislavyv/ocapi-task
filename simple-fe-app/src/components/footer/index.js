import { useEffect, useState } from 'react';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import ocapiConfig from '../../config/ocapi.json';
import { getContentAsset } from '../../services/ocapiService';
import createMarkup from '../../utils/createMarkup';

const CID = ocapiConfig.CONTENT_IDS.FOOTER_LINKS;

const StyledFooterLinks = styled(Box)({
    '& ul': {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        minWidth: '14rem',
        width: '100%',
    },
});

const Footer = () => {
    const [asset, setAsset] = useState('');

    useEffect(() => {
        getContentAsset(CID).then((res) => {
            setAsset(res);
        });
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' color='secondary'>
                <Toolbar sx={{ justifyContent: 'center', color: 'white' }}>
                    <StyledFooterLinks
                        dangerouslySetInnerHTML={createMarkup(asset)}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Footer;
