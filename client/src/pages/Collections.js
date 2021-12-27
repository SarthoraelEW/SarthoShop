import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";
import ArticleCard from "../components/ArticleCard";

const Collections = () => {
  let location = useLocation().pathname;
  let states = location.split("/");
  states = states.splice(2, states.length);

  const articlesReducer = useSelector((state) => state.articlesReducer);

  const getArticlesFromStates = () => {
    let articlesToShow = [];
    if (states[0] === "all") {
      articlesToShow = articlesReducer;
    } else {
      articlesReducer.forEach((article) => {
        let toShow = true;
        for (let i = 0; i < states.length; i++) {
          if (!article.types.includes(states[i])) {
            toShow = false;
            break;
          }
        }
        if (toShow) {
          articlesToShow.push(article);
        }
      });
    }
    return articlesToShow;
  };

  const articles = getArticlesFromStates();

  let collectionsName = states.join(" - ");
  if (collectionsName === "all")
    collectionsName = "TOUS LES PRODUITS";

  return (
    <div className="collections-page">
      <Nav page="COLLECTIONS" />
      <div className="collections-container">
        <div className="collections">
          <h1>{collectionsName}</h1>
          <ul>
            {!isEmpty(articles) &&
              articles.map((article) => {
                return (
                  <div className="card-container">
                    <ArticleCard article={article} key={article._id} />
                  </div>
                );
              })}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collections;
