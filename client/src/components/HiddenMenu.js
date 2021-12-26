import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router-dom";

const textile = [
  "Tee-shirts",
  "Hoodies",
  "Bagagerie",
  "Bobs",
  "Bonnets",
  "Chaussettes",
];
const goodies = ["Mugs", "Jeux de cartes"];

const HiddenMenu = () => {
  let navigate = useNavigate();

  const articlesReducer = useSelector((state) => state.articlesReducer);
  const articles = articlesReducer;

  const [subMenu, setSubMenu] = useState([]);
  const [showingTextile, setShowingTextile] = useState(false);
  const [showingGoodies, setShowingGoodies] = useState(false);

  const showTextileSubMenu = () => {
    let subMenu = document.getElementById("hidden-sub-menu");
    if (showingTextile) {
      subMenu.classList.add("hidden");
      setShowingTextile(false);
    } else {
      subMenu.classList.remove("hidden");
      setShowingTextile(true);
      setShowingGoodies(false);
      setSubMenu(textile);
    }
  };

  const showGoodiesSubMenu = () => {
    let subMenu = document.getElementById("hidden-sub-menu");
    if (showingGoodies) {
      subMenu.classList.add("hidden");
      setShowingGoodies(false);
    } else {
      subMenu.classList.remove("hidden");
      setShowingGoodies(true);
      setShowingTextile(false);
      setSubMenu(goodies);
    }
  };

  const navigateToCollections = (category) => {
    switch (category) {
      case "Tee-shirts":
        navigate("/collections/Textile/Tee-Shirts");
        break;

      case "Hoodies":
        navigate("/collections/Textile/Hoodies");
        break;

      case "Bagagerie":
        navigate("/collections/Textile/Bagagerie");
        break;

      case "Bobs":
        navigate("/collections/Textile/Bobs");
        break;

      case "Bonnets":
        navigate("/collections/Textile/Bonnets");
        break;

      case "Chaussettes":
        navigate("/collections/Textile/Chaussettes");
        break;

      case "Mugs":
        navigate("/collections/Goodies/Mugs");
        break;

      case "Jeux de cartes":
        navigate("/collections/Goodies/Jeux-de-cartes");
        break;

      default:
        return null;
    }
  };

  return (
    <div className="hidden-menu">
      <ul className="side-menu">
        <h2>TOUS LES PRODUITS</h2>
        <li onClick={() => navigate("/collections/all")}>Tout</li>
        <li onClick={showTextileSubMenu}>
          Textile <span className="material-icons-outlined">chevron_right</span>
        </li>
        <li onClick={showGoodiesSubMenu}>
          Goodies <span className="material-icons-outlined">chevron_right</span>
        </li>
      </ul>
      <ul className="recent-articles">
        {!isEmpty(articles) &&
          articles.slice(0, 4).map((article) => {
            return <ArticleCard article={article} key={article._id} />;
          })}
        <ul id="hidden-sub-menu" className="hidden-sub-menu hidden">
          {!isEmpty(subMenu) &&
            subMenu.map((category) => {
              return (
                <li onClick={() => navigateToCollections(category)}>
                  {category}
                </li>
              );
            })}
        </ul>
      </ul>
    </div>
  );
};

export default HiddenMenu;
