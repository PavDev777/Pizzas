import React from "react";
import qs from "qs";
import {
  Categories,
  Skeleton,
  PizzaBlock,
  Pagination,
  Sort,
  list,
} from "../components/";
import { useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filter/slice";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/slices/pizzas/slice";
import { useAppDispatch } from "../redux/store";
import { filter } from "../redux/slices/filter/selectors";
import { pizzas } from "../redux/slices/pizzas/selectors";

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
