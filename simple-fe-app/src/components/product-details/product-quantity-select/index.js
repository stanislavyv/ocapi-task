import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ProductQuantitySelect({
    product,
    setAvailability,
    setSelectedQty,
}) {
    const handleChange = (e) => {
        const qty = Number(e.target.value);

        setSelectedQty(qty);
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
                value={product.selectedQty}
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
