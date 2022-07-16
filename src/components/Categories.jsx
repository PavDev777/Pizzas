import React from "react";

export const Categories = ({ value, onClickCategories }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, idx) => (
          <li
            key={idx}
            onClick={() => onClickCategories(idx)}
            className={value === idx ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
