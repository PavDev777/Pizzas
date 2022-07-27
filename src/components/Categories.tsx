import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategories: (idx: number) => void;
};

export const Categories: React.FC<CategoriesProps> = ({
  value,
  onClickCategories,
}) => {
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
