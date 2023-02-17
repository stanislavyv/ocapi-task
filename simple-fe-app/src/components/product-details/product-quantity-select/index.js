import { useEffect } from 'react';
import { useProduct } from '../../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const StyledSelectWrapper = styled(Box)({
    display: 'flex',
    flexGrow: 1,

    select: {
        height: '2.4rem',
        textAlign: 'center',
        width: '100%',
        maxWidth: '3rem',
    },
});

export default function ProductQuantitySelect() {
    const { product, setAvailability, setBuyQty } = useProduct();

    const handleChange = (e) => {
        setBuyQty(e.target.value);
        setAvailability(e.target.value);
    };

    return (
        <StyledSelectWrapper>
            <Typography variant='h5' mr={'1rem'}>
                Quantity:{' '}
            </Typography>
            <select value={product.buyQty} onChange={handleChange}>
                {values.map((v) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </select>
        </StyledSelectWrapper>
    );
}
