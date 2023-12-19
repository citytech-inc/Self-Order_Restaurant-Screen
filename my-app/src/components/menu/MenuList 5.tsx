import React from "react";
import "./MenuList.css";

const MenuList: React.FC = () => {
  // List of items to display - replace these with your actual data
  const items = [
    "醤油ラーメン",
    "塩ラーメン",
    "味噌ラーメン",
    "半ライス",
    "烏龍茶",
  ];

  return (
    <div className="list-screen">
      <div className="list-container">
        {items.map((item, index) => (
          <div key={index} className="list-item">
            {item} {/* Replace with your actual content */}
          </div>
        ))}
      </div>
      <button className="fixed-button">+ 商品を追加</button>
    </div>
  );
};

export default MenuList;
