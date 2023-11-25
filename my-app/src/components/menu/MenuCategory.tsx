import React, { useState } from "react";
import "./MenuCategory.css";

// Define the types for props and state
type TypeOption = "単品" | "セット" | "食べ放題" | "商品分類" | "その他";

const MenuCategory: React.FC = () => {
  const [selectedType, setSelectedType] = useState<TypeOption>("単品");

  const handleTypeClick = (type: TypeOption) => {
    setSelectedType(type);
  };

  return (
    <div className="type-bar">
      {(
        ["単品", "セット", "食べ放題", "商品分類", "その他"] as TypeOption[]
      ).map((type) => (
        <button
          key={type}
          className={`type-option ${selectedType === type ? "selected" : ""}`}
          onClick={() => handleTypeClick(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default MenuCategory;
