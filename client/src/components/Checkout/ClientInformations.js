import React from 'react';

const ClientInformations = () => {
  return (
    <div className='client-informations'>
      <h2>Coordonnées</h2>
      <input type="text" id="email" name="email" placeholder="Adresse e-mail" />
      <h2>Adresse d'expédition</h2>
      <select>
        <option>France</option>
        <option>Belgique</option>
        <option>Suisse</option>
      </select>
      <div className='fullname'>
        <input type="text" id="firstname" name="firstname" placeholder='Prénom' />
        <input type="text" id="lastname" name="lastname" placeholder='Nom' />
      </div>
      <input type="text" id="address" name="address" placeholder='Adresse' />
      <input type="text" id="zip" name="zip" placeholder='Code postal' />
      <input type="text" id="city" name="city" placeholder='Ville' />
      <input type="text" id="phone" name="phone" placeholder='Téléphone' />
      <input type="checkbox" id="checkbox" name="checkbox" />
      <label>Sauvegarder mes coordonnées pour la prochainer fois</label>
      <div className='buttons'>
        <button>Continuer vers l'expédition</button>
        <h3 className='link'>Retour au panier</h3>
      </div>
    </div>
  );
};

export default ClientInformations;