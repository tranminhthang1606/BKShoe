import React from "react";

import { BrowserRouter, Route,Routes } from "react-router-dom";

import Header from "./components/Header";
import { useEffect } from "react";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import BlogDetails from "./pages/BlogDetails";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/catalog/:slug" element={<Product />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/blog/:post" element={<BlogDetails/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
