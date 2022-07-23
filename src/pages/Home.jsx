import React from "react";
import qs from "qs";
import { Categories } from "../components/Categories";
import { Skeleton } from "../components/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock";
import { Pagination } from "../components/Pagination";
import { Sort, list } from "../components/Sort";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

export const Home = () => {
  const navigate = useNavigate();
  const { categoryId, currentPage, sort } = useSelector(({ filter }) => filter);
  const { items, steps } = useSelector(({ pizzas }) => pizzas);
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sorting = list.find((obj) => obj.sort === params.sort);

      dispatch(
        setFilters({
          ...params,
          sort: sorting,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      dispatch(
        fetchPizzas({
          categoryId,
          currentPage,
          sort,
        })
      );
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  const onClickCategories = (id) => {
    dispatch(setCategoryId(id));
  };

  const onPageChange = (numb) => {
    dispatch(setCurrentPage(numb));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategories={onClickCategories} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {steps === "error" ? (
        <div>Error</div>
      ) : (
        <>
          <div className="content__items">
            {steps === "loading"
              ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
              : items?.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
          <Pagination value={currentPage} onChangePage={onPageChange} />
        </>
      )}
    </div>
  );
};
