import React from 'react';
import ImageSlider from './ImageSlider';
import FullscreenImage from './FullscreenImage';
import ProductInfo from './ProductInfo';

const ProductContainer = ({article}) => {
  return (
    <div>
      <ImageSlider>
      </ImageSlider>
      <FullscreenImage />
      <ProductInfo article={article} />
    </div>
  );
};

export default ProductContainer;