import React from "react";
import { useNavigate } from "react-router-dom";
import img from "./images/bannery1.jpg";

const NewCollection = () => {
  let navigate = useNavigate();

  const navigateToCollection = () => {
    navigate('/collections/noel');
  };

  return (
    <div className="new-collection-container">
      <div className="new-collection">
        <img src={img} alt="new collection bannery" />
        <div className="big-button" onClick={navigateToCollection}>
          <h1>C'EST NOEL!</h1>
        </div>
        <div className="small-button" onClick={navigateToCollection}>
          <h3>Découvrez notre nouvelle collection !</h3>
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
