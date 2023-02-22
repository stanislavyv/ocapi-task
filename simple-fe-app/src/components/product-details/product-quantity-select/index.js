import { useEffect } from 'react';
import { useProduct } from '../../../context/ProductContext';

import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { MenuItem, TextField } from '@mui/material';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ProductQuantitySelect() {
    const { product, setAvailability, setBuyQty } = useProduct();

    const handleChange = (e) => {
        const qty = Number(e.target.value);

        setBuyQty(qty);
        setAvailability(qty);
    };

    return (
        <Stack direction={'row'}>
            <Typography variant='h5' mr={'1rem'}>
                Quantity:{' '}
            </Typography>
            <TextField
                select
                size={'small'}
                value={product.buyQty}
                onChange={handleChange}
            >
                {values.map((v) => (
                    <MenuItem key={v} value={v}>
                        {v}
                    </MenuItem>
                ))}
            </TextField>
        </Stack>
    );
}
