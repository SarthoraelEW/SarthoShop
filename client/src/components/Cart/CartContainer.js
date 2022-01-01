import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [cartCookie, setCartCookie] = useCookies(["cart"]);

  const [instructions, setInstructions] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const articlesReducer = useSelector((state) => state.articlesReducer);

  const cart = cartCookie.cart;
  const articles = articlesReducer.filter((article) =>
    cart.map((item) => item.product).includes(article.name)
  );

  const getArticle = (name) => {
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].name === name) return articles[i];
    }
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
      const articlePrice = getArticle(cart[i].product).price;
      const floatPrice = parseFloat(articlePrice.substring(0, articlePrice.length - 1).replace(',', '.'));
      totalPrice += floatPrice * cart[i].quantity;
    }
    return totalPrice.toFixed(2);
  };

  return (
    <div className="cart">
      <h1>PANIER</h1>
      <ul>
        {cart.map((item) => {
          return (
            <CartItem
              article={getArticle(item.product)}
              quantity={item.quantity}
            />
          );
        })}
      </ul>
      <div className="cart-footer">
        <div className="instructions">
          <label>INSTRUCTIONS SPÉCIALES POUR LA COMMANDE</label>
          <textarea
            type="text"
            name="instructions"
            id="instructions"
            onChange={(e) => setInstructions(e.target.value)}
            value={instructions}
          />
        </div>
        <div className="payement">
          <h1>{!isEmpty(cartCookie) && (getTotalPrice() + "€")}</h1>
          <h5>
            Taxes incluses et frais de port calculés à l'étape de paiement
          </h5>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label>
              EN COCHANT CETTE CASE, VOUS ACCEPTEZ L'INTÉGRALITÉ DE NOS{" "}
              <span className="link">CONDITIONS GÉNÉRALES DE VENTE</span>
            </label>
          </div>
          <button>PAYER MAINTENANT</button>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
