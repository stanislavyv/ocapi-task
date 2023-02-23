import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';

export default function ProductSizeSelect({
    product,
    setSize,
    setAvailability,
}) {
    const [state, setState] = useState({ selected: '' });

    useEffect(() => {
        if (product && product.availableSizes) {
            setState((prev) => ({ ...prev, sizes: product.availableSizes }));
        }
    }, [product]);

    const handleChange = (e) => {
        setSize(e.target.value);
        setState((prev) => ({ ...prev, selected: e.target.value }));
        setAvailability(product.selectedQty);
    };

    return (
        <>
            {product && state.sizes && (
                <Stack direction={'row'}>
                    <Typography variant='h5' mr={'1rem'}>
                        Size:{' '}
                    </Typography>
                    <Select
                        size={'small'}
                        displayEmpty
                        value={state.selected}
                        onChange={handleChange}
                    >
                        <MenuItem value='' sx={{ display: 'none' }}>
                            Select size
                        </MenuItem>
                        {product.availableSizes.map(({ value, label }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            )}
        </>
    );
}
