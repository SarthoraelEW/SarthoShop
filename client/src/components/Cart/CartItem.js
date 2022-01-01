import React from 'react';
import QuantityButton from '../Product/QuantityButton';

const CartItem = ({article, quantity}) => {
  return (
    <div className='cart-item'>
      <img src={`${process.env.REACT_APP_PUBLIC_URL}` + article.photos[0]} alt="article" />
      <div>
        <h2 className='article-name'>{article.name}</h2>
        <h4>Supprimer</h4>
      </div>
      <QuantityButton preQuantity={quantity} />
      <h2 className='article-price'>{article.price}</h2>
    </div>
  );
};

export default CartItem;