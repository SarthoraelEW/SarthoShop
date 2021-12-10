exports.signUpErrors = (err) => {
  let errors = { email: '', password: 'mauvais password'};

  if (err.message.includes('email'))
      errors.email = 'Email incorrect';

  if (err.message.includes('password'))
      errors.password = 'Le mot de passe doit faire 6 caractères minimum';

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
      errors.email = 'Cet email est déjà enregistré';
      
  return errors;
}

exports.signInErrors = (err) => {
  let errors = { email: '', password:  ''}

  if (err.message.includes("email"))
      errors.email = "Email inconnu";

  if (err.message.includes('password'))
      errors.password = "Le mot de passe ne correspond pas";

  return errors;
}

exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: ""};

  if (err.message.includes('invalide file'))
      errors.format = "Format incompatible";

  if (err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse 500ko";

  return errors;
}