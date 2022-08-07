import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Sorting } from "./filterSlice";

export type FetchPizzas = {
  currentPage: number;
  categoryId: number;
  sort: Sorting;
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async (parameters: FetchPizzas) => {
    const { currentPage, categoryId, sort } = parameters;
    const { data } = await axios.get(
      `https://62b6fab56999cce2e80b0ed9.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sort.sort}&order=desc`
    );
    return data as PizzasItems[];
  }
);

type PizzasItems = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  count: number;
};

export enum Statuses {
  LOADING = "loading",
  FULFILLED = "fulfilled",
  ERROR = "error",
}

interface PizzasSliceState {
  items: PizzasItems[];
  steps: Statuses;
}

const initialState: PizzasSliceState = {
  items: [],
  steps: Statuses.LOADING,
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzasItems[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.steps = Statuses.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.steps = Statuses.FULFILLED;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.steps = Statuses.ERROR;
    });
  },
});

export const pizzas = (state: RootState) => state.pizzas;

export const {} = pizzasSlice.actions;

export default pizzasSlice.reducer;
