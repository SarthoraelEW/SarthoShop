import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UidContext } from "./AppContext";
import HiddenMenu from "./HiddenMenu";

const Nav = ({ page }) => {
  let navigate = useNavigate();
  const uid = useContext(UidContext);

  const [showingHiddenMenu, setShowingHiddenMenu] = useState(false);

  const displayHiddenMenu = () => {
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
          src="./logo.jpg"
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
            className={page === "PRODUCTS" ? "active" : ""}
            onClick={() => {displayHiddenMenu()}}
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
          <li>PONCE.TV</li>
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
          {uid && (
            <span
              className="material-icons-outlined"
              onClick={() => {
                navigate("/client-edit");
              }}
            >
              account_circle
            </span>
          )}
        </div>
      </nav>
      <div id="hidden-menu-container" className="hidden-menu-container hidden">
        <HiddenMenu />
      </div>
    </>
  );
};

export default Nav;
