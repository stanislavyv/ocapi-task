import { useEffect, useReducer } from 'react';

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

const ProductBundle = ({ inputProduct }) => {
    const [product, dispatch] = useReducer(reducer, null);

    useEffect(() => {
        dispatch({
            type: 'setProduct',
            payload: {
                ...inputProduct,
                isAvailable:
                    inputProduct.ats > 0 &&
                    areAllBundledProductsAvailable(inputProduct),
                selectedQty: 1,
            },
        });
    }, [inputProduct]);

    /**
     * Checks if all bundled products are available
     * @param {Object} product
     * @returns {Boolean}
     */
    const areAllBundledProductsAvailable = (product) => {
        return product.bundledProducts.every((p) => p.ats > 0);
    };

    /**
     * Sets bundle product's availability
     * @param {Number} selectedQty
     */
    const setAvailability = (selectedQty) => {
        const newBuyQty = selectedQty + (product.buyQty ?? 0);

        const available =
            product.ats > 0 &&
            newBuyQty <= product.ats &&
            areAllBundledProductsAvailable(product);
        dispatch({ type: 'setAvailability', payload: available });
    };

    /**
     * Sets product's selected quantity
     * @param {Number} qty
     */
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
