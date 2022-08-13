import { Sorting } from "../filter/types";

export type FetchPizzas = {
  currentPage: number;
  categoryId: number;
  sort: Sorting;
};

export type PizzasItems = {
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

export interface PizzasSliceState {
  items: PizzasItems[];
  steps: Statuses;
}
