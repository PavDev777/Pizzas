import styles from "./Search.module.scss";
import search from "../../assets/img/search.svg";

export const Search = () => {
  return (
    <div className={styles.search}>
      <img src={search} alt="Search" />
      <input className={styles.main} type="text" placeholder="Поиск пиццы" />
    </div>
  );
};
