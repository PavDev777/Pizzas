import React from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Skeleton } from "../components/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock";
import { Pagination } from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

export const Home = () => {
  const { categoryId, sort } = useSelector(({ filter }) => filter);
  const dispatch = useDispatch();
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        `https://62b6fab56999cce2e80b0ed9.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sort.sort}&order=desc`
      );
      if (response.ok) {
        const data = await response.json();
        setItems(data);
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage]);

  const onClickCategories = (id) => {
    dispatch(setCategoryId(id));
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
      <Pagination onChangePage={(numb) => setCurrentPage(numb)} />
    </div>
  );
};
