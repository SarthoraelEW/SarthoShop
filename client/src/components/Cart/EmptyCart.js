import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
  let navigate = useNavigate();

  return (
    <div className='empty-cart'>
      <h1>PANIER</h1>
      <h4>Votre panier est vide.</h4>
      <button onClick={() => navigate('/')}>RETOURNER VERS LA BOUTIQUE</button>
    </div>
  );
};

export default EmptyCart;