import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  pizzas: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  pizzas: [],
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
      state.totalPrice = state.pizzas.reduce(
        (total, obj) => total + obj.price * obj.count,
        0
      );
    },
    removePizza(state, action: PayloadAction<string>) {
      state.pizzas = state.pizzas.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.pizzas.reduce(
        (total, obj) => total + obj.price * obj.count,
        0
      );
    },
    clearPizzas(state) {
      state.pizzas = [];
      state.totalPrice = 0;
    },
    decrPizzas(state, action: PayloadAction<string>) {
      const findPizza = state.pizzas.find((obj) => obj.id === action.payload);

      if (findPizza) {
        if (findPizza.count === 1) {
          state.pizzas = state.pizzas.filter(
            (obj) => obj.id !== action.payload
          );
          state.totalPrice = state.pizzas.reduce(
            (total, obj) => total + obj.price * obj.count,
            0
          );
        } else {
          findPizza.count--;
          state.totalPrice = state.pizzas.reduce(
            (total, obj) => total + obj.price * obj.count,
            0
          );
        }
      }
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const cartPizzasCount = (id: string) => (state: RootState) =>
  state.cart.pizzas.find((obj) => obj.id === id);

export const { addPizza, removePizza, clearPizzas, decrPizzas } =
  cartSlice.actions;

export default cartSlice.reducer;
