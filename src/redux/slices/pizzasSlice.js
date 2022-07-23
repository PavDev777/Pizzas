import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async ({ currentPage, categoryId, sort }) => {
    const { data } = await axios.get(
      `https://62b6fab56999cce2e80b0ed9.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sort.sort}&order=desc`
    );
    return data;
  }
);

const initialState = {
  items: [],
  steps: "loading",
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, { payload }) {
      state.items = payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.steps = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, { payload }) => {
      state.items = payload;
      state.steps = "fulfilled";
    },
    [fetchPizzas.rejected]: (state, { payload }) => {
      state.items = [];
      state.steps = "error";
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
