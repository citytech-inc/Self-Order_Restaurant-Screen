import React, { useState } from "react";
import AddMenu from "../../components/add-menu/AddMenu";
import MenuCategory from "../../components/add-menu/MenuCategory";
import CustomizeSection from "../../components/add-menu/CustomizeSection";
import SettingBar from "../../header/SettingBar";
import "./AddMenuScreen.css";

const AddMenuScreen: React.FC = () => {
  const [menuCategoryList, setMenuCategoryList] = useState<string[]>([
    "ラーメン",
    "セットメニュー",
    "飲み物",
    "デザート",
  ]);

  const [customize, setCustomize] = useState<string>("なし");

  const resetScreen = () => {
    // Resetting the state to initial values
    setMenuCategoryList([
      "ラーメン",
      "セットメニュー",
      "飲み物",
      "デザート",
    ]);
    setCustomize("なし");
  };

  return (
    <div>
      <SettingBar focusButton="menu" />
      <div className="menu__container">
        <MenuCategory
          menuCategoryList={menuCategoryList}
          setMenuCategoryList={setMenuCategoryList}
        />
        <AddMenu
          menuCategoryList={menuCategoryList}
          customize={customize}
          setCustomize={setCustomize}
        />
        {customize === "あり" && <CustomizeSection />}
        <div className="add-menu__area">
        <button className="add-menu__button" onClick={resetScreen}>商品を登録</button>
      </div>
      </div>
    </div>
  );
};

export default AddMenuScreen;
