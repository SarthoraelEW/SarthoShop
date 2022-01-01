import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import { isEmpty } from "../Utils";
import QuantityButton from "./QuantityButton";

const ProductInfo = ({ article }) => {
  const [quantity, setQuantity] = useState(1);
  const [displaySize, setDisplaySize] = useState(article.sizes[0].size);

  const [cartCookie, setCartCookie] = useCookies(['cart']);

  const onQuantityChange = (quantity) => {
    setQuantity(quantity);
  };

  const isOnSale = () => {
    let b = false;
    article.sizes.forEach((size) => {
      if (displaySize === size.size) {
        if (size.quantity > 0) {
          b = true;
        }
      }
    });
    return b;
  };

  const addToCart = () => {
    if (isEmpty(cartCookie)) {
      setCartCookie('cart', [{product: article.name, size: displaySize, quantity: quantity}], { path: '/' });
    } else {
      let newCookie = cartCookie.cart;
      let found = false;
      newCookie.forEach((product) => {
        console.log(product);
        if (product.product === article.name && product.size === displaySize) {
          product.quantity += quantity;
          found = true;
        }
      });
      if (!found)
        newCookie.push({product: article.name, size: displaySize, quantity: quantity});
      setCartCookie('cart', newCookie, { path: '/' });
    }
  };

  return (
    <div className="product-info">
      <div className="product-info-header">
        <h1>{article.name}</h1>
        <h2>{article.price}</h2>
        <h5>Taxes incluses.</h5>
      </div>
      <hr className="solid" />
      <div className="add-card-form">
        <div>
          <label>SIZE</label>
          <br />
          <select
            onChange={(e) => setDisplaySize(e.target.value)}
            value={displaySize}
          >
            {article.sizes.map((size, index) => {
              return (
                <option value={size.size} key={index}>
                  {size.size}
                </option>
              );
            })}
          </select>
        </div>
        <QuantityButton onChange={onQuantityChange} />
      </div>
      {isOnSale() ? (
        <button className="saleon-button" onClick={addToCart}>AJOUTER AU PANER</button>
      ) : (
        <button className="soldout-button">ÉPUISÉ</button>
      )}
      <hr className="solid" />
      <div className="description-container">
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: article.description }}
        ></div>
        <p className="link">Guide des tailles</p>
      </div>
    </div>
  );
};

export default ProductInfo;
