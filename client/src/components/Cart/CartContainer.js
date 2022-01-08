import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

const CartContainer = () => {
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["cart", "command"]);

  const [instructions, setInstructions] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const articlesReducer = useSelector((state) => state.articlesReducer);

  const cart = isEmpty(cookie) ? null : cookie.cart;
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
      const article = getArticle(cart[i].product);
      const articlePrice = article.price;
      const floatPrice = parseFloat(
        articlePrice.substring(0, articlePrice.length - 1).replace(",", ".")
      );
      totalPrice += floatPrice * cart[i].quantity;
    }
    return totalPrice.toFixed(2);
  };

  const checkPaiement = () => {
    if (!isChecked) {
      window.alert(
        "Vous devez lire et accepter nos conditions générales pour continuer."
      );
    } else {
      let command = {
        instructions: instructions,
        isClientInfoCompleted: false,
        clientInformations: null,
        shipping: null,
        isShippingCompleted: false,
        payement: null,
        isPayementCompleted: false
      };
      setCookie("command", command, { path: "/" });
      navigate("/checkout/contact-informations");
    }
  };

  return (
    <div className="cart">
      <h1>PANIER</h1>
      {!isEmpty(cookie) && !isEmpty(articles) && (
        <ul>
          {cart.map((item, index) => {
            if (index === cart.length - 1) {
              return (
                <li className="last">
                  <CartItem
                    article={getArticle(item.product)}
                    quantity={item.quantity}
                    size={item.size}
                  />
                </li>
              );
            }
            return (
              <li>
                <CartItem
                  article={getArticle(item.product)}
                  quantity={item.quantity}
                  size={item.size}
                />
              </li>
            );
          })}
        </ul>
      )}
      {!isEmpty(cookie) && !isEmpty(articles) && (
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
            <h2>{!isEmpty(cart) && getTotalPrice() + "€"}</h2>
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
            <button onClick={checkPaiement}>PAYER MAINTENANT</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
