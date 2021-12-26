import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../ArticleCard';
import { isEmpty } from '../Utils';

const RecentProducts = () => {
  let navigate = useNavigate();

  const articlesReducer = useSelector((state) => state.articlesReducer);
  const articles = articlesReducer;

  return (
    <div className='home-recent-products'>
      <ul>
        <div className='all-products' onClick={() => navigate("/collections/all")}>
          <img className='all-products-img' src="./img/all-products.jpg" alt='all products button' />
          <div className='button'>
            <h1>TOUS LES</h1>
            <h1>PRODUITS</h1>
            <h4>TOUT AFFICHER</h4>
          </div>
          <div className='hover-transparent' />
        </div>
        {!isEmpty(articles) &&
          articles.slice(0, 4).map((article) => {
            return <ArticleCard article={article} key={article._id} />;
          })}
      </ul>
    </div>
  );
};

export default RecentProducts;