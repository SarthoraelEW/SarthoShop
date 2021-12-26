import React from "react";
import Nav from "../components/Nav";
import HomeBannery from "../components/Home/HomeBannery";
import NewCollection from "../components/Home/NewCollection";
import RecentProducts from "../components/Home/RecentProducts";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home-page">
      <Nav page="HOME" />
      <HomeBannery />
      <div className="video-container">
        <div className="video-model">
          <video autoPlay="autoplay" loop="true" muted="true" width="100%">
            <source src="./trailer.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <NewCollection />
      <RecentProducts />
      <Footer />
    </div>
  );
};

export default Home;
