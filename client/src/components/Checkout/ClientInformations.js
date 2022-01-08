import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../Utils";

const ClientInformations = () => {
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies(["command"]);

  const [email, setEmail] = useState("");
  const [shippingOption, setShippingOption] = useState("send");
  const [country, setCountry] = useState("France");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const checkError = () => {
    const errorDiv = document.getElementsByClassName("error")[0];
    if (isEmpty(email)) {
      errorDiv.innerHTML = "Entrez une adresse e-mail valide";
      document.getElementById("email").focus();
      return false;
    }
    if (isEmpty(firstname)) {
      errorDiv.innerHTML = "Entrez un prénom";
      document.getElementById("firstname").focus();
      return false;
    }
    if (isEmpty(lastname)) {
      errorDiv.innerHTML = "Entrez un nom";
      document.getElementById("lastname").focus();
      return false;
    }
    if (isEmpty(address)) {
      errorDiv.innerHTML = "Entrez une adresse";
      document.getElementById("address").focus();
      return false;
    }
    if (isEmpty(zip)) {
      errorDiv.innerHTML = "Entrez un code postal";
      document.getElementById("zip").focus();
      return false;
    }
    if (isEmpty(city)) {
      errorDiv.innerHTML = "Entrez une ville";
      document.getElementById("city").focus();
      return false;
    }
    if (isEmpty(phone)) {
      errorDiv.innerHTML = "Entrez un numéro de téléphone valide";
      document.getElementById("phone").focus();
      return false;
    }
    return true;
  };

  const checkInfos = () => {
    if (checkError()) {
      const clientInformations = {
        email: email,
        shippingOption: shippingOption,
        country: country,
        firstname: firstname,
        lastname: lastname,
        address: address,
        zip: zip,
        city: city,
        phone: phone,
      };
      if (saveInfo) {
        setCookies("client", clientInformations, { path: "/" });
      }
      let command = cookies.command;
      command.isClientInfoCompleted = true;
      command.clientInformations = clientInformations;
      setCookies("command", command, { path: "/" });
      navigate("/checkout/shipping");
    }
  };

  return (
    <div className="client-informations">
      <h2>Coordonnées</h2>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h2>Mode de livraison</h2>
      <div className="radio-input-container">
        <div className="radio-input" onClick={() => setShippingOption("send")}>
          <input
            type="radio"
            name="shipping_method"
            value="send"
            checked={shippingOption === "send"}
          />
          <label>Expédier</label>
        </div>
        <div
          className="radio-input-last"
          onClick={() => setShippingOption("collect")}
        >
          <input
            type="radio"
            name="shipping_method"
            value="collect"
            checked={shippingOption === "collect"}
          />
          <label>Récupérer</label>
        </div>
      </div>
      <h2>Adresse d'expédition</h2>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option>France</option>
        <option>Belgique</option>
        <option>Suisse</option>
      </select>
      <div className="fullname">
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Adresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="city-info">
        <input
          type="text"
          id="zip"
          name="zip"
          placeholder="Code postal"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <input
        type="text"
        id="phone"
        name="phone"
        placeholder="Téléphone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <input
        type="checkbox"
        id="checkbox"
        name="checkbox"
        checked={saveInfo}
        onChange={(e) => setSaveInfo(!saveInfo)}
      />
      <label>Sauvegarder mes coordonnées pour la prochainer fois</label>
      <div className="error"></div>
      <div className="buttons">
        <button onClick={checkInfos}>Continuer vers l'expédition</button>
        <h5 className="link-ci" onClick={() => navigate("/cart")}>
          Retour au panier
        </h5>
      </div>
    </div>
  );
};

export default ClientInformations;
