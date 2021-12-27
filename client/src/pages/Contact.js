import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import SAVForm from '../components/SAVForm';

const Contact = () => {
  return (
    <div className='contact-page'>
      <Nav page="CONTACT" />
      <SAVForm />
      <Footer />
    </div>
  );
};

export default Contact;