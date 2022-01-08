import React from "react";
import { useParams } from "react-router-dom";
import CartResume from "../components/Checkout/CartResume";
import ClientInformations from "../components/Checkout/ClientInformations";
import CommandChecking from "../components/Checkout/CommandChecking";
import PayementForm from "../components/Checkout/PayementForm";
import ShippingForm from "../components/Checkout/ShippingForm";
import NotFound from "./NotFound";
import CheckoutNav from "../components/Checkout/CheckoutNav";

const Checkout = () => {
  let params = useParams();

  let formSection = params.formSection;

  const getFormSection = () => {
    switch (formSection) {
      case "contact-informations":
        return <ClientInformations />;

      case "shipping":
        return <ShippingForm />;

      case "payement":
        return <PayementForm />;

      case "review":
        return <CommandChecking />;

      default:
        return <NotFound />;
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout">
        <div className="form">
          <h1>Boutique Ponce</h1>
          <CheckoutNav section={formSection} />
          {getFormSection()}
          <h6 className="checkout-footer">Tous droits réservés Boutique Ponce</h6>
        </div>
        <div className="cart-resume-container">
          <CartResume />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
