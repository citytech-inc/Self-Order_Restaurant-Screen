import React, { useState } from "react";
import "./MenuCategory.css";

const MenuCategory: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([
    "ジーメン",
    "セットメニュー",
    "餃子焼",
    "デザート",
  ]);

  const addCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory) {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <div className="category-container">
      <div className="category-header">メニューカテゴリー</div>
      {categories.map((category, index) => (
        <button key={index} className="category-button">
          {category}
        </button>
      ))}
      <button className="category-button" onClick={addCategory}>
        追加
      </button>
    </div>
  );
};

export default MenuCategory;
