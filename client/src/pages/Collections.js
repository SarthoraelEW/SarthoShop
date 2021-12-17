import React from 'react';
import { useLocation } from 'react-router-dom';

const Collections = () => {

  let location = useLocation().pathname;
  let states = location.split('/');
  states = states.splice(2, states.length);

  return (
    <div>
      {"Collections: " + states.toString()}
    </div>
  );
};

export default Collections;