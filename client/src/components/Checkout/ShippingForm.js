import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../Utils";

const ShippingForm = () => {
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies(["command"]);
  const command = cookies.command;

  const [shippingOption, setShippingOption] = useState("relais");

  const getAddress = () => {
    const clientInformations = command.clientInformations;
    let address =
      clientInformations.address +
      ", " +
      clientInformations.zip +
      " " +
      clientInformations.city +
      ", " +
      clientInformations.country;
    return address;
  };

  const goToPayement = () => {
    let command = cookies.command;
    command.isShippingCompleted = true;
    command.shipping = shippingOption;
    setCookies("command", command, { path: "/" });
    navigate('/checkout/payement');
  };

  return (
    <div className="shipping-form">
      <div className="command-resume">
        <div className="resume-card">
          <label>Contact</label>
          <h5>
            {!isEmpty(command.clientInformations) &&
              command.clientInformations.email}
          </h5>
          <h6 className="link-shipping">Modifier</h6>
        </div>
        <div className="resume-card-last">
          <label>Expédier à</label>
          <h5>{!isEmpty(command.clientInformations) && getAddress()}</h5>
          <h6 className="link-shipping">Modifier</h6>
        </div>
      </div>
      <h2>Mode d'expédition</h2>
      <div className="shipping-options-container">
        <div className="shipping-option" onClick={() => setShippingOption("relais")}>
          <input type="radio" name="shipping_option" value="relais" checked={shippingOption === "relais"} />
          <label>Livraison en Point Relais Collissimo (sélection du Point Relais après paiement)</label>
          <h5>7,50€</h5>
        </div>
        <div className="shipping-option-last" onClick={() => setShippingOption("domicile")}>
          <input type="radio" name="shipping_option" value="domicile" checked={shippingOption === "domicile"} />
          <label>Colissimo Domicile sans signature</label>
          <h5>8,50€</h5>
        </div>
      </div>
      <div className="buttons">
        <button onClick={goToPayement}>Continuer vers le paiement</button>
        <h5 className="link-ci">Revenir aux informations</h5>
      </div>
    </div>
  );
};

export default ShippingForm;
