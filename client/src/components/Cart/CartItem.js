import React, { useState } from "react";
import { useCookies } from "react-cookie";
import QuantityButton from "../Product/QuantityButton";

const CartItem = ({ article, quantity, size }) => {
  const [cartCookie, setCartCookie] = useCookies(["cart"]);

  const onQuantityChange = (quantity) => {
    let newCookie = [];
    if (quantity === 0) {
      newCookie = cartCookie.cart.filter((p) => !(p.product === article.name && p.size === size));
    } else {
      newCookie = cartCookie.cart;
      newCookie.forEach((product) => {
        if (product.product === article.name && product.size === size)
          product.quantity = quantity;
      });
    }
    setCartCookie("cart", newCookie, { path: "/" });
  };

  return (
    <div className="cart-item">
      <img
        src={`${process.env.REACT_APP_PUBLIC_URL}` + article.photos[0]}
        alt="article"
      />
      <div>
        <h2 className="article-name">{article.name}</h2>
        <h5 className="size">{size}</h5>
        <h5 className="link">Supprimer</h5>
      </div>
      <div className="quantity-button-container">
        <QuantityButton preQuantity={quantity} onChange={onQuantityChange} />
      </div>
      <h2 className="article-price">{article.price}</h2>
    </div>
  );
};

export default CartItem;
