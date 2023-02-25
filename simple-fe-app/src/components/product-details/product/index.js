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
import ProductActionsContainer from '../product-actions-container';
import AddToCart from '../add-to-cart';

const Product = ({
    product,
    setColor,
    setSize,
    setAvailability,
    setSelectedQty,
}) => {
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
                {!product.isBundleItem && (
                    <ProductSelectQuantity
                        product={product}
                        setAvailability={setAvailability}
                        setSelectedQty={setSelectedQty}
                    />
                )}
                <ProductAvailability product={product} />
                <ProductDescription product={product} />
                <ProductActionsContainer>
                    <ProductPrice product={product} />
                    {!product.isBundleItem && <AddToCart product={product} />}
                </ProductActionsContainer>
            </ProductContentContainer>
        </ProductContainer>
    );
};

export default Product;
