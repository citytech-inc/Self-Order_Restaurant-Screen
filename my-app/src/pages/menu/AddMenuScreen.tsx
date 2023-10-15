import React, { useState } from "react";
import AddMenu from "../../components/add-menu/AddMenu";
import MenuCategory from "../../components/add-menu/MenuCategory";
import CustomizeSection from "../../components/add-menu/customize/CustomizeSection";
import SettingBar from "../../header/SettingBar";
import "./AddMenuScreen.css";

const AddMenuScreen: React.FC = () => {
  const [menuCategoryList, setMenuCategoryList] = useState<string[]>([
    "ジーメン",
    "セットメニュー",
    "餃子焼",
    "デザート",
  ]);

  return (
    <div>
      <SettingBar focusButton="menu" />
      <div className="menu__container">
        <MenuCategory
          menuCategoryList={menuCategoryList}
          setMenuCategoryList={setMenuCategoryList}
        />
        <AddMenu menuCategoryList={menuCategoryList} />
        <CustomizeSection />
      </div>
    </div>
  );
};

export default AddMenuScreen;
