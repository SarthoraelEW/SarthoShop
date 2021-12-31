import React, { useState } from "react";

const ExposedImage = ({ img }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const changeDisplayFullscreenImg = () => {
    var fullscreenImg = document.getElementById("fullscreen-img-container");
    console.log(fullscreenImg);
    if (isFullscreen) {
      setIsFullscreen(false);
      fullscreenImg.classList.add("hidden");
    } else {
      setIsFullscreen(true);
      fullscreenImg.classList.remove("hidden");
    }
  };

  window.addEventListener("click", (e) => {
    if (
      isFullscreen &&
      document.getElementById("fullscreen-img-contain").contains(e.target) &&
      !document.getElementById("fullscreen-img").contains(e.target)
    )
      changeDisplayFullscreenImg();
  });

  return (
    <>
      <div className="exposed-img">
        <img src={`${process.env.REACT_APP_PUBLIC_URL}` + img}  onClick={changeDisplayFullscreenImg} alt="product" />
      </div>
      <div id="fullscreen-img-container" className="fullscreen-img hidden">
        <span
          className="material-icons-outlined"
          onClick={changeDisplayFullscreenImg}
        >
          close
        </span>
        <img
          id="fullscreen-img"
          src={`${process.env.REACT_APP_PUBLIC_URL}` + img}
          alt="product"
        />
      </div>
    </>
  );
};

export default ExposedImage;
