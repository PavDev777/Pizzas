import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sort: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, { payload }) {
      state.categoryId = payload;
    },
    setSort(state, { payload }) {
      state.sort = payload;
    },
    setCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    setFilters(state, { payload }) {
      state.currentPage = Number(payload.currentPage);
      state.categoryId = Number(payload.categoryId);
      state.sort = payload.sort;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
