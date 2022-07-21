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
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const { categoryId, currentPage, sort } = useSelector(({ filter }) => filter);
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
      setLoading(true);
      const fetchingData = async () => {
        const response = await axios.get(
          `https://62b6fab56999cce2e80b0ed9.mockapi.io/items?page=${currentPage}&limit=4&${
            categoryId > 0 ? `category=${categoryId}` : ""
          }&sortBy=${sort.sort}&order=desc`
        );
        const data = await response.data;
        setItems(data);
        setLoading(false);
      };
      fetchingData();
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
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
          : items?.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination value={currentPage} onChangePage={onPageChange} />
    </div>
  );
};
