import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  pizzas: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, { payload }) {
      const findPizza = state.pizzas.find((obj) => obj.id === payload.id);
      if (findPizza) {
        findPizza.count++;
      } else {
        state.pizzas.push({
          ...payload,
          count: 1,
        });
      }
      state.totalPrice = state.pizzas.reduce(
        (total, obj) => total + obj.price * obj.count,
        0
      );
    },
    removePizza(state, { payload }) {
      state.pizzas = state.pizzas.filter((obj) => obj.id !== payload.id);
      state.totalPrice = state.pizzas.reduce(
        (total, obj) => total + obj.price * obj.count,
        0
      );
    },
    clearPizzas(state) {
      state.pizzas = [];
      state.totalPrice = 0;
    },
    decrPizzas(state, { payload }) {
      const findPizza = state.pizzas.find((obj) => obj.id === payload.id);

      if (findPizza) {
        if (findPizza.count === 1) {
          state.pizzas = state.pizzas.filter((obj) => obj.id !== payload.id);
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

export const { addPizza, removePizza, clearPizzas, decrPizzas } =
  cartSlice.actions;

export default cartSlice.reducer;
