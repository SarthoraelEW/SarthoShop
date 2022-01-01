import React from 'react';
import { useCookies } from "react-cookie";
import CartContainer from '../components/Cart/CartContainer';
import EmptyCart from '../components/Cart/EmptyCart';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { isEmpty } from '../components/Utils';

const Cart = () => {
  const [cartCookie, setCartCookie] = useCookies(['cart']);

  return (
    <div className='cart-page'>
      <Nav page="" />
      <div className='cart-container'>
        {isEmpty(cartCookie.cart) ? <EmptyCart /> : <CartContainer />}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;