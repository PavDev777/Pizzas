import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import "./scss/app.scss";
import { LayoutMain } from "./layouts/LayoutMain";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
