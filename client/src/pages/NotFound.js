import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const NotFound = () => {
  let navigate = useNavigate();

  return (
    <div className='not-found-page'>
      <Nav />
      <div className='not-found'>
        <h1>PAGE NON TROUVÉE</h1>
        <h4>Cette page n'est pas disponible.</h4>
        <button onClick={() => navigate('/')}>RETOURNER VERS LA BOUTIQUE</button>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;