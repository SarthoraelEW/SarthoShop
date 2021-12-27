import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "../../pages/Cart";
import Collections from "../../pages/Collections";
import Contact from "../../pages/Contact";
import Home from "../../pages/Home";
import Product from "../../pages/Product";

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/*" element={<Collections />} />
        <Route path="/product/:productName" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default Index;
