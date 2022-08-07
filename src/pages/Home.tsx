import React from "react";
import qs from "qs";
import { Categories } from "../components/Categories";
import { Skeleton } from "../components/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock";
import { Pagination } from "../components/Pagination";
import { Sort, list } from "../components/Sort";
import { useSelector } from "react-redux";
import {
  filter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, pizzas } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, currentPage, sort } = useSelector(filter);
  const { items, steps } = useSelector(pizzas);
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sorting = list.find((obj) => obj.sort === params.sort);

      if (sorting) {
        params.sort = sorting;
      }
      dispatch(setFilters(params));

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

  const onClickCategories = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onPageChange = (numb: number) => {
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
              : items?.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
          <Pagination value={currentPage} onChangePage={onPageChange} />
        </>
      )}
    </div>
  );
};
