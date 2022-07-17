import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

export const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.main}
      nextLabel=">"
      previousLabel="<"
      breakLabel="..."
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
      onPageChange={(e) => onChangePage(e.selected + 1)}
    />
  );
};
