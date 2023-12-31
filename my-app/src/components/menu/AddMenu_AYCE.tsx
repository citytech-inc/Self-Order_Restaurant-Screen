import React, { useState, SetStateAction, Dispatch } from "react";
import CustomizeSection from "./CustomizeSection";
import "./AddMenu.css";

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

export type CustomizationTypes = {
  customizationTypes?: (CustomizeType1 | CustomizeType2 | CustomizeType3)[];
};

export type MenuType = {
  category: string;
  name: string;
  image: string;
  price: number;
  description: string;
  settings: {
    [key: string]: {
      name: string;
      customizationTypes: {
        [key: string]: [string, number];
      }[];
    };
  };
};

type AddMenuProps = {
  menuCategoryList: string[];
  customize: string;
  setCustomize: Dispatch<SetStateAction<string>>;
  menu: MenuType;
  setMenu: Dispatch<SetStateAction<MenuType>>;
};

const AddMenu_AYCE: React.FC<AddMenuProps> = ({
  menuCategoryList,
  customize,
  setCustomize,
  menu,
  setMenu,
}) => {
  const handleUpdateSettings = (updatedSettings: any) => {
    setMenu((prev) => ({ ...prev, settings: updatedSettings }));
  };

  return (
    <div className="add-menu__container">
      <h2>食べ放題コースを編集</h2>
      <div className="box">
        <div className="box__text">コース名</div>
        <input
          className="input__name"
          type="text"
          placeholder="Menu Name"
          onChange={(e) =>
            setMenu((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className="box">
        <div className="box__text">値段</div>
        <input
          className="input__price"
          type="number"
          placeholder="Price"
          onChange={(e) => {
            const newPrice = parseFloat(e.target.value);
            setMenu((prev) => ({ ...prev, price: newPrice }));
          }}
        />
      </div>
      <div className="box">
        <div className="box__text">制限時間</div>
        <input
          className="input__price"
          type="number"
          placeholder="Time"
          onChange={(e) => {
            const newPrice = parseFloat(e.target.value);
            setMenu((prev) => ({ ...prev, price: newPrice }));
          }}
        />
      </div>
      <div className="box">
        <div className="box__text">画像</div>
        <input
          className="input__picture"
          type="text"
          placeholder="Picture Link"
          onChange={(e) =>
            setMenu((prev) => ({ ...prev, image: e.target.value }))
          }
        />
      </div>
      <div className="box">
        <div className="box__text">コース説明</div>
        <input
          className="input__description"
          type="text"
          placeholder="コース説明を入力してください。"
          onChange={(e) =>
            setMenu((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>
    </div>
  );
};

export default AddMenu_AYCE;
