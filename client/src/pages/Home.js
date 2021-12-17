import React from 'react';
import Nav from '../components/Nav';
import HomeBannery from '../components/Home/HomeBannery';
import NewCollection from '../components/Home/NewCollection';
import RecentProducts from '../components/Home/RecentProducts';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div className='home-page'>
      <Nav />
      <HomeBannery />
      <NewCollection />
      <RecentProducts />
      <Footer />
    </div>
  );
};

export default Home;