import React from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Skeleton } from "../components/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock";

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sort, setSort] = React.useState({
    name: "популярности",
    sort: "rating",
  });

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        `https://62b6fab56999cce2e80b0ed9.mockapi.io/items?category=${categoryId}`
      );
      if (response.ok) {
        const data = await response.json();
        setItems(data);
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [categoryId, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategories={(idx) => setCategoryId(idx)}
        />
        <Sort sortValue={sort} setMain={(obj) => setSort(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
          : items?.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
