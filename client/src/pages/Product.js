import React from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProductContainer from '../components/Product/ProductContainer';
import ProductPageFooter from '../components/Product/ProductPageFooter';
import { useSelector } from 'react-redux';

const Product = () => {
  let params = useParams();

  const articlesReducer = useSelector((state) => state.articlesReducer);

  const article = articlesReducer.filter((article) => article.name === params.productName)[0];

  return (
    <div className='product-page'>
      <Nav />
      <ProductContainer article={article} />
      <ProductPageFooter />
      <Footer />
    </div>
  );
};

export default Product;