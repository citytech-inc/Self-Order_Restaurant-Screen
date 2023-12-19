import React from "react";
import "./MenuList.css";

interface MenuListProps {
  selectedMenuItem: string;
  onMenuItemSelect: (item: string) => void;
}

const MenuList_AYCE: React.FC<MenuListProps> = ({
  selectedMenuItem,
  onMenuItemSelect,
}) => {
  // List of items to display - replace these with your actual data
  const items = ["食べ放題Aコース", "食べ放題Bコース", "食べ放題Cコース"];

  return (
    <div className="list-screen">
      <div className="list-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`list-item ${item === selectedMenuItem ? 'selected' : ''}`}
            onClick={() => onMenuItemSelect(item)}
          >
            {item} 
          </div>
        ))}
      </div>
      <button className="fixed-button">+ 食べ放題コースを追加</button>
    </div>
  );
};

export default MenuList_AYCE;
