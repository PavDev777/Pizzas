import { totalPricePizzas } from "./totalPricePizzas";
import { CartItem } from "../redux/slices/cart /types";

export const getCartPizzasFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  const pizzas = data ? JSON.parse(data) : [];
  return {
    pizzas: pizzas as CartItem[],
    totalPrice: totalPricePizzas(pizzas),
  };
};
