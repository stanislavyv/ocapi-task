import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';

export default function ProductColorSelect({
    product,
    setColor,
    setAvailability,
}) {
    const [state, setState] = useState({ selected: '' });

    useEffect(() => {
        if (product && product.availableColors) {
            setState((prev) => ({ ...prev, colors: product.availableColors }));
        }
    }, [product]);

    const handleChange = (e) => {
        setColor(e.target.value);
        setState((prev) => ({ ...prev, selected: e.target.value }));
        setAvailability(product.selectedQty);
    };

    return (
        <>
            {product && state.colors && (
                <Stack direction={'row'}>
                    <Typography variant='h5' mr={'1rem'}>
                        Color:{' '}
                    </Typography>
                    <Select
                        size={'small'}
                        displayEmpty
                        value={state.selected}
                        onChange={handleChange}
                    >
                        <MenuItem value='' sx={{ display: 'none' }}>
                            Select color
                        </MenuItem>
                        {product.availableColors.map(
                            ({ color, refinementColor }) => (
                                <MenuItem key={color} value={color}>
                                    {refinementColor}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </Stack>
            )}
        </>
    );
}
