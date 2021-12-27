import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HiddenMenu from "./HiddenMenu";

const Nav = ({ page }) => {
  let navigate = useNavigate();

  const [showingHiddenMenu, setShowingHiddenMenu] = useState(false);

  const displayHiddenMenu = () => {
    console.log("yo");
    var hiddenMenuContainer = document.getElementById("hidden-menu-container");
    console.log(hiddenMenuContainer);
    if (showingHiddenMenu) {
      setShowingHiddenMenu(false);
      hiddenMenuContainer.classList.add("hidden");
    } else {
      setShowingHiddenMenu(true);
      hiddenMenuContainer.classList.remove("hidden");
    }
  };

  return (
    <>
      <nav className="navbar">
        <img
          src={`${process.env.REACT_APP_PUBLIC_URL}./logo.jpg`}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <ul>
          <li
            className={page === "HOME" ? "active" : ""}
            onClick={() => {
              navigate("/");
            }}
          >
            ACCUEIL
          </li>
          <li
            className={page === "COLLECTIONS" ? "active" : ""}
            onClick={() => {
              displayHiddenMenu();
            }}
          >
            TOUS LES PRODUITS
            <span class="material-icons-outlined">expand_more</span>
          </li>
          <li
            className={page === "CONTACT" ? "active" : ""}
            onClick={() => {
              navigate("/contact");
            }}
          >
            CONTACT
          </li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.twitch.tv/ponce"
          >
            <li>PONCE.TV</li>
          </a>
        </ul>
        <div className="icons">
          <span
            className="material-icons-outlined"
            onClick={() => {
              navigate("/cart");
            }}
          >
            shopping_cart
          </span>
        </div>
      </nav>
      <div id="hidden-menu-container" className="hidden-menu-container hidden">
        <HiddenMenu onChange={displayHiddenMenu} />
      </div>
    </>
  );
};

export default Nav;
