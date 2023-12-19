import React from "react";
import "./MenuList.css";

interface MenuListProps {
  selectedMenuItem: string;
  onMenuItemSelect: (item: string) => void;
}

const MenuList_SetMenu: React.FC<MenuListProps> = ({
  selectedMenuItem,
  onMenuItemSelect,
}) => {
  // List of items to display - replace these with your actual data
  const items = [
    "半ちゃんセット",
    "ラーメン定食",
    "高菜ご飯セット",
    "焼き飯ラーメン",
    "オム半チャンセット",
    "チャーシュー丼セット",
  ];

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
      <button className="fixed-button">+ セットメニューを追加</button>
    </div>
  );
};

export default MenuList_SetMenu;
