import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  value: number;
  onChangePage: (idx: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  value,
  onChangePage,
}) => (
  <ReactPaginate
    className={styles.main}
    nextLabel=">"
    previousLabel="<"
    breakLabel="..."
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={value - 1}
    onPageChange={(e) => onChangePage(e.selected + 1)}
  />
);
