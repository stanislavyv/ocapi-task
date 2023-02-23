import styled from '@mui/material/styles/styled';
import Stack from '@mui/material/Stack';

import ProductSizeSelect from '../product-size-select';
import ProductColorSelect from '../product-color-select';

const StyledVariationAttributes = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1),

    [theme.breakpoints.up('md')]: {
        gap: theme.spacing(3),
        flexDirection: 'row',
    },
}));

const ProductVariationAttributes = ({
    product,
    setColor,
    setSize,
    setAvailability,
}) => {
    return (
        <StyledVariationAttributes>
            {product.hasSizeAttribute && (
                <ProductSizeSelect
                    product={product}
                    setSize={setSize}
                    setAvailability={setAvailability}
                />
            )}
            {product.hasColorAttribute && (
                <ProductColorSelect
                    product={product}
                    setColor={setColor}
                    setAvailability={setAvailability}
                />
            )}
        </StyledVariationAttributes>
    );
};

export default ProductVariationAttributes;
