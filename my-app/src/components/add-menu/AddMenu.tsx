import React, { useState } from "react";
import CustomizeSection from "./customize/CustomizeSection";

type CustomizeType1 = {
  type: "Type1";
  name: string;
  options: string[];
  default: string;
};

type CustomizeType2 = {
  type: "Type2";
  name: string;
  options: Array<{ optionName: string; price: number }>;
  default: string;
};

type CustomizeType3 = {
  type: "Type3";
  name: string;
  price: number;
  measureWord: string;
  default: string;
};

type MenuSettings = {
  customizations?: (CustomizeType1 | CustomizeType2 | CustomizeType3)[];
};

type MenuType = {
  category: string;
  name: string;
  picture: string;
  price: number;
  settings: MenuSettings[];
};

const [menuCategoryList, setMenuCategoryList] = useState<string[]>([]);

const AddMenu: React.FC = () => {
  const [menu, setMenu] = useState<MenuType>({
    category: "",
    name: "",
    picture: "",
    price: 0,
    settings: [],
  });

  return (
    <div>
      <h2>メニューを追加</h2>
      カテゴリー:
      <select
        value={menu.category}
        onChange={(e) =>
          setMenu((prev) => ({ ...prev, category: e.target.value }))
        }
      >
        {menuCategoryList.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      名前:
      <input
        type="text"
        placeholder="Menu Name"
        onChange={(e) => setMenu((prev) => ({ ...prev, name: e.target.value }))}
      />
      写真:
      <input
        type="text"
        placeholder="Picture Link"
        onChange={(e) =>
          setMenu((prev) => ({ ...prev, picture: e.target.value }))
        }
      />
      値段:
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => {
          const newPrice = parseFloat(e.target.value);
          setMenu((prev) => ({ ...prev, price: newPrice }));
        }}
      />
      <CustomizeSection />
    </div>
  );
};

export default AddMenu;
