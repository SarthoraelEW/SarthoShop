import React from "react";
import { useNavigate } from "react-router-dom";

const ProductPageFooter = ({ goBackCollection }) => {
  const navigate = useNavigate();

  const goBackToCollection = () => {
    navigate('/' + goBackCollection);
  }

  return (
    <div className="product-page-footer">
      <h2 onClick={goBackToCollection}>
        <span className="material-icons-outlined">arrow_back</span>RETOUR À{" "}
        {goBackCollection}
      </h2>
    </div>
  );
};

export default ProductPageFooter;
