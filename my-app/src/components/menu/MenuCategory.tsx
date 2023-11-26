import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MenuCategory.css";

// Define the types for props and state
type TypeOption = "単品" | "セット" | "食べ放題" | "商品分類" | "カスタマイズ";

type MenuCategoryProps = {
  defaultType?: TypeOption; 
};


const MenuCategory: React.FC<MenuCategoryProps> = ({ defaultType = "単品" }) => { 
  const { restaurantId } = useParams();
  const [selectedType, setSelectedType] = useState<TypeOption>(defaultType);
  const navigate = useNavigate();

  const handleTypeClick = (type: TypeOption) => {
    setSelectedType(type);

    if (type === "セット") {
      navigate(`/${restaurantId}/menu-list/set-menu`);
    } else if (type === "食べ放題") {
      navigate(`/${restaurantId}/menu-list/AYCE`);
    } else if (type === "商品分類") {
      navigate(`/${restaurantId}/menu-list/classification`);
    } else if (type === "カスタマイズ") {
      navigate(`/${restaurantId}/menu-list/customize`);
    } else {
      navigate(`/${restaurantId}/menu-list`);
    }
  };

  return (
    <div className="type-bar">
      {(
        ["単品", "セット", "食べ放題", "商品分類", "カスタマイズ"] as TypeOption[]
      ).map((type) => (
        <button
          key={type}
          onClick={() => handleTypeClick(type)}
          className={`type-option ${selectedType === type ? "selected" : ""}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default MenuCategory;
