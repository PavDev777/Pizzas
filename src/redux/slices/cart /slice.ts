import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartPizzasFromLocalStorage } from "../../../utils/getCartPizzasFromLocalStorage";
import { totalPricePizzas } from "../../../utils/totalPricePizzas";
import { CartItem, CartSliceState } from "./types";

const { pizzas, totalPrice } = getCartPizzasFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice,
  pizzas,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<CartItem>) {
      const findPizza = state.pizzas.find(
        (obj) => obj.id === action.payload.id
      );
      if (findPizza) {
        findPizza.count++;
      } else {
        state.pizzas.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = totalPricePizzas(state.pizzas);
    },
    removePizza(state, action: PayloadAction<string>) {
      state.pizzas = state.pizzas.filter((obj) => obj.id !== action.payload);
      state.totalPrice = totalPricePizzas(state.pizzas);
    },
    clearPizzas(state) {
      state.pizzas = [];
      state.totalPrice = 0;
    },
    decrPizzas(state, action: PayloadAction<string>) {
      const findPizza = state.pizzas.find((obj) => obj.id === action.payload);

      if (findPizza) {
        if (findPizza.count <= 1) {
          state.pizzas = state.pizzas.filter(
            (obj) => obj.id !== action.payload
          );
          state.totalPrice = totalPricePizzas(state.pizzas);
        } else {
          findPizza.count--;
          state.totalPrice = totalPricePizzas(state.pizzas);
        }
      }
    },
  },
});

export const { addPizza, removePizza, clearPizzas, decrPizzas } =
  cartSlice.actions;

export default cartSlice.reducer;
