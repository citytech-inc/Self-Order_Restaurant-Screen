import React, { useState } from "react";
import axios from "axios";
import AddMenu, { MenuType } from "../../components/menu/AddMenu";
import MenuCategory from "../../components/menu/MenuCategory";
import CustomizeSection from "../../components/menu/CustomizeSection";
import MenuList from "../../components/menu/MenuList";
import SettingBar from "../../header/SettingBar";
import SmartphoneIcon from "../../components/images/smartphone-call.png";
import "./MenuScreen.css";
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

  const [menu, setMenu] = useState<MenuType>({
    category: menuCategoryList[0],
    name: "",
    image: "",
    price: 0,
    description: "",
    settings: {},
  });

  const sendToBackend = async () => {
    console.log("sendToBackend");
    //フロントだけで動作を確認したいときは商品を登録のところのonClickをsendToBackendからresetScreenに変更
    try {
      const response = await axios.post("http://localhost:3003/api/menu", {
        menuCategories: menuCategoryList,
        menus: menu,
        restaurantId: Number(restaurantId),
      });
      if (response.status === 200) {
        console.log(
          "Menu data sent successfully!",
          JSON.stringify({
            menuCategories: menuCategoryList,
            menus: menu,
            restaurantId: Number(restaurantId),
          }),
        );
        //resetScreen();
      }
    } catch (error) {
      console.error("Failed to send menu data:", error);
    }
  };

  const [customize, setCustomize] = useState<string>("なし");

  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const resetScreen = () => {
    // Resetting the state to initial values
    console.log(JSON.stringify(menu));
    setMenuCategoryList(["ラーメン", "セットメニュー", "飲み物", "デザート"]);
    setCustomize("なし");
    navigate(`/${restaurantId}/menu-list`);
  };

  return (
    <div>
      <SettingBar focusButton="menu" />
      <MenuCategory defaultType="単品" />
      <div className="menu-container">
        <MenuList
          selectedMenuItem={selectedMenuItem}
          onMenuItemSelect={(item: string) => {
            setSelectedMenuItem(item);
            setMenu({ ...menu, name: item }); // Update the AddMenu component with the selected item
          }}
        />
        <div className="edit-container">
          <AddMenu
            menuCategoryList={menuCategoryList}
            customize={customize}
            setCustomize={setCustomize}
            menu={menu}
            setMenu={setMenu}
          />
          <div className="add-menu">
            <button className="add-menu__button" onClick={sendToBackend}>
              編集を保存
            </button>
          </div>
        </div>
        <div className="smartphone-icon">
          <div className="smartphone-icon__cicle">
            <img
              src={SmartphoneIcon}
              alt="Smartphone Icon"
              className="smartphone-icon__img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuScreen;
