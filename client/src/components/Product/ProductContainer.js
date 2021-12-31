import React, { useState } from "react";
import { isEmpty } from "../Utils";
import VerticalCarousel from "../VerticalCarousel/VerticalCarousel";
import ExposedImage from "./ExposedImage";
import ProductInfo from "./ProductInfo";

const ProductContainer = ({ article }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const handleImageSelection = (index) => {
    setImgIndex(index);
  };

  return (
    <div className="product-container">
      <div className="product">
        {!isEmpty(article) && (
          <VerticalCarousel
            images={article.photos}
            handleImageSelection={handleImageSelection}
          />
        )}
        {!isEmpty(article) && <ExposedImage img={article.photos[imgIndex]} />}
        {!isEmpty(article) && <ProductInfo article={article} />}
      </div>
    </div>
  );
};

export default ProductContainer;
