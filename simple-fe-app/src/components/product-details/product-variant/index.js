import { useProduct } from '../../../context/ProductContext';

import ProductContainer from '../product-container';
import ProductImages from '../product-images';
import ProductContentContainer from '../product-content-container';
import ProductTitle from '../product-title';
import ProductNumber from '../product-number';
import ProductSelectQuantity from '../product-quantity-select';
import ProductAvailability from '../product-availability';
import ProductDescription from '../product-description';
import ProductPrice from '../product-price';

const ProductVariant = () => {
    const { product } = useProduct();

    return (
        <ProductContainer>
            <ProductImages />
            <ProductContentContainer>
                <ProductTitle />
                <ProductNumber />
                <ProductSelectQuantity />
                <ProductAvailability />
                <ProductDescription />
                <ProductPrice />
            </ProductContentContainer>
        </ProductContainer>
    );
};

export default ProductVariant;
