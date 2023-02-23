import { useEffect, useReducer } from 'react';
import { useMainProduct } from '../../../context/ProductContext';

import { getProductModel } from '../../../services/ocapiService';
import { notifyError } from '../../../utils/toast';

import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Product from '../product';
import ProductQuantitySelect from '../product-quantity-select';
import ProductAvailability from '../product-availability';
import ProductPrice from '../product-price';
import AddToCart from '../add-to-cart';

const StyledProductBundle = styled(Stack)(({ theme }) => ({
    margin: `${theme.spacing(2)} 0`,
    gap: theme.spacing(1),
}));

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'setProduct':
            return { ...payload };
        case 'setAvailability':
            return { ...state, isAvailable: payload };
        case 'setSelectedQty':
            return { ...state, selectedQty: payload };
        default:
            return state;
    }
};

const ProductBundle = ({ pid }) => {
    const [product, dispatch] = useReducer(reducer, null);
    const mainProduct = useMainProduct();

    useEffect(() => {
        if (mainProduct.type === 'bundle') {
            dispatch({
                type: 'setProduct',
                payload: {
                    ...mainProduct,
                    isAvailable: mainProduct.ats > 0,
                    selectedQty: 1,
                },
            });
        } else {
            getProductModel(pid)
                .then((res) => {
                    dispatch({
                        type: 'setProduct',
                        payload: {
                            ...res,
                            isAvailable: res.ats > 0,
                            selectedQty: 1,
                        },
                    });
                })
                .catch(notifyError);
        }
    }, [pid]);

    const setAvailability = (selectedQty) => {
        const newBuyQty = selectedQty + (product.buyQty ?? 0);

        const available = product.ats > 0 && newBuyQty <= product.ats;
        dispatch({ type: 'setAvailability', payload: available });
    };

    const setSelectedQty = (qty) => {
        dispatch({ type: 'setSelectedQty', payload: qty });
    };

    return (
        <>
            {product && product.bundledProducts && (
                <StyledProductBundle>
                    <Container>
                        <Typography variant='h2'>{product.name}</Typography>
                        <Typography
                            variant='h5'
                            color={'GrayText'}
                            fontStyle={'oblique'}
                        >
                            {product.id}
                        </Typography>
                    </Container>
                    <Divider variant='fullWidth' flexItem />
                    <Stack
                        spacing={2}
                        alignItems={{ xs: 'center', md: 'baseline' }}
                    >
                        {product.bundledProducts.map((p) => (
                            <Box key={p.id}>
                                <Product
                                    product={{
                                        ...p,
                                        isAvailable: p.ats > 0,
                                    }}
                                />
                                <Divider variant='fullWidth' flexItem />
                            </Box>
                        ))}
                    </Stack>
                    <Stack my={2} alignItems={'center'} spacing={1}>
                        <ProductQuantitySelect
                            product={product}
                            setAvailability={setAvailability}
                            setSelectedQty={setSelectedQty}
                        />
                        <ProductAvailability product={product} />
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={{ xs: 1, md: 4 }}
                        >
                            <ProductPrice product={product} />
                            <AddToCart product={product} />
                        </Stack>
                    </Stack>
                </StyledProductBundle>
            )}
        </>
    );
};

export default ProductBundle;
