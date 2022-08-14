import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";

import "./scss/app.scss";
import { LayoutMain } from "./layouts/LayoutMain";

const Cart = React.lazy(() => import("./pages/Cart"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
