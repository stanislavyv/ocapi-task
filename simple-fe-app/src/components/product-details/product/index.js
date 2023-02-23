import { useMainProduct } from '../../../context/ProductContext';

import ProductContainer from '../product-container';
import ProductImages from '../product-images';
import ProductContentContainer from '../product-content-container';
import ProductTitle from '../product-title';
import ProductNumber from '../product-number';
import ProductSelectQuantity from '../product-quantity-select';
import ProductAvailability from '../product-availability';
import ProductDescription from '../product-description';
import ProductPrice from '../product-price';
import ProductVariationAttributes from '../product-variation-attributes';

const Product = ({
    product,
    setColor,
    setSize,
    setAvailability,
    setSelectedQty,
}) => {
    const mainProduct = useMainProduct();

    return (
        <ProductContainer>
            <ProductImages product={product} />
            <ProductContentContainer>
                <ProductTitle product={product} />
                <ProductNumber product={product} />
                {product.type === 'master' && (
                    <ProductVariationAttributes
                        product={product}
                        setColor={setColor}
                        setSize={setSize}
                        setAvailability={setAvailability}
                    />
                )}
                {mainProduct.type !== 'bundle' && (
                    <ProductSelectQuantity
                        product={product}
                        setAvailability={setAvailability}
                        setSelectedQty={setSelectedQty}
                    />
                )}
                <ProductAvailability product={product} />
                <ProductDescription product={product} />
                <ProductPrice product={product} />
            </ProductContentContainer>
        </ProductContainer>
    );
};

export default Product;
