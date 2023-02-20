import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function LineItem({ product }) {
    return (
        <Box sx={{ minWidth: '17rem' }}>
            <Card variant='outlined'>
                <CardContent>
                    <Typography variant='h5' component='div'>
                        {product.name}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color='text.secondary'
                        gutterBottom
                    >
                        {product.id}
                    </Typography>
                    <Typography>Qty: {product.buyQty}</Typography>
                    <Typography>
                        &#36;{(product.buyQty * product.price).toFixed(2)}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
