import React, { FC } from 'react';
import { ProductTypes } from '../../redux/trial/TrialReducer';
import ProductCard from './ProductCard';

interface ProductSliderWrapperProps {
  openFullViewModel?: () => void;
  product: ProductTypes;
  selectProduct: (id: string) => void;
}

const ProductSliderWrapper: FC<ProductSliderWrapperProps> = ({
  product,
  openFullViewModel,
  selectProduct,
}) => {
  return (
    <>
      <ProductCard
        openFullView={openFullViewModel}
        productData={product || {}}
        selectProduct={selectProduct}
      />
    </>
  );
};

export default ProductSliderWrapper;
