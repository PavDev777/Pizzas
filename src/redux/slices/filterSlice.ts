import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

export enum SortPropertiesEnum {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}

export type Sorting = {
  name: string;
  sort: SortPropertiesEnum;
};

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  sort: Sorting;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sort: SortPropertiesEnum.RATING,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sorting>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const filter = (state: RootState) => state.filter;
export const filterSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
