import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { isEmpty } from "./Utils";
import { sendSAVRequest } from "../actions/SAVRequests.action";

const SAVForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isRobot, setIsRobot] = useState(true);
  const [errorInfo, setErrorInfo] = useState("");

  const handleSubmit = () => {
    let error = "";
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageTextArea = document.getElementById("message");

    if (isRobot) {
      error = "Please provide valid captcha response";
    }
    if (isEmpty(name)) {
      if (isEmpty(error)) error = "Please enter your name";
      nameInput.classList.add("error-input");
    } else {
      nameInput.classList.remove("error-input");
    }
    if (isEmpty(email)) {
      if (isEmpty(error)) error = "Please enter your email";
      emailInput.classList.add("error-input");
    } else {
      emailInput.classList.remove("error-input");
    }
    if (isEmpty(message)) {
      if (isEmpty(error)) error = "Please enter your message request";
      messageTextArea.classList.add("error-input");
    } else {
      messageTextArea.classList.remove("error-input");
    }
    if (isEmpty(error)) {
      setErrorInfo("");
      dispatch(sendSAVRequest(name, email, phone, message));
    } else {
      setErrorInfo(error);
    }
  };

  const onCaptchaChange = (value) => {
    if (!isEmpty(value)) {
      setIsRobot(false);
    } else {
      setIsRobot(true);
    }
  };

  return (
    <div className="savform-container">
      <div className="savform">
        <h1>CONTACT</h1>
        <div className="form-container">
          <p>
            Le support SAV est ouvert du lundi au vendredi et de 9h à 17h. Nos
            délais de réponses sont de deux jours ouvrés maximum.
          </p>
          <div className="form">
            <div id="savrequest-form">
              {!isEmpty(errorInfo) && (
                <div className="error-info">
                  <h4>{errorInfo}</h4>
                  <span className="material-icons" onClick={() => setErrorInfo("")}>close</span>
                </div>
              )}
              <div className="name-email">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nom*"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email*"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Téléphone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <textarea
                type="text"
                name="message"
                id="message"
                placeholder="Votre message...*"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                onChange={onCaptchaChange}
              />
              <button onClick={handleSubmit}>ENVOYER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAVForm;
