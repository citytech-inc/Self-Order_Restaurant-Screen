import React, { useState } from "react";
import AddMenu from "../../components/menu/AddMenu";
import MenuCategory from "../../components/menu/MenuCategory";
import CustomizeSection from "../../components/menu/CustomizeSection";
import SettingBar from "../../header/SettingBar";
import "./AddMenuScreen.css";
import { useNavigate, useParams } from "react-router-dom";

const AddMenuScreen: React.FC = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [menuCategoryList, setMenuCategoryList] = useState<string[]>([
    "ラーメン",
    "セットメニュー",
    "飲み物",
    "デザート",
  ]);

  const [customize, setCustomize] = useState<string>("なし");

  const resetScreen = () => {
    // Resetting the state to initial values
    setMenuCategoryList(["ラーメン", "セットメニュー", "飲み物", "デザート"]);
    setCustomize("なし");
    navigate(`/${restaurantId}/menu-list`);
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
          <button className="add-menu__button" onClick={resetScreen}>
            商品を登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenuScreen;
