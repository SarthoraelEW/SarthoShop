import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../Utils";

const PayementForm = () => {
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies(["command"]);
  let command = cookies.command;

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCvc, setCardCvc] = useState("");

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

  const checkError = () => {
    return true;
  };

  const goToCommandResume = () => {
    if (checkError()) {
      const payement = {
        cardNumber: cardNumber,
        cardName: cardName,
        cardExpiration: cardExpiration,
        cardCvc: cardCvc,
      };
      command.payement = payement;
      command.isPayementCompleted = true;
      setCookies("command", command, { path: "/" });
      navigate("/checkout/command-checking");
    }
  };

  return (
    <div className="payement-form">
      <div className="command-resume">
        <div className="resume-card">
          <label>Contact</label>
          <h5>
            {!isEmpty(command.clientInformations) &&
              command.clientInformations.email}
          </h5>
          <h6
            className="link-shipping"
            onClick={() => navigate("/checkout/contact-informations")}
          >
            Modifier
          </h6>
        </div>
        <div className="resume-card">
          <label>Expédier à</label>
          <h5>{!isEmpty(command.clientInformations) && getAddress()}</h5>
          <h6
            className="link-shipping"
            onClick={() => navigate("/checkout/contact-informations")}
          >
            Modifier
          </h6>
        </div>
        <div className="resume-card-last">
          <label>Méthode</label>
          <h5>{command.shipping}</h5>
          <h6
            className="link-shipping"
            onClick={() => navigate("/checkout/shipping")}
          >
            Modifier
          </h6>
        </div>
      </div>
      <h2>Paiement</h2>
      <h5>Toutes les transactions sont sécurisées et chiffrées.</h5>
      <div className="card-form">
        <div className="card-form-header">
          <h3>Carte de crédit</h3>
        </div>
        <div className="card-detail">
          <input
            type="text"
            id="card-number"
            name="card-number"
            placeholder="Numéro de carte"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            id="card-name"
            name="card-name"
            placeholder="Nom sur la carte"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <div className="date-cvc">
            <input
              type="text"
              id="card-expiration"
              name="card-expiration"
              placeholder="Date d'expiration (MM/AA)"
              value={cardExpiration}
              onChange={(e) => setCardExpiration(e.target.value)}
            />
            <input
              type="text"
              id="card-cvc"
              name="card-cvc"
              placeholder="Code de sécurité"
              value={cardCvc}
              onChange={(e) => setCardCvc(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="error"></div>
      <div className="buttons">
        <button onClick={goToCommandResume}>Vérifier la commande</button>
        <h5 className="link-ci" onClick={() => navigate("/checkout/shipping")}>
          Revenir à l'expédition
        </h5>
      </div>
      <h6>Vous ne serez pas encore facturé(e)</h6>
    </div>
  );
};

export default PayementForm;
