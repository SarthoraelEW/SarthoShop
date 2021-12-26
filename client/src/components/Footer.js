import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <ul className="socials">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/channel/UCKKY2Jcg_P9fhfHD3ICyMxg"
            >
              <i class="fa fa-youtube-play"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/poncefleur"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.twitch.tv/ponce"
            >
              <i class="fab fa-twitch"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/poncefleur_"
            >
              {" "}
              <i class="fab fa-instagram"></i>
            </a>
          </ul>
          <ul className="legals">
            <h3>INFORMATIONS</h3>
            <h5>Conditions Générales de Ventes</h5>
            <h5>Politique de confidentialité</h5>
            <h5>Mentions légales</h5>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <h6>
          © 2021, <span>Boutique Ponce.</span>
        </h6>
      </div>
    </>
  );
};

export default Footer;
