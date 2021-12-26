import React from 'react';

const ArticleCard = ({article}) => {
  return (
    <div className='article-card'>
      <img src={`${process.env.REACT_APP_PUBLIC_URL}` + article.photos[0]} alt="article" />
      <h4>{article.name}</h4>
      <h6>{article.price}</h6>
    </div>
  );
};

export default ArticleCard;