import React, {useState} from "react";
import "./MenuList.css";

const MenuList: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  // List of items to display - replace these with your actual data
  const items = [
    "醤油ラーメン",
    "塩ラーメン",
    "味噌ラーメン",
    "半ライス",
    "烏龍茶",
  ];

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  const resetSelection = () => {
    setSelectedItem(null);
  };

  return (
    <div className="list-screen">
      <div className="list-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`list-item ${selectedItem === index ? "selected" : ""}`}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <button className="fixed-button" onClick={resetSelection}>+ 商品を追加</button>
    </div>
  );
};

export default MenuList;
