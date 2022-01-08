import React from 'react';
import { useCookies } from 'react-cookie';
import { isEmpty } from '../Utils';
import CartResumeItem from './CartResumeItem';

const CartResume = () => {

  const [cookie, setCookie] = useCookies(["cart"]);
  const cart = cookie.cart;

  const getTotalArticlesPrice = () => {

  };

  const getTotalPrice = () => {

  };

  const getShippingPrice = () => {

  };
 
  return (
    <div className='cart-resume'>
      <ul>
        {isEmpty(cart) && cart.map((article, index) => {
          return (<CartResumeItem article={article} key={index} />);
        })}
      </ul>
      <div className='price-detail'>
        <div className='articles-price'>
          <h5>Sous-total</h5>
          <h5>{getTotalArticlesPrice()}</h5>
        </div>
        <div className='shipping'>
          <h5>Livraison</h5>
          <h5>{getShippingPrice()}</h5>
        </div>
      </div>
      <div className='price-resume'>
        <h4>Total</h4>
        <h3>{getTotalPrice()}</h3>
      </div>
    </div>
  );
};

export default CartResume;