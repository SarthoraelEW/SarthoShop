import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "../../pages/Cart";
import Checkout from "../../pages/Checkout";
import Collections from "../../pages/Collections";
import Contact from "../../pages/Contact";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Product from "../../pages/Product";

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/collections/*" element={<Collections />} />
        <Route path="/product/:productName" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/:formSection" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default Index;
