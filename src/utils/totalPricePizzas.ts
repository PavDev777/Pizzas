import { CartItem } from "../redux/slices/cart /types";

export const totalPricePizzas = (pizzas: CartItem[]) => {
  return pizzas.reduce((total, obj) => total + obj.price * obj.count, 0);
};
