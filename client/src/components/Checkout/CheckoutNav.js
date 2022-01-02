import React from "react";
import { useNavigate } from "react-router-dom";

const CheckoutNav = ({ section }) => {
  let navigate = useNavigate();

  return (
    <div className="checkout-nav">
      <h5 className="link" onClick={() => navigate("/cart")}>
        Panier
      </h5>
      <span className="material-icons-outlined">arrow_forward_ios</span>
      <h5
        className={section !== "contact-informations" ? "link" : ""}
        onClick={() => {
          if (section !== "contact-informations")
            navigate("/checkout/contact-informations");
        }}
      >
        Informations
      </h5>
      <span className="material-icons-outlined">arrow_forward_ios</span>
      <h5
        className={section !== "shipping" ? "link" : ""}
        onClick={() => {
          if (section !== "shipping") navigate("/checkout/shipping");
        }}
      >
        Livraison
      </h5>
      <span className="material-icons-outlined">arrow_forward_ios</span>
      <h5
        className={section !== "payement" ? "link" : ""}
        onClick={() => {
          if (section !== "payement") navigate("/checkout/payement");
        }}
      >
        Paiement
      </h5>
      <span className="material-icons-outlined">arrow_forward_ios</span>
      <h5>Avis</h5>
    </div>
  );
};

export default CheckoutNav;
