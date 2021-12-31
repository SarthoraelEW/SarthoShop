import React from "react";

const CarouselItem = (props) => {
  const { img, positionInCarousel, carouselPosition, handleClick, isSelected } =
    props;

  console.log(isSelected);
  const positionIndex = positionInCarousel - carouselPosition;

  return (
    <img
      id={"carousel-img" + positionInCarousel}
      style={{
        top: `${120 * positionIndex}px`,
      }}
      className={isSelected ? "selected" : ""}
      onClick={() => handleClick(positionInCarousel)}
      src={`${process.env.REACT_APP_PUBLIC_URL}` + img}
      alt="article"
    />
  );
};

export default CarouselItem;
