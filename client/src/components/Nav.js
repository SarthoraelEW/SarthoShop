import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import HiddenMenu from "./HiddenMenu";
import Badge from "@mui/material/Badge";
import { isEmpty } from "./Utils";

const Nav = ({ page }) => {
  let navigate = useNavigate();

  const [showingHiddenMenu, setShowingHiddenMenu] = useState(false);
  const [cartCookie, setCartCookie] = useCookies(["cart"]);


  const displayHiddenMenu = () => {
    var hiddenMenuContainer = document.getElementById("hidden-menu-container");
    if (showingHiddenMenu) {
      setShowingHiddenMenu(false);
      hiddenMenuContainer.classList.add("hidden");
    } else {
      setShowingHiddenMenu(true);
      hiddenMenuContainer.classList.remove("hidden");
    }
  };

  window.addEventListener("click", (e) => {
    if (
      showingHiddenMenu &&
      !document.getElementById("hidden-menu-container").contains(e.target) &&
      !document.getElementsByClassName("navbar")[0].contains(e.target)
    )
      displayHiddenMenu();
  });

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
          <Badge
            badgeContent=""
            color="secondary"
            variant="dot"
            invisible={isEmpty(cartCookie)}
          >
            <span
              className="material-icons-outlined"
              onClick={() => {
                navigate("/cart");
              }}
            >
              shopping_cart
            </span>
          </Badge>
        </div>
      </nav>
      <div id="hidden-menu-container" className="hidden-menu-container hidden">
        <HiddenMenu onChange={displayHiddenMenu} />
      </div>
    </>
  );
};

export default Nav;
