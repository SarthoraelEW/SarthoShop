import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { isEmpty } from "../Utils";
import QuantityButton from "./QuantityButton";

const ProductInfo = ({ article }) => {
  const [quantity, setQuantity] = useState(1);

  let startingSize = null;
  if (!isEmpty(article.sizes)) {
    startingSize = article.sizes[0].size;
  }

  const [displaySize, setDisplaySize] = useState(startingSize);

  const [cartCookie, setCartCookie] = useCookies(["cart"]);

  const onQuantityChange = (quantity) => {
    if (quantity === 0)
      setQuantity(1);
    else
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
      setCartCookie(
        "cart",
        [{ product: article.name, size: displaySize, quantity: quantity }],
        { path: "/" }
      );
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
        newCookie.push({
          product: article.name,
          size: displaySize,
          quantity: quantity,
        });
      setCartCookie("cart", newCookie, { path: "/" });
    }
  };

  useEffect(() => {
    setDisplaySize(startingSize);
  }, [startingSize]);

  return (
    <div className="product-info">
      <div className="product-info-header">
        <h1>{article.name}</h1>
        <h2>{article.price}</h2>
        <h5>Taxes incluses.</h5>
      </div>
      <hr className="solid" />
      <div className="add-card-form">
        {!isEmpty(displaySize) && (
          <div>
            <label>SIZE</label>
            <br />
            <select
              onChange={(e) => {
                setDisplaySize(e.target.value);
              }}
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
        )}
        <QuantityButton onChange={onQuantityChange} mustBeSupThanOne={true} />
      </div>
      {isOnSale() ? (
        <button className="saleon-button" onClick={addToCart}>
          AJOUTER AU PANIER
        </button>
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
