import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

export const Pagination = ({ value, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.main}
      nextLabel=">"
      previousLabel="<"
      breakLabel="..."
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
      forcePage={value - 1}
      onPageChange={(e) => onChangePage(e.selected + 1)}
    />
  );
};
