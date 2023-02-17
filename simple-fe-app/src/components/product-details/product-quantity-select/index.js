import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
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
    const [qty, setQty] = useState(1);

    const handleChange = (e) => {
        setQty(e.target.value);
    };

    return (
        <StyledSelectWrapper>
            <Typography variant='h5' width={'7.5rem'}>
                Quantity:{' '}
            </Typography>
            <select value={qty} onChange={handleChange}>
                {values.map((v) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </select>
        </StyledSelectWrapper>
    );
}
