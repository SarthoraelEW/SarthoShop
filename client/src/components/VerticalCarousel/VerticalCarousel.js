import React, { useState } from "react";
import CarouselItem from "./CarouselItem";

const VerticalCarousel = (props) => {
  const [index, setIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState(0);

  const maxIndex = props.images.length - 3;

  const moveSlide = (i) => {
    if (index + i > maxIndex) {
      setIndex(maxIndex);
    } else if (index + i < 0) {
      setIndex(0);
    }
  };

  const getMovement = (direction) => {
    if (direction === 1) {
      return 3;
    } else {
      return -3;
    }
  };

  const selectedImgListener = (i) => {
    setSelectedImg(i);
    props.handleImageSelection(i);
  };

  return (
    <div className="vertical-carousel">
      <div className={index === 0 ? "masked-arrow" : "arrow"}>
        <span
          className={"material-icons-outlined"}
          onClick={() => moveSlide(getMovement(-1))}
        >
          expand_less
        </span>
      </div>
      <ul>
        {props.images.map((img, i) => {
          return (
            <CarouselItem
              img={img}
              key={i}
              positionInCarousel={i}
              carouselPosition={index}
              handleClick={selectedImgListener}
              isSelected={i === selectedImg}
            />
          );
        })}
      </ul>
      <div className={index === maxIndex ? "masked-arrow" : "arrow"}>
        <span
          className="material-icons-outlined"
          onClick={() => moveSlide(getMovement(1))}
        >
          expand_more
        </span>
      </div>
    </div>
  );
};

export default VerticalCarousel;
