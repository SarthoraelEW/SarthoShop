import React from "react";
import { Slide } from "react-slideshow-image";
import bannery1 from "./images/bannery1.jpg";
import bannery2 from "./images/bannery2.jpg";
import bannery3 from "./images/bannery3.jpg";
import bannery4 from "./images/bannery4.jpg";

const images = [bannery1, bannery2, bannery3, bannery4]; 

const properties = {
  duration: 10000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};

const HomeBannery = () => {
  return (
    <div className="home-bannery">
      <Slide {...properties}>
        {images.map((each, index) => (
          <img key={index} src={each} alt={"bannery " + index} />
        ))}
      </Slide>
    </div>
  );
};

export default HomeBannery;
