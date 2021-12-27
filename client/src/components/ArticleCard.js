import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({article}) => {
  let navigate = useNavigate();

  return (
    <div className='article-card' onClick={() => navigate('/product/' + article.name)}>
      <img src={`${process.env.REACT_APP_PUBLIC_URL}` + article.photos[0]} alt="article" />
      <h4>{article.name}</h4>
      <h6>{article.price}</h6>
    </div>
  );
};

export default ArticleCard;