import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

import ocapiConfig from '../../config/ocapi.json';
import { getContentAsset } from '../../services/ocapiService';
import createMarkup from '../../utils/createMarkup';

const CID = ocapiConfig.CONTENT_IDS.THANK_YOU_PAGE;

const StyledOrderConfirmation = styled(Box)({
    '& .thank-you-wrapper': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },

    '& .thank-you-title': {
        marginBottom: '0.4rem',
    },
    '& .thank-you-order-id': {
        fontStyle: 'oblique',
    },
});

const OrderConfirmation = ({ orderId }) => {
    const [contentBody, setContentBody] = useState(null);
    const { emptyCart } = useCart();

    useEffect(() => {
        getContentAsset(CID).then((c_body) => {
            console.log(c_body);
            const updatedBody = getUpdatedBody(c_body);
            console.log(updatedBody);
            setContentBody(updatedBody);
        });

        emptyCart();
    }, [orderId]);

    /**
     * Replaces the order id placeholder with the current value
     * @param {String | null} contentBody
     * @returns {String} updated content body
     */
    function getUpdatedBody(contentBody) {
        const updatedBody = contentBody.replace('${order ID}', orderId);
        return updatedBody;
    }

    return (
        <>
            {contentBody && (
                <StyledOrderConfirmation
                    dangerouslySetInnerHTML={createMarkup(contentBody)}
                ></StyledOrderConfirmation>
            )}
        </>
    );
};

export default OrderConfirmation;
