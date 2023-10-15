import React, { useState, SetStateAction, Dispatch } from "react";
import "./MenuCategory.css";

type AddMenuProps = {
  menuCategoryList: string[];
  setMenuCategoryList: Dispatch<SetStateAction<string[]>>;
};

const MenuCategory: React.FC<AddMenuProps> = ({
  menuCategoryList,
  setMenuCategoryList,
}) => {
  const addCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory) {
      const newCategories = [...menuCategoryList, newCategory];
      setMenuCategoryList(newCategories);
    }
  };

  return (
    <div className="category-container">
      <div className="category-header">メニューカテゴリー</div>
      <div>
        {menuCategoryList.map((category, index) => (
          <button key={index} className="category-button">
            {category}
          </button>
        ))}
        <button className="category-button" onClick={addCategory}>
          追加
        </button>
      </div>
    </div>
  );
};

export default MenuCategory;
function setMenuCategoryList(newCategories: any[]) {
  throw new Error("Function not implemented.");
}
