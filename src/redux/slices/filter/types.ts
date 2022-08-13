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
