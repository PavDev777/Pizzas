import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
